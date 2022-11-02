import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RoomUnitExpressionParser implements IMessageParser
{
    private _unitId: number;
    private _expression: number;

    public flush(): boolean
    {
        this._unitId = null;
        this._expression = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._unitId = wrapper.readInt();
        this._expression = wrapper.readInt();

        return true;
    }

    public get unitId(): number
    {
        return this._unitId;
    }

    public get expression(): number
    {
        return this._expression;
    }
}
