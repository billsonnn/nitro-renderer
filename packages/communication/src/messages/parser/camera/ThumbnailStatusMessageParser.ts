import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ThumbnailStatusMessageParser implements IMessageParser
{
    private _ok: boolean = true;
    private _renderLimitHit: boolean = false;

    public flush(): boolean
    {
        this._ok = true;
        this._renderLimitHit = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        if(wrapper.bytesAvailable)
        {
            this._ok = wrapper.readBoolean();
            this._renderLimitHit = wrapper.readBoolean();
        }

        return true;
    }

    public get ok(): boolean
    {
        return this._ok;
    }

    public get isRenderLimitHit(): boolean
    {
        return this._renderLimitHit;
    }
}
