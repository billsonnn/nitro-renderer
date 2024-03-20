export class ObjectMouseData
{
    private _objectId: string;
    private _spriteTag: string;

    constructor()
    {
        this._objectId = '';
        this._spriteTag = '';
    }

    public get objectId(): string
    {
        return this._objectId;
    }

    public set objectId(k: string)
    {
        this._objectId = k;
    }

    public get spriteTag(): string
    {
        return this._spriteTag;
    }

    public set spriteTag(k: string)
    {
        this._spriteTag = k;
    }
}