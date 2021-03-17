import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class CatalogModeParser implements IMessageParser
{
    private _mode: number;

    public flush(): boolean
    {
        this._mode = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._mode = wrapper.readInt();

        return true;
    }

    public get mode(): number
    {
        return this._mode;
    }
}