import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class CatalogUpdatedParser implements IMessageParser
{
    private _instantlyRefreshCatalogue: boolean;
    private _newFurniDataHash: string;

    public flush(): boolean
    {
        this._instantlyRefreshCatalogue = false;
        this._newFurniDataHash          = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._instantlyRefreshCatalogue = wrapper.readBoolean();

        if(wrapper.bytesAvailable) this._newFurniDataHash = wrapper.readString();

        return true;
    }

    public get instantlyRefreshCatalogue(): boolean
    {
        return this._instantlyRefreshCatalogue;
    }

    public get newFurniDataHash(): string
    {
        return this._newFurniDataHash;
    }
}