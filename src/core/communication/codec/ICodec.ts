import { BinaryWriter } from './BinaryWriter';
import { IConnection } from '../connections/IConnection';
import { IMessageDataWrapper } from '../messages/IMessageDataWrapper';

export interface ICodec
{
    encode(header: number, messages: any[]): BinaryWriter;
    decode(connection: IConnection): IMessageDataWrapper[];
}