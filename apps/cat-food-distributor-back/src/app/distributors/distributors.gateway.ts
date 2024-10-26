import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody, WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket
} from '@nestjs/websockets';
import { DistributorsService } from './distributors.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketEvents } from './distributors.types';

@WebSocketGateway()
export class DistributorsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(DistributorsGateway.name);

  constructor(private readonly distributorService: DistributorsService) {
  }

  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.warn('Socket initialized');
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const {
      id, handshake: {
        query: {
          token
        }
      }
    } = client;

    this.logger.warn(`Client id: ${id} with token: ${token} connected`);

    const distributorId = await this.distributorService.checkIdentification(token as string);

    if (distributorId) {
      await this.distributorService.upsertByDistributorId({
        socketId: id,
        distributorId,
        isAuthorized: true,
        isConnected: true
      });
      const createdDistributor = await this.distributorService.findOneByDistributorId(distributorId);

      client.emit(SocketEvents.IDENTIFICATION_SUCCESS, createdDistributor);

      const unconfirmedFoodServings = await this.distributorService.findAllFoodServingsByDistributorIdAndNotConfirmed(createdDistributor.id)

      unconfirmedFoodServings.map(({ id }) => {
        client.emit(SocketEvents.SERVE_FOOD, { foodServingId: id });
      })

    } else {
      client.emit(SocketEvents.IDENTIFICATION_ERROR);
      client.disconnect();
    }

    const { sockets } = this.server.sockets;

    this.logger.warn(`Number of connected clients: ${sockets.size}`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.warn(`Client id: ${client.id} disconnected`);

    const distributorToUpdate = await this.distributorService.findOneBySocketId(client.id);

    if (distributorToUpdate) {
      await this.distributorService.update(distributorToUpdate.id, { isConnected: false, socketId: null });
    }

    const { sockets } = this.server.sockets;

    this.logger.warn(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('food-served-confirmation')
  async foodServedConfirmation(@ConnectedSocket() client: Socket, @MessageBody('foodServingId') foodServingId: string) {
    const distributor = await this.distributorService.findOneBySocketId(client.id);
    if (!distributor || !distributor.isAuthorized) {
      this.logger.error(`Distributor for socket ${client.id} does not exist or is not authorized`);
      return;
    }
    const foodServing = await this.distributorService.findOneFoodServingByIdAndDistributorId(foodServingId, distributor.id);
    if (!foodServing) {
      this.logger.error(`Food Serving with id ${foodServingId} and distributorId ${distributor.id} does not exist and can't be confirmed`);
      return;
    }
    await this.distributorService.foodServedConfirmation(foodServingId);
    this.logger.warn(`Food Serving with id ${foodServingId} and distributorId ${distributor.id} has been served`);
  }
}
