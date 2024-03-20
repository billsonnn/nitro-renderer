import { IFigureData, IFigurePartSet, IFigureSetData, IPalette, ISetType, IStructureData } from '@nitrots/api';
import { Palette, SetType } from './figure';

export class FigureSetData implements IFigureSetData, IStructureData
{
    private _palettes: Map<string, Palette>;
    private _setTypes: Map<string, SetType>;

    constructor()
    {
        this._palettes = new Map();
        this._setTypes = new Map();
    }

    public dispose(): void
    {

    }

    public parse(data: IFigureData): boolean
    {
        if(!data) return false;

        for(const palette of data.palettes)
        {
            const newPalette = new Palette(palette);

            if(!newPalette) continue;

            this._palettes.set(newPalette.id.toString(), newPalette);
        }

        for(const set of data.setTypes)
        {
            const newSet = new SetType(set);

            if(!newSet) continue;

            this._setTypes.set(newSet.type, newSet);
        }

        return true;
    }

    public injectJSON(data: IFigureData): void
    {
        for(const setType of data.setTypes)
        {
            const existingSetType = this._setTypes.get(setType.type);

            if(existingSetType) existingSetType.cleanUp(setType);
            else this._setTypes.set(setType.type, new SetType(setType));
        }

        this.appendJSON(data);
    }

    public appendJSON(data: IFigureData): boolean
    {
        if(!data) return false;

        for(const palette of data.palettes)
        {
            const id = palette.id.toString();
            const existingPalette = this._palettes.get(id);

            if(!existingPalette) this._palettes.set(id, new Palette(palette));
            else existingPalette.append(palette);
        }

        for(const setType of data.setTypes)
        {
            const type = setType.type;
            const existingSetType = this._setTypes.get(type);

            if(!existingSetType) this._setTypes.set(type, new SetType(setType));
            else existingSetType.append(setType);
        }

        return false;
    }

    public getMandatorySetTypeIds(k: string, _arg_2: number): string[]
    {
        const types: string[] = [];

        for(const set of this._setTypes.values())
        {
            if(!set || !set.isMandatory(k, _arg_2)) continue;

            types.push(set.type);
        }

        return types;
    }

    public getDefaultPartSet(type: string, gender: string): IFigurePartSet
    {
        const setType = this._setTypes.get(type);

        if(!setType) return null;

        return setType.getDefaultPartSet(gender);
    }

    public getSetType(k: string): ISetType
    {
        return (this._setTypes.get(k) || null);
    }

    public getPalette(k: number): IPalette
    {
        return (this._palettes.get(k.toString()) || null);
    }

    public getFigurePartSet(k: number): IFigurePartSet
    {
        for(const set of this._setTypes.values())
        {
            const partSet = set.getPartSet(k);

            if(!partSet) continue;

            return partSet;
        }

        return null;
    }
}
