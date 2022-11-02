import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PendingGuideTicketData } from './PendingGuideTicketData';

export class GuideReportingStatusMessageParser implements IMessageParser
{
    public static readonly GUIDE_REPORTING_STATUS_OK: number = 0;
    public static readonly GUIDE_REPORTING_STATUS_PENDING_TICKET: number = 1;
    public static readonly GUIDE_REPORTING_STATUS_ABUSIVE: number = 2;
    public static readonly GUIDE_REPORTING_STATUS_REPORTING_TOO_QUICKLY: number = 3;

    private _statusCode: number;
    private _pendingTicket: PendingGuideTicketData;

    public flush(): boolean
    {
        this._statusCode = 0;
        this._pendingTicket = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._statusCode = wrapper.readInt();
        this._pendingTicket = new PendingGuideTicketData(
            wrapper.readInt(),
            wrapper.readInt(),
            wrapper.readBoolean(),
            wrapper.readString(),
            wrapper.readString(),
            wrapper.readString(),
            wrapper.readString()
        );

        return true;
    }

    public get statusCode(): number
    {
        return this._statusCode;
    }

    public get pendingTicket(): PendingGuideTicketData
    {
        return this._pendingTicket;
    }
}
