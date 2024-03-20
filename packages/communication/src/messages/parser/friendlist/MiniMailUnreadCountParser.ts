import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class MiniMailUnreadCountParser implements IMessageParser
{
    private _count: number;

    public flush(): boolean
    {
        this._count = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._count = wrapper.readInt();

        return true;
    }

    public get count(): number
    {
        return this._count;
    }
}
