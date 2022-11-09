export interface IBinaryWriter
{
    writeByte(byte: number): IBinaryWriter;
    writeBytes(bytes: ArrayBuffer | number[]): IBinaryWriter;
    writeShort(short: number): IBinaryWriter;
    writeInt(integer: number): IBinaryWriter;
    writeString(string: string, includeLength?: boolean): IBinaryWriter;
    getBuffer(): ArrayBuffer;
    position: number;
    toString(encoding?: string): string;
}
