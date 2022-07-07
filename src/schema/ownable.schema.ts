import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Ownable {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Credentials' })
  owner: mongoose.Types.ObjectId;
}
