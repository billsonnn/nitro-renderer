import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RoomUnitRemoveParser implements IMessageParser
{
    private _unitId: number;

    public flush(): boolean
    {
        this._unitId = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._unitId = parseInt(wrapper.readString());

        return true;
    }

    public get unitId(): number
    {
        return this._unitId;
    }
}
