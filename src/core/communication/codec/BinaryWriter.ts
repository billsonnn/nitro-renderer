export class BinaryWriter
{
    private _buffer: Uint8Array;

    constructor()
    {
        this._buffer = new Uint8Array();
    }

    public writeByte(byte: number): BinaryWriter
    {
        const array = new Uint8Array(1);

        array[0] = byte;

        this.appendArray(array);

        return this;
    }

    public writeBytes(bytes: ArrayBuffer): BinaryWriter
    {
        const array = new Uint8Array(bytes);

        this.appendArray(array);

        return this;
    }

    public writeShort(short: number): BinaryWriter
    {
        const array = new Uint8Array(2);

        array[0] = short >> 8;
        array[1] = short & 0xFF;

        this.appendArray(array);

        return this;
    }

    public writeInt(integer: number): BinaryWriter
    {
        const array = new Uint8Array(4);

        array[0] = integer >> 24;
        array[1] = integer >> 16;
        array[2] = integer >> 8;
        array[3] = integer & 0xFF;

        this.appendArray(array);

        return this;
    }

    public writeString(string: string, includeLength: boolean = true): BinaryWriter
    {
        const array = new TextEncoder().encode(string);

        if(includeLength)
        {
            this.writeShort(array.length);
            this.appendArray(array);
        }
        else
        {
            this.appendArray(array);
        }

        return this;
    }

    private appendArray(array: Uint8Array): void
    {
        if(!array) return;

        const mergedArray = new Uint8Array(this._buffer.length + array.length);

        mergedArray.set(this._buffer);
        mergedArray.set(array, this._buffer.length);

        this._buffer = mergedArray;
    }

    public getBuffer(): ArrayBuffer
    {
        return this._buffer.buffer;
    }

    public toString(encoding?: string): string
    {
        return new TextDecoder(encoding).decode(this._buffer);
    }
}