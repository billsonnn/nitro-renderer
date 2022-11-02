import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RoomUnitNumberParser implements IMessageParser
{
    private _unitId: number;
    private _value: number;

    public flush(): boolean
    {
        this._unitId = null;
        this._value = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._unitId = wrapper.readInt();
        this._value = wrapper.readInt();

        return true;
    }

    public get unitId(): number
    {
        return this._unitId;
    }

    public get value(): number
    {
        return this._value;
    }
}
