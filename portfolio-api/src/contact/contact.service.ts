import { Injectable, Logger } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { CreateLeadDto } from './create-lead.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly telegramService: TelegramService) {}

  async createLead(dto: CreateLeadDto): Promise<void> {
    this.logger.log(`New portfolio lead from ${dto.name} (${dto.contact})`);
    await this.telegramService.sendLead(dto);
  }
}
