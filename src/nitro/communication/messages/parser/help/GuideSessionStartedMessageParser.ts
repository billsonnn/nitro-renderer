import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class GuideSessionStartedMessageParser implements IMessageParser
{
    private _requesterUserId: number;
    private _requesterName: string;
    private _requesterFigure: string;
    private _guideUserId: number;
    private _guideName: string;
    private _guideFigure: string;

    public flush(): boolean
    {
        this._requesterUserId = 0;
        this._requesterName = null;
        this._requesterFigure = null;
        this._guideUserId = 0;
        this._guideName = null;
        this._guideFigure = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._requesterUserId = wrapper.readInt();
        this._requesterName = wrapper.readString();
        this._requesterFigure = wrapper.readString();
        this._guideUserId = wrapper.readInt();
        this._guideName = wrapper.readString();
        this._guideFigure = wrapper.readString();

        return true;
    }

    public get requesterUserId(): number
    {
        return this._requesterUserId;
    }

    public get requesterName(): string
    {
        return this._requesterName;
    }

    public get requesterFigure(): string
    {
        return this._requesterFigure;
    }

    public get guideUserId(): number
    {
        return this._guideUserId;
    }

    public get guideName(): string
    {
        return this._guideName;
    }

    public get guideFigure(): string
    {
        return this._guideFigure;
    }
}
