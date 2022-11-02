import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class WiredOpenParser implements IMessageParser
{
    private _stuffId: number;

    public flush(): boolean
    {
        this._stuffId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._stuffId = wrapper.readInt();

        return true;
    }

    public get stuffId(): number
    {
        return this._stuffId;
    }
}
