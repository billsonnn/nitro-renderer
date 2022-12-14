import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class CatalogPageExpirationParser implements IMessageParser
{
    private _pageName: string;
    private _pageId: number;
    private _secondsToExpiry: number;
    private _image: string;

    public flush(): boolean
    {
        this._pageName = null;
        this._pageId = 0;
        this._secondsToExpiry = 0;
        this._image = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pageId = wrapper.readInt();
        this._pageName = wrapper.readString();
        this._secondsToExpiry = wrapper.readInt();
        this._image = wrapper.readString();

        return true;
    }

    public get pageName(): string
    {
        return this._pageName;
    }

    public get pageId(): number
    {
        return this._pageId;
    }

    public get secondsToExpiry(): number
    {
        return this._secondsToExpiry;
    }

    public get image(): string
    {
        return this._image;
    }
}
