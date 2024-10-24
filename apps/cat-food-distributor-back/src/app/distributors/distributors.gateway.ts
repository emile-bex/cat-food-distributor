import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody, WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets'
import { DistributorsService } from './distributors.service'
import { Server, Socket } from "socket.io"

const IDENTIFICATION_SUCCESS = "identification-success" as const
const IDENTIFICATION_ERROR = "identification-error" as const

@WebSocketGateway()
export class DistributorsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly distributorService: DistributorsService) {
  }

  @WebSocketServer() server: Server

  afterInit() {
    console.log("Initialized")
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const {
      id, handshake: {
        query: {
          token
        }
      }
    } = client

    console.log(`Client id: ${id} connected`)
    console.log(`Client token: ${token} connected`)

    const distributorId = this.distributorService.checkIdentification(token as string)

    if (distributorId) {
      await this.distributorService.upsertByDistributorId({
        socketId: id,
        distributorId,
        isAuthorized: true
      })
      const createdDistributor = await this.distributorService.findOneByDistributorId(distributorId);

      client.emit(IDENTIFICATION_SUCCESS, createdDistributor)
    } else {
      client.emit(IDENTIFICATION_ERROR)
      client.disconnect()
    }

    const {sockets} = this.server.sockets

    console.log(`Number of connected clients: ${sockets.size}`)
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client id: ${client.id} disconnected`)

    await this.distributorService.deleteBySocketId(client.id)

    const {sockets} = this.server.sockets

    console.log(`Number of connected clients: ${sockets.size}`)
  }

  @SubscribeMessage('ping')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    console.log(`Message received from client id: ${client.id}`)
    console.log(`Payload: ${data}`)
    return {
      event: "pong",
      data: "Wrong data that will make the test fail",
    }
  }

  @SubscribeMessage('food-served-confirmation')
  foodServedConfirmation(@MessageBody('id') id: number) {
    return this.distributorService.foodServedConfirmation(id)
  }
}
