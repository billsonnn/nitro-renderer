import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RentableSpaceRentOkMessageParser implements IMessageParser
{
    private _expiryTime: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._expiryTime = wrapper.readInt();

        return true;
    }

    public get expiryTime(): number
    {
        return this._expiryTime;
    }
}
