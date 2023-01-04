import { IMessageDataWrapper } from '../../../../../../api';

export class GameRewardWinnerEntry
{
    private _name: string;
    private _figure: string;
    private _gender: string;
    private _rank: number;
    private _score: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._name = wrapper.readString();
        this._figure = wrapper.readString();
        this._gender = wrapper.readString();
        this._rank = wrapper.readInt();
        this._score = wrapper.readInt();
    }

    public get name(): string
    {
        return this._name;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get rank(): number
    {
        return this._rank;
    }

    public get score(): number
    {
        return this._score;
    }
}
