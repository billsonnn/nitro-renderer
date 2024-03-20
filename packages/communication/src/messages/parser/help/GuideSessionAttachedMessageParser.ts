import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuideSessionAttachedMessageParser implements IMessageParser
{
    private _asGuide: boolean;
    private _helpRequestType: number;
    private _helpRequestDescription: string;
    private _roleSpecificWaitTime: number;

    public flush(): boolean
    {
        this._asGuide = false;
        this._helpRequestType = 0;
        this._helpRequestDescription = null;
        this._roleSpecificWaitTime = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._asGuide = wrapper.readBoolean();
        this._helpRequestType = wrapper.readInt();
        this._helpRequestDescription = wrapper.readString();
        this._roleSpecificWaitTime = wrapper.readInt();

        return true;
    }

    public get asGuide(): boolean
    {
        return this._asGuide;
    }

    public get helpRequestType(): number
    {
        return this._helpRequestType;
    }

    public get helpRequestDescription(): string
    {
        return this._helpRequestDescription;
    }

    public get roleSpecificWaitTime(): number
    {
        return this._roleSpecificWaitTime;
    }
}
