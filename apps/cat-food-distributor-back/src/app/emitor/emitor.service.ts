import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from "socket.io"

const SERVE_FOOD = 'serve-food' as const

@WebSocketGateway()
export class EmitorService {

  @WebSocketServer() server: Server

  serveFood(socketId: string) {
    this.server.sockets.sockets.forEach((client: Socket) => {
      if (client.id === socketId) {
        client.emit(SERVE_FOOD)
      }
    })
  }
}
