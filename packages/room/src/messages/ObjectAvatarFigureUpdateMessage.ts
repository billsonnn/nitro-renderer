import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarFigureUpdateMessage extends ObjectStateUpdateMessage
{
    private _figure: string;
    private _gender: string;
    private _subType: string;
    private _isRiding: boolean;

    constructor(figure: string, gender: string = null, subType: string = null, isRiding: boolean = false)
    {
        super();

        this._figure = figure;
        this._gender = gender;
        this._subType = subType;
        this._isRiding = isRiding;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get subType(): string
    {
        return this._subType;
    }

    public get isRiding(): boolean
    {
        return this._isRiding;
    }
}