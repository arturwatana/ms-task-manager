import { FileDTO } from 'src/users/DTO/create-user.dto';
import { IStorage } from './storage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;
  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }
  async upload(file: FileDTO, folder: string): Promise<any> {
    const data = await this.client.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(`${folder}/` + file.originalname, file.buffer, {
        upsert: true,
      });
    return data;
  }
}
