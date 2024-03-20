import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CatalogPageWithEarliestExpiryMessageParser implements IMessageParser
{
    private _pageName: string;
    private _secondsToExpiry: number;
    private _image: string;

    public flush(): boolean
    {
        this._pageName = null;
        this._secondsToExpiry = 0;
        this._image = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pageName = wrapper.readString();
        this._secondsToExpiry = wrapper.readInt();
        this._image = wrapper.readString();

        return true;
    }

    public get pageName(): string
    {
        return this._pageName;
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
