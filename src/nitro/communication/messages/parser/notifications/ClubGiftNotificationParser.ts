import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class ClubGiftNotificationParser implements IMessageParser
{
    private _numGifts: number;

    public flush(): boolean
    {
        this._numGifts = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._numGifts = wrapper.readInt();

        return true;
    }

    public get numGifts(): number
    {
        return this._numGifts;
    }
}
