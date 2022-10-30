import { IDisposable, IMessageDataWrapper } from '../../../../../api';

export class PatternMatchData implements IDisposable
{
    private _pattern: string;
    private _startIndex: number;
    private _endIndex: number;
    private _disposed: boolean = false;

    constructor(k: IMessageDataWrapper)
    {
        this._pattern = k.readString();
        this._startIndex = k.readInt();
        this._endIndex = k.readInt();
    }

    public dispose(): void
    {
        this._disposed = true;
        this._pattern = '';
        this._startIndex = -1;
        this._endIndex = -1;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get pattern(): string
    {
        return this._pattern;
    }

    public get startIndex(): number
    {
        return this._startIndex;
    }

    public get endIndex(): number
    {
        return this._endIndex;
    }
}
