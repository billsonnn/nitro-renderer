export interface IBinaryReader
{
    readBytes(length: number): IBinaryReader;
    readByte(): number;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    remaining(): number;
    toString(encoding?: string): string;
    toArrayBuffer(): ArrayBuffer;
}
