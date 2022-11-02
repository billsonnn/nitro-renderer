import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RoomInviteErrorParser implements IMessageParser
{
    private _errorCode: number;
    private _failedRecipients: number[];

    public flush(): boolean
    {
        this._errorCode = 0;
        this._failedRecipients = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._errorCode = wrapper.readInt();

        let totalFailed = wrapper.readInt();

        while(totalFailed > 0)
        {
            this._failedRecipients.push(wrapper.readInt());

            totalFailed--;
        }

        return true;
    }

    public get errorCode(): number
    {
        return this._errorCode;
    }

    public get failedRecipients(): number[]
    {
        return this._failedRecipients;
    }
}
