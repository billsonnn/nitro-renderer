import { IFigureDataSet, IFigurePart, IFigurePartSet } from '@nitrots/api';
import { FigurePart } from './FigurePart';

export class FigurePartSet implements IFigurePartSet
{
    private _id: number;
    private _type: string;
    private _gender: string;
    private _clubLevel: number;
    private _isColorable: boolean;
    private _isSelectable: boolean;
    private _parts: IFigurePart[];
    private _hiddenLayers: string[];
    private _isPreSelectable: boolean;
    private _isSellable: boolean;

    constructor(type: string, data: IFigureDataSet)
    {
        if(!type || !data) throw new Error('invalid_data');

        this._id = data.id;
        this._type = type;
        this._gender = data.gender;
        this._clubLevel = data.club;
        this._isColorable = data.colorable;
        this._isSelectable = data.selectable;
        this._parts = [];
        this._hiddenLayers = [];
        this._isPreSelectable = data.preselectable;
        this._isSellable = data.sellable;

        for(const part of data.parts)
        {
            const newPart = new FigurePart(part);
            const partIndex = this.getPartIndex(newPart);

            if(partIndex !== -1) this._parts.splice(partIndex, 0, newPart);
            else this._parts.push(newPart);
        }

        if(data.hiddenLayers)
        {
            for(const hiddenLayer of data.hiddenLayers) this._hiddenLayers.push(hiddenLayer.partType);
        }
    }

    public dispose(): void
    {
        this._parts = null;
        this._hiddenLayers = null;
    }

    private getPartIndex(part: FigurePart): number
    {
        const totalParts = this._parts.length;

        if(!totalParts) return -1;

        for(let i = 0; i < totalParts; i++)
        {
            const existingPart = this._parts[i];

            if(!existingPart) continue;

            if(existingPart.type !== part.type || existingPart.index > part.index) continue;

            return i;
        }

        return -1;
    }

    public getPart(k: string, _arg_2: number): IFigurePart
    {
        for(const part of this._parts)
        {
            if((part.type !== k) || (part.id !== _arg_2)) continue;

            return part;
        }

        return null;
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): string
    {
        return this._type;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get clubLevel(): number
    {
        return this._clubLevel;
    }

    public get isColorable(): boolean
    {
        return this._isColorable;
    }

    public get isSelectable(): boolean
    {
        return this._isSelectable;
    }

    public get parts(): IFigurePart[]
    {
        return this._parts;
    }

    public get hiddenLayers(): string[]
    {
        return this._hiddenLayers;
    }

    public get isPreSelectable(): boolean
    {
        return this._isPreSelectable;
    }

    public get isSellable(): boolean
    {
        return this._isSellable;
    }
}
