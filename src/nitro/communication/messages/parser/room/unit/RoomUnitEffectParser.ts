import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RoomUnitEffectParser implements IMessageParser
{
    private _unitId: number;
    private _effectId: number;
    private _delay: number;

    public flush(): boolean
    {
        this._unitId = null;
        this._effectId = 0;
        this._delay = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._unitId = wrapper.readInt();
        this._effectId = wrapper.readInt();
        this._delay = wrapper.readInt();

        return true;
    }

    public get unitId(): number
    {
        return this._unitId;
    }

    public get effectId(): number
    {
        return this._effectId;
    }

    public get delay(): number
    {
        return this._delay;
    }
}
