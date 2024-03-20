export class BadgeBaseAndLevel
{
    private _badgeId: string = '';
    private _level: number = 1;
    private _base: string = '';

    constructor(badgeId: string)
    {
        this._badgeId = badgeId;

        this.parseText();
    }

    private parseText():void
    {
        let length = (this._badgeId.length - 1);

        while(length > 0 && this.isNumber(this._badgeId.charAt(length))) length--;

        this._base = this._badgeId.substr(0, (length + 1));

        const level = this._badgeId.substr((length + 1), this._badgeId.length);

        if(level && (level !== '')) this._level = Number.parseInt(level);
    }

    private isNumber(text: string): boolean
    {
        const char = text.charCodeAt(0);

        return (char >= 48 && char <= 57);
    }

    public get level(): number
    {
        return this._level;
    }

    public set level(k : number)
    {
        this._level = Math.max(1, k);
    }

    public get getBadgeId(): string
    {
        return this._base + this._level;
    }

    public get base(): string
    {
        return this._base;
    }
}
