import { IBinaryWriter, IConnection, IMessageDataWrapper } from '@/api'

export interface ICodec {
  encode(header: number, messages: any[]): IBinaryWriter;

  decode(connection: IConnection): IMessageDataWrapper[];
}
