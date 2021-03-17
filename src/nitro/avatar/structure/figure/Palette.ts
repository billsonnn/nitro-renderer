import { IPalette } from './IPalette';
import { IPartColor } from './IPartColor';
import { PartColor } from './PartColor';

export class Palette implements IPalette
{
    private _id: number;
    private _colors: Map<string, IPartColor>;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id        = parseInt(data['$'].id);
        this._colors    = new Map();

        this._Str_2015(data);
    }

    public _Str_2015(data: any): void
    {
        for(const color of data.color)
        {
            const newColor = new PartColor(color);

            this._colors.set(color['$'].id.toString(), newColor);
        }
    }

    public _Str_751(id: number): IPartColor
    {
        if((id === undefined) || id < 0) return null;

        return (this._colors.get(id.toString()) || null);
    }

    public get id(): number
    {
        return this._id;
    }

    public get colors(): Map<string, IPartColor>
    {
        return this._colors;
    }
}