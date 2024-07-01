import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { AreaHideMessageData } from '../engine';

export class AreaHideMessageParser implements IMessageParser
{
    private _areaData: AreaHideMessageData;

    public flush(): boolean
    {
        this._areaData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._areaData = new AreaHideMessageData(wrapper);

        return true;
    }

    public get areaData(): AreaHideMessageData
    {
        return this._areaData;
    }
}
