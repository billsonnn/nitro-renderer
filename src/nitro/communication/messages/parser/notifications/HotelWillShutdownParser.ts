import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HotelWillShutdownParser implements IMessageParser
{
    private _minutes: number;

    public flush(): boolean
    {
        this._minutes = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._minutes = wrapper.readInt();

        return true;
    }

    public get minutes(): number
    {
        return this._minutes;
    }
}
