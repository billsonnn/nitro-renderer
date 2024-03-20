import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class AvatarEffectActivatedParser implements IMessageParser
{
    private _type: number;
    private _duration: number;
    private _isPermanent: boolean;

    public flush(): boolean
    {
        this._type = 0;
        this._duration = 0;
        this._isPermanent = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type = wrapper.readInt();
        this._duration = wrapper.readInt();
        this._isPermanent = wrapper.readBoolean();

        return true;
    }

    public get type(): number
    {
        return this._type;
    }

    public get duration(): number
    {
        return this._duration;
    }

    public get isPermanent(): boolean
    {
        return this._isPermanent;
    }
}
