import { AdvancedMap, IAdvancedMap, IFigureDataSetType, IFigurePartSet, ISetType } from '../../../../api';
import { FigurePartSet } from './FigurePartSet';

export class SetType implements ISetType
{
    private _type: string;
    private _paletteId: number;
    private _isMandatory: { [index: string]: boolean[] };
    private _partSets: IAdvancedMap<string, IFigurePartSet>;

    constructor(data: IFigureDataSetType)
    {
        if(!data) throw new Error('invalid_data');

        this._type = data.type;
        this._paletteId = data.paletteId;
        this._isMandatory = {};
        this._isMandatory['F'] = [data.mandatory_f_0, data.mandatory_f_1];
        this._isMandatory['M'] = [data.mandatory_m_0, data.mandatory_m_1];
        this._partSets = new AdvancedMap();

        this.append(data);
    }

    public dispose(): void
    {
        for(const set of this._partSets.getValues())
        {
            const partSet = set as FigurePartSet;

            partSet.dispose();
        }

        this._partSets = null;
    }

    public cleanUp(data: IFigureDataSetType): void
    {
        for(const set of data.sets)
        {
            const setId = set.id.toString();
            const partSet = (this._partSets.getValue(setId) as FigurePartSet);

            if(partSet)
            {
                partSet.dispose();

                this._partSets.remove(setId);
            }
        }
    }

    public append(setType: IFigureDataSetType): void
    {
        if(!setType || !setType.sets) return;

        for(const set of setType.sets) this._partSets.add(set.id.toString(), new FigurePartSet(this._type, set));
    }

    public getDefaultPartSet(gender: string): IFigurePartSet
    {
        for(const set of this._partSets.getValues())
        {
            if(!set) continue;

            if((set.clubLevel === 0) && ((set.gender === gender) || (set.gender === 'U'))) return set;
        }

        return null;
    }

    public getPartSet(k: number): IFigurePartSet
    {
        return this._partSets.getValue(k.toString());
    }

    public get type(): string
    {
        return this._type;
    }

    public get paletteID(): number
    {
        return this._paletteId;
    }

    public isMandatory(k: string, _arg_2: number): boolean
    {
        return this._isMandatory[k.toUpperCase()][Math.min(_arg_2, 1)];
    }

    public optionalFromClubLevel(k: string): number
    {
        const _local_2 = this._isMandatory[k.toUpperCase()];

        return _local_2.indexOf(false);
    }

    public get partSets(): IAdvancedMap<string, IFigurePartSet>
    {
        return this._partSets;
    }
}
