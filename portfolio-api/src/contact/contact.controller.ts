import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateLeadDto } from './create-lead.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createLead(@Body() dto: CreateLeadDto) {
    await this.contactService.createLead(dto);
    return { ok: true };
  }
}
