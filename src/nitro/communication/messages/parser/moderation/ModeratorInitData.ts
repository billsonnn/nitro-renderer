import { IMessageDataWrapper } from '../../../../../api';
import { IssueInfoMessageParser } from './IssueInfoMessageParser';
import { IssueMessageData } from './IssueMessageData';

export class ModeratorInitData
{
    private _messageTemplates: string[];
    private _roomMessageTemplates: string[];
    private _issues: IssueMessageData[];
    private _cfhPermission: boolean;
    private _chatlogsPermission: boolean;
    private _alertPermission: boolean;
    private _kickPermission: boolean;
    private _banPermission: boolean;
    private _roomAlertPermission: boolean;
    private _roomKickPermission: boolean;

    private _disposed: boolean = false;

    constructor(wrapper: IMessageDataWrapper)
    {
        const local2 = new IssueInfoMessageParser();
        this._issues = [];
        this._messageTemplates = [];
        this._roomMessageTemplates = [];

        let local3 = wrapper.readInt();
        let i = 0;
        while(i < local3)
        {
            if(local2.parse(wrapper))
            {
                this._issues.push(local2.issueData);
            }
            i++;
        }

        local3 = wrapper.readInt();
        i = 0;
        while(i < local3)
        {
            this._messageTemplates.push(wrapper.readString());
            i++;
        }

        local3 = wrapper.readInt();
        i = 0;
        while(i < local3)
        {
            wrapper.readString();
            i++;
        }

        this._cfhPermission = wrapper.readBoolean();
        this._chatlogsPermission = wrapper.readBoolean();
        this._alertPermission = wrapper.readBoolean();
        this._kickPermission = wrapper.readBoolean();
        this._banPermission = wrapper.readBoolean();
        this._roomAlertPermission = wrapper.readBoolean();
        this._roomKickPermission = wrapper.readBoolean();
        local3 = wrapper.readInt();
        i = 0;
        while(i < local3)
        {
            this._roomMessageTemplates.push(wrapper.readString());
            i++;
        }


    }
    public dispose(): void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
        this._messageTemplates = null;
        this._roomMessageTemplates = null;
        this._issues = null;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get messageTemplates(): string[]
    {
        return this._messageTemplates;
    }

    public get roomMessageTemplates(): string[]
    {
        return this._roomMessageTemplates;
    }

    public get issues(): IssueMessageData[]
    {
        return this._issues;
    }

    public get cfhPermission(): boolean
    {
        return this._cfhPermission;
    }

    public get chatlogsPermission(): boolean
    {
        return this._chatlogsPermission;
    }

    public get alertPermission(): boolean
    {
        return this._alertPermission;
    }

    public get kickPermission(): boolean
    {
        return this._kickPermission;
    }

    public get banPermission(): boolean
    {
        return this._banPermission;
    }

    public get roomAlertPermission(): boolean
    {
        return this._roomAlertPermission;
    }

    public get roomKickPermission(): boolean
    {
        return this._roomKickPermission;
    }

}
