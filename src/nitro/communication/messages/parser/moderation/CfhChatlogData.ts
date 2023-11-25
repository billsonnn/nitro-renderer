import { IMessageDataWrapper } from '../../../../../api';
import { ChatRecordData } from './ChatRecordData';

export class CfhChatlogData
{
    private _issueId: number;
    private _callerUserId: number;
    private _reportedUserId: number;
    private _chatRecordId: number;
    private _chatRecord: ChatRecordData;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._issueId = wrapper.readInt();
        this._callerUserId = wrapper.readInt();
        this._reportedUserId = wrapper.readInt();
        this._chatRecordId = wrapper.readInt();
        this._chatRecord = new ChatRecordData(wrapper);
    }

    public get issueId(): number
    {
        return this._issueId;
    }

    public get callerUserId(): number
    {
        return this._callerUserId;
    }

    public get reportedUserId(): number
    {
        return this._reportedUserId;
    }

    public get chatRecordId(): number
    {
        return this._chatRecordId;
    }

    public get chatRecord(): ChatRecordData
    {
        return this._chatRecord;
    }
}
