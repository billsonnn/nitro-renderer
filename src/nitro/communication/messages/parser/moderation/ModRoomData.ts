import { IDisposable, IMessageDataWrapper } from '../../../../../api';

export class ModRoomData implements IDisposable
{
    private _exists: boolean;
    private _name: string;
    private _desc: string;
    private _tags: string[];
    private _disposed: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._tags = [];
        this._exists = wrapper.readBoolean();
        if(!this.exists)
        {
            return;
        }
        this._name = wrapper.readString();
        this._desc = wrapper.readString();

        const tagCount = wrapper.readInt();

        for(let i = 0; i < tagCount; i++)
        {
            this._tags.push(wrapper.readString());
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get desc(): string
    {
        return this._desc;
    }

    public get tags(): string[]
    {
        return this._tags;
    }

    public get exists(): boolean
    {
        return this._exists;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public dispose(): void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
        this._tags = null;
    }
}
