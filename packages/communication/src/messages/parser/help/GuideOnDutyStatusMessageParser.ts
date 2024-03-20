import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuideOnDutyStatusMessageParser implements IMessageParser
{
    private _onDuty: boolean;
    private _guidesOnDuty: number;
    private _helpersOnDuty: number;
    private _guardiansOnDuty: number;

    public flush(): boolean
    {
        this._onDuty = false;
        this._guidesOnDuty = 0;
        this._helpersOnDuty = 0;
        this._guardiansOnDuty = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._onDuty = wrapper.readBoolean();
        this._guidesOnDuty = wrapper.readInt();
        this._helpersOnDuty = wrapper.readInt();
        this._guardiansOnDuty = wrapper.readInt();

        return true;
    }

    public get onDuty(): boolean
    {
        return this._onDuty;
    }

    public get guidesOnDuty(): number
    {
        return this._guidesOnDuty;
    }

    public get helpersOnDuty(): number
    {
        return this._helpersOnDuty;
    }

    public get guardiansOnDuty(): number
    {
        return this._guardiansOnDuty;
    }
}
