import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';
export class CreateUserValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (err) {
      throw new BadRequestException('Validation Failed');
    }

    return value;
  }
}
