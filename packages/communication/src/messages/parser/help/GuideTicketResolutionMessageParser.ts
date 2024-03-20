import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuideTicketResolutionMessageParser implements IMessageParser
{
    public static readonly RESOLUTION_GUARDIANS_TOOK_ACTION: number = 0;
    public static readonly RESOLUTION_FORWARDED_TO_MODERATORS: number = 1;
    public static readonly RESOLUTION_REPORTER_IS_ABUSIVE: number = 2;

    private _resolution: number;

    public flush(): boolean
    {
        this._resolution = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._resolution = wrapper.readInt();

        return true;
    }

    public get resolution(): number
    {
        return this._resolution;
    }
}
