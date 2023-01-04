import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class ElementPointerMessageParser implements IMessageParser
{
    private _key: string;

    public flush(): boolean
    {
        this._key = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._key = wrapper.readString();

        return true;
    }

    public get key(): string
    {
        return this._key;
    }
}
