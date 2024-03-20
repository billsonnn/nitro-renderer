import { IPetCustomPart } from './IPetCustomPart';
import { PetCustomPart } from './PetCustomPart';

export class PetFigureData
{
    private _typeId: number;
    private _paletteId: number;
    private _color: number;
    private _headOnly: boolean;

    private _customParts: IPetCustomPart[];
    private _customLayerIds: number[];
    private _customPartIds: number[];
    private _customPaletteIds: number[];

    constructor(k: string)
    {
        this._typeId = this.getTypeId(k);
        this._paletteId = this.getPaletteId(k);
        this._color = this.getColor(k);
        this._headOnly = this.getHeadOnly(k);

        const _local_2 = this.getCustomData(k);

        this._customLayerIds = this.getCustomLayerIds(_local_2);
        this._customPartIds = this.getCustomPartIds(_local_2);
        this._customPaletteIds = this.getCustomPaletteIds(_local_2);
        this._customParts = [];

        let i = 0;

        while(i < this._customLayerIds.length)
        {
            this._customParts.push(new PetCustomPart(this._customLayerIds[i], this._customPartIds[i], this._customPaletteIds[i]));

            i++;
        }
    }

    public get typeId(): number
    {
        return this._typeId;
    }

    public get paletteId(): number
    {
        return this._paletteId;
    }

    public get color(): number
    {
        return this._color;
    }

    public get customLayerIds(): number[]
    {
        return this._customLayerIds;
    }

    public get customPartIds(): number[]
    {
        return this._customPartIds;
    }

    public get customPaletteIds(): number[]
    {
        return this._customPaletteIds;
    }

    public get customParts(): IPetCustomPart[]
    {
        return this._customParts;
    }

    public getCustomPart(k: number): IPetCustomPart
    {
        if(this._customParts)
        {
            for(const _local_2 of this._customParts)
            {
                if(_local_2.layerId === k) return _local_2;
            }
        }

        return null;
    }

    public get hasCustomParts(): boolean
    {
        return (!(this._customLayerIds == null)) && (this._customLayerIds.length > 0);
    }

    public get headOnly(): boolean
    {
        return this._headOnly;
    }

    public get figureString(): string
    {
        let figure = ((((this.typeId + ' ') + this.paletteId) + ' ') + this.color.toString(16));

        figure = (figure + (' ' + this.customParts.length));

        for(const _local_2 of this.customParts)
        {
            figure = (figure + (((((' ' + _local_2.layerId) + ' ') + _local_2.partId) + ' ') + _local_2.paletteId));
        }

        return figure;
    }

    private getCustomData(k: string): string[]
    {
        let _local_2: string[] = [];

        if(k)
        {
            const _local_3 = k.split(' ');
            const _local_4 = ((this._headOnly) ? 1 : 0);
            const _local_5 = (4 + _local_4);

            if(_local_3.length > _local_5)
            {
                const _local_6 = (3 + _local_4);
                const _local_7 = parseInt(_local_3[_local_6]);

                _local_2 = _local_3.slice(_local_5, (_local_5 + (_local_7 * 3)));
            }
        }

        return _local_2;
    }

    private getCustomLayerIds(data: string[]): number[]
    {
        const layerIds: number[] = [];

        let i = 0;

        while(i < data.length)
        {
            layerIds.push(parseInt(data[(i + 0)]));

            i = (i + 3);
        }

        return layerIds;
    }

    private getCustomPartIds(data: string[]): number[]
    {
        const partIds: number[] = [];

        let i = 0;

        while(i < data.length)
        {
            partIds.push(parseInt(data[(i + 1)]));

            i = (i + 3);
        }

        return partIds;
    }

    private getCustomPaletteIds(data: string[]): number[]
    {
        const paletteIds: number[] = [];

        let i = 0;

        while(i < data.length)
        {
            paletteIds.push(parseInt(data[(i + 2)]));

            i = (i + 3);
        }

        return paletteIds;
    }

    private getTypeId(data: string): number
    {
        if(data)
        {
            const parts = data.split(' ');

            if(parts.length >= 1) return parseInt(parts[0]);
        }

        return 0;
    }

    private getPaletteId(data: string): number
    {
        if(data)
        {
            const parts = data.split(' ');

            if(parts.length >= 2) return parseInt(parts[1]);
        }

        return 0;
    }

    private getColor(data: string): number
    {
        if(data)
        {
            const parts = data.split(' ');

            if(parts.length >= 3) return parseInt(parts[2], 16);
        }

        return 0xFFFFFF;
    }

    private getHeadOnly(data: string): boolean
    {
        if(data)
        {
            const parts = data.split(' ');

            if(parts.length >= 4) return parts[3] === 'head';
        }

        return false;
    }
}
