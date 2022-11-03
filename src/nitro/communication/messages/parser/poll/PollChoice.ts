import { IPollChoice } from '../../../../../api';

export class PollChoice implements IPollChoice
{
    private _value: string;
    private _choiceText: string;
    private _choiceType: number;

    constructor(value: string, choiceText: string, choiceType: number)
    {
        this._value = value;
        this._choiceText = choiceText;
        this._choiceType = choiceType;
    }

    public get value(): string
    {
        return this._value;
    }

    public set value(value: string)
    {
        this._value = value;
    }

    public get choiceText(): string
    {
        return this._choiceText;
    }

    public set choiceText(choiceText: string)
    {
        this._choiceText = choiceText;
    }

    public get choiceType(): number
    {
        return this._choiceType;
    }

    public set choiceType(choiceType: number)
    {
        this._choiceType = choiceType;
    }
}
