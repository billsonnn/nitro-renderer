import { IMessageDataWrapper } from '../../../../../api';

export class FriendRequestData
{
    private _requestId: number;
    private _requesterName: string;
    private _requesterUserId: number;
    private _figureString: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._requestId = wrapper.readInt();
        this._requesterName = wrapper.readString();
        this._figureString = wrapper.readString();
        this._requesterUserId = this._requestId;
    }

    public get requestId(): number
    {
        return this._requestId;
    }

    public get requesterName(): string
    {
        return this._requesterName;
    }

    public get requesterUserId(): number
    {
        return this._requesterUserId;
    }

    public get figureString(): string
    {
        return this._figureString;
    }
}
