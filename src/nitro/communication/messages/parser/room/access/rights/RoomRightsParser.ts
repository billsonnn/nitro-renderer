import { IMessageDataWrapper, IMessageParser } from '../../../../../../../core';
import { RoomControllerLevel } from '../../../../../../session/enum/RoomControllerLevel';

export class RoomRightsParser implements IMessageParser
{
    private _controllerLevel: number;

    public flush(): boolean
    {
        this._controllerLevel = RoomControllerLevel.NONE;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._controllerLevel = wrapper.readInt();

        return true;
    }

    public get controllerLevel(): number
    {
        return this._controllerLevel;
    }
}
