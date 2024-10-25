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

const IDENTIFICATION_SUCCESS = 'identification-success' as const;
const IDENTIFICATION_ERROR = 'identification-error' as const;

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

      client.emit(IDENTIFICATION_SUCCESS, createdDistributor);
    } else {
      client.emit(IDENTIFICATION_ERROR);
      client.disconnect();
    }

    const { sockets } = this.server.sockets;

    this.logger.warn(`Number of connected clients: ${sockets.size}`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.warn(`Client id: ${client.id} disconnected`);

    const distributorToUpdate = await this.distributorService.findOneBySocketId(client.id);

    if (distributorToUpdate) {
      await this.distributorService.update(distributorToUpdate.id, { isConnected: false, socketId: null });
    }

    const { sockets } = this.server.sockets;

    this.logger.warn(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('food-served-confirmation')
  foodServedConfirmation(@MessageBody('id') id: string) {
    return this.distributorService.foodServedConfirmation(id);
  }
}
