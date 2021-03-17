import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogPageData } from './utils/CatalogPageData';

export class CatalogPagesParser implements IMessageParser
{
    private _root: CatalogPageData;
    private _newAdditionsAvailable: boolean;
    private _catalogType: string;

    public flush(): boolean
    {
        this._root = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._root                  = new CatalogPageData(wrapper);
        this._newAdditionsAvailable = wrapper.readBoolean();
        this._catalogType           = wrapper.readString();

        return true;
    }

    public get root(): CatalogPageData
    {
        return this._root;
    }

    public get newAdditionsAvailable(): boolean
    {
        return this._newAdditionsAvailable;
    }

    public get catalogType(): string
    {
        return this._catalogType;
    }
}