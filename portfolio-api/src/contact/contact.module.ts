import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [TelegramModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
