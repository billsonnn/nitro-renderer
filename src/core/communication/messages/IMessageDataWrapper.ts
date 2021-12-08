import { BinaryReader } from '../codec/BinaryReader';

export interface IMessageDataWrapper
{
    readByte(): number;
    readBytes(length: number): BinaryReader;
    readBoolean(): boolean;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    readString(): string;
    header: number;
    bytesAvailable: boolean;
}
