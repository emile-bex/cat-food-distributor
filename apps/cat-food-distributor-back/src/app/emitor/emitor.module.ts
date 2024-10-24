import { Module } from '@nestjs/common';
import { EmitorService } from "./emitor.service"

@Module({
  providers: [EmitorService],
  exports: [EmitorService],
})
export class EmitorModule {}
