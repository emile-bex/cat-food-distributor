import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from "@nestjs/platform-socket.io"
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new IoAdapter(app))
  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
