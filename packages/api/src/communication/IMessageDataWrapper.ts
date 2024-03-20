import { IBinaryReader } from '../utils';

export interface IMessageDataWrapper
{
    readByte(): number;
    readBytes(length: number): IBinaryReader;
    readBoolean(): boolean;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    readString(): string;
    header: number;
    bytesAvailable: boolean;
}
