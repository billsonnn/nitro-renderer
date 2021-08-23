import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class CatalogPageExpirationParser implements IMessageParser
{
    private _pageName: string;
    private _pageId: number;
    private _Str_5158: number;
    private _image: string;

    public flush(): boolean
    {
        this._pageName = null;
        this._pageId = 0;
        this._Str_5158 = 0;
        this._image = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pageId = wrapper.readInt();
        this._pageName = wrapper.readString();
        this._Str_5158 = wrapper.readInt();
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

    public get _Str_17123(): number
    {
        return this._Str_5158;
    }

    public get image(): string
    {
        return this._image;
    }
}
