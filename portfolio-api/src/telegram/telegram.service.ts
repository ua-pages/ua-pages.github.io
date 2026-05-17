import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateLeadDto } from '../contact/create-lead.dto';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly config: ConfigService) {}

  async sendLead(dto: CreateLeadDto): Promise<void> {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    const chatId = this.config.get<string>('TELEGRAM_CHAT_ID');

    if (!token || !chatId) {
      this.logger.warn('Telegram credentials are not configured. Lead was accepted but not sent to Telegram.');
      return;
    }

    const text = [
      '🔥 New portfolio lead',
      '',
      `Name: ${dto.name}`,
      `Contact: ${dto.contact}`,
      `Service: ${dto.service}`,
      `Budget: ${dto.budget}`,
      `Timeline: ${dto.timeline}`,
      '',
      'Message:',
      dto.message,
    ].join('\n');

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    });
  }
}
