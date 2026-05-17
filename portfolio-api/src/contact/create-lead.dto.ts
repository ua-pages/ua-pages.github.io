import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(140)
  contact!: string;

  @IsString()
  @MaxLength(120)
  service!: string;

  @IsString()
  @MaxLength(80)
  budget!: string;

  @IsString()
  @MaxLength(80)
  timeline!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(2000)
  message!: string;
}
