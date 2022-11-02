import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';

export class RoomUnitTypingParser implements IMessageParser
{
    private _unitId: number;
    private _isTyping: boolean;

    public flush(): boolean
    {
        this._unitId = null;
        this._isTyping = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._unitId = wrapper.readInt();
        this._isTyping = wrapper.readInt() === 1 ? true : false;

        return true;
    }

    public get unitId(): number
    {
        return this._unitId;
    }

    public get isTyping(): boolean
    {
        return this._isTyping;
    }
}
