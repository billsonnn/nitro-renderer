export class AvatarAnimationFrame
{
    private _number: number;
    private _assetPartDefinition: string;

    constructor(data: any)
    {
        this._number = data.number;
        this._assetPartDefinition = data.assetPartDefinition || null;
    }

    public get number(): number
    {
        return this._number;
    }

    public get assetPartDefinition(): string
    {
        return this._assetPartDefinition;
    }
}
