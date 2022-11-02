import { IMessageDataWrapper } from '../../../../../api';

export class AcceptFriendFailerData
{
    private _senderId: number;
    private _errorCode: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._senderId = wrapper.readInt();
        this._errorCode = wrapper.readInt();
    }

    public get senderId(): number
    {
        return this._senderId;
    }

    public get errorCode(): number
    {
        return this._errorCode;
    }
}
