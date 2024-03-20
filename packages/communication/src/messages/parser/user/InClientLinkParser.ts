import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class InClientLinkParser implements IMessageParser
{
    private _link: string;

    public flush(): boolean
    {
        this._link = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._link = wrapper.readString();
        return true;
    }

    public get link(): string
    {
        return this._link;
    }
}
