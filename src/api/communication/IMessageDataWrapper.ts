import { IBinaryReader } from '@/api'

export interface IMessageDataWrapper {
  header: number;
  bytesAvailable: boolean;

  readByte(): number;

  readBytes(length: number): IBinaryReader;

  readBoolean(): boolean;

  readShort(): number;

  readInt(): number;

  readFloat(): number;

  readDouble(): number;

  readString(): string;
}
