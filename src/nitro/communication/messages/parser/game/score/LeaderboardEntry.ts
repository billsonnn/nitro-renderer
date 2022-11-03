import { IMessageDataWrapper } from '../../../../../../api';

export class LeaderboardEntry
{
    private _userId:number;
    private _score:number;
    private _rank:number;
    private _name:string;
    private _figure:string;
    private _gender:string;

    constructor(k:IMessageDataWrapper)
    {
        this._userId = k.readInt();
        this._score = k.readInt();
        this._rank = k.readInt();
        this._name = k.readString();
        this._figure = k.readString();
        this._gender = k.readString();
    }

    public get userId():number
    {
        return this._userId;
    }

    public get score():number
    {
        return this._score;
    }

    public get rank():number
    {
        return this._rank;
    }

    public get figure():string
    {
        return this._figure;
    }

    public get gender():string
    {
        return this._gender;
    }

    public get name():string
    {
        return this._name;
    }
}
