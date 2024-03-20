import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class MaintenanceStatusMessageParser implements IMessageParser
{
    private _isInMaintenance: boolean;
    private _minutesUntilMaintenance: number;
    private _duration: number;

    public flush(): boolean
    {
        this._isInMaintenance = false;
        this._minutesUntilMaintenance = 0;
        this._duration = 15;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isInMaintenance = wrapper.readBoolean();
        this._minutesUntilMaintenance = wrapper.readInt();

        if(wrapper.bytesAvailable)
        {
            this._duration = wrapper.readInt();
        }

        return true;
    }

    public get isInMaintenance(): boolean
    {
        return this._isInMaintenance;
    }

    public get minutesUntilMaintenance(): number
    {
        return this._minutesUntilMaintenance;
    }

    public get duration(): number
    {
        return this._duration;
    }
}
