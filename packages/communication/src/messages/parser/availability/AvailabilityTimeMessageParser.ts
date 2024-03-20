import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class AvailabilityTimeMessageParser implements IMessageParser
{
    private _isOpen: boolean;
    private _minutesUntilChange: number;

    public flush(): boolean
    {
        this._isOpen = false;
        this._minutesUntilChange = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isOpen = (wrapper.readInt() > 0);
        this._minutesUntilChange = wrapper.readInt();

        return true;
    }

    public get isOpen(): boolean
    {
        return this._isOpen;
    }

    public get minutesUntilChange(): number
    {
        return this._minutesUntilChange;
    }
}
