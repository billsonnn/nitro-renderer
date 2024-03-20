import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class AvatarEffectExpiredParser implements IMessageParser
{
    private _type: number;

    public flush(): boolean
    {
        this._type = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type = wrapper.readInt();

        return true;
    }

    public get type(): number
    {
        return this._type;
    }
}
