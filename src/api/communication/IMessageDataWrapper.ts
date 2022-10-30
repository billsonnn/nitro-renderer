import { IBinaryReader } from './IBinaryReader';

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
