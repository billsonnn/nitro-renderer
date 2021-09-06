export class GroupDataBadgePart
{
    public isBase: boolean;
    public key: number;
    public color: number;
    public position: number;

    constructor(isBase: boolean)
    {
        this.isBase = isBase;
        this.key = 0;
        this.color = 0;
        this.position = 4;
    }

    public get code(): string
    {
        if(this.key === 0) return null;

        return (this.isBase ? 'b' : 's') + (this.key < 100 ? '0' : '') + (this.key < 10 ? '0' : '') + this.key + (this.color < 10 ? '0' : '') + this.color + this.position;
    }
}
