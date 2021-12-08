export class PollChoice
{
    private _value:string;
    private _choiceText:string;
    private _choiceType:number;

    constructor(k:string, _arg_2:string, _arg_3:number)
    {
        this._value = k;
        this._choiceText = _arg_2;
        this._choiceType = _arg_3;
    }

    public get value():string
    {
        return this._value;
    }

    public set value(value:string)
    {
        this._value = value;
    }

    public get choiceText():string
    {
        return this._choiceText;
    }

    public set choiceText(choiceText:string)
    {
        this._choiceText = choiceText;
    }

    public get choiceType():number
    {
        return this._choiceType;
    }

    public set choiceType(k:number)
    {
        this._choiceType = k;
    }
}
