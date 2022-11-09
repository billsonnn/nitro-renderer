import { IBinaryWriter } from '../utils';
import { IConnection } from './IConnection';
import { IMessageDataWrapper } from './IMessageDataWrapper';

export interface ICodec
{
    encode(header: number, messages: any[]): IBinaryWriter;
    decode(connection: IConnection): IMessageDataWrapper[];
}
