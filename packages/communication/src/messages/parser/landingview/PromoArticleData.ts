import { IMessageDataWrapper } from '@nitrots/api';

export class PromoArticleData
{
    public static readonly LINK_TYPE_URL = 0;
    public static readonly LINK_TYPE_INTERNAL = 1;
    public static readonly LINK_TYPE_NO_LINK = 2;

    private _id: number;
    private _title: string;
    private _bodyText: string;
    private _buttonText: string;
    private _linkType: number;
    private _linkContent: string;
    private _imageUrl: string;

    constructor(k: IMessageDataWrapper)
    {
        this._id = k.readInt();
        this._title = k.readString();
        this._bodyText = k.readString();
        this._buttonText = k.readString();
        this._linkType = k.readInt();
        this._linkContent = k.readString();
        this._imageUrl = k.readString();
    }

    public get id(): number
    {
        return this._id;
    }

    public get title(): string
    {
        return this._title;
    }

    public get bodyText(): string
    {
        return this._bodyText;
    }

    public get buttonText(): string
    {
        return this._buttonText;
    }

    public get linkType(): number
    {
        return this._linkType;
    }

    public get linkContent(): string
    {
        return this._linkContent;
    }

    public get imageUrl(): string
    {
        return this._imageUrl;
    }
}
