import { IDisposable, IMessageDataWrapper } from '../../../../../api';

export class PatternMatchData implements IDisposable
{
    private _pattern: string;
    private _startIndex: number;
    private _endIndex: number;
    private _disposed: boolean = false;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._pattern = wrapper.readString();
        this._startIndex = wrapper.readInt();
        this._endIndex = wrapper.readInt();
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
