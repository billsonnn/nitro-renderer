import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class AvatarEffectAddedParser implements IMessageParser
{
    private _type: number;
    private _subType: number;
    private _duration: number;
    private _permanent: boolean;

    public flush(): boolean
    {
        this._type      = 0;
        this._subType  = 0;
        this._duration  = 0;
        this._permanent  = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type      = wrapper.readInt();
        this._subType   = wrapper.readInt();
        this._duration  = wrapper.readInt();
        this._permanent = wrapper.readBoolean();

        return true;
    }

    public get type(): number
    {
        return this._type;
    }

    public get _Str_3882(): number
    {
        return this._subType;
    }

    public get duration(): number
    {
        return this._duration;
    }

    public get _Str_4010(): boolean
    {
        return this._permanent;
    }
}
