import { IMessageDataWrapper } from '../../messages/IMessageDataWrapper';
import { BinaryReader } from '../BinaryReader';

export class EvaWireDataWrapper implements IMessageDataWrapper
{
    private _header: number;
    private _buffer: BinaryReader;

    constructor(header: number, buffer: BinaryReader)
    {
        this._header    = header;
        this._buffer    = buffer;
    }

    public readByte(): number
    {
        if(!this._buffer) return -1;

        return this._buffer.readByte();
    }

    public readBytes(length: number): BinaryReader
    {
        if(!this._buffer) return null;

        return this._buffer.readBytes(length);
    }

    public readBoolean(): boolean
    {
        return (this.readByte() === 1);
    }

    public readShort(): number
    {
        if(!this._buffer) return -1;

        return this._buffer.readShort();
    }

    public readInt(): number
    {
        if(!this._buffer) return -1;

        return this._buffer.readInt();
    }

    public readString(): string
    {
        const length    = this.readShort();
        const buffer    = this._buffer.readBytes(length);

        return buffer.toString('utf8');
    }

    public get header(): number
    {
        return this._header;
    }

    public get bytesAvailable(): boolean
    {
        return (this._buffer && (this._buffer.remaining() > 0));
    }
}