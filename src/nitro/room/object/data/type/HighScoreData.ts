export class HighScoreData
{
    private _score: number;
    private _users: string[];

    constructor()
    {
        this._score = -1;
        this._users = [];
    }

    public get score(): number
    {
        return this._score;
    }

    public set score(k: number)
    {
        this._score = k;
    }

    public get users(): string[]
    {
        return this._users;
    }

    public set users(k: string[])
    {
        this._users = k;
    }

    public addUsername(k: string): void
    {
        this._users.push(k);
    }
}