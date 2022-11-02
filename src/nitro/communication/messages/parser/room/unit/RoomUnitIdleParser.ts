import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RoomUnitIdleParser implements IMessageParser
{
    private _unitId: number;
    private _isIdle: boolean;

    public flush(): boolean
    {
        this._unitId = null;
        this._isIdle = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._unitId = wrapper.readInt();
        this._isIdle = wrapper.readBoolean();

        return true;
    }

    public get unitId(): number
    {
        return this._unitId;
    }

    public get isIdle(): boolean
    {
        return this._isIdle;
    }
}
