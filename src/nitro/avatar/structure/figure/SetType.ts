import { AdvancedMap } from '../../../../core/utils/AdvancedMap';
import { FigurePartSet } from './FigurePartSet';
import { IFigurePartSet } from './IFigurePartSet';
import { ISetType } from './ISetType';

export class SetType implements ISetType
{
    private _type: string;
    private _paletteId: number;
    private _isMandatory: { [index: string]: boolean[] };
    private _partSets: AdvancedMap<string, IFigurePartSet>;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._type              = data['$'].type;
        this._paletteId         = parseInt(data['$'].paletteid);
        this._isMandatory       = {};
        this._isMandatory['F']  = [ parseInt(data['$'].mand_f_0) === 1, parseInt(data['$'].mand_f_1) === 1 ];
        this._isMandatory['M']  = [ (parseInt(data['$'].mand_m_0) === 1), (parseInt(data['$'].mand_m_1) === 1) ];
        this._partSets          = new AdvancedMap();

        this._Str_2015(data);
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

    public _Str_1874(k: any): void
    {
        for(const _local_2 of k)
        {
            const _local_3 = (_local_2.id as string);
            const _local_4 = (this._partSets.getValue(_local_3) as FigurePartSet);

            if(_local_4)
            {
                _local_4.dispose();

                this._partSets.remove(_local_3);
            }
        }
    }

    public _Str_2015(k: any): void
    {
        if(!k || !k.set) return;

        for(const set of k.set) this._partSets.add(set['$'].id, new FigurePartSet(this._type, set));
    }

    public _Str_2264(k: string): IFigurePartSet
    {
        for(const set of this._partSets.getValues())
        {
            if(!set) continue;

            if((set.clubLevel === 0) && ((set.gender === k) || (set.gender === 'U'))) return set;
        }

        return null;
    }

    public _Str_1020(k: number): IFigurePartSet
    {
        return this._partSets.getValue(k.toString());
    }

    public get type(): string
    {
        return this._type;
    }

    public get _Str_734(): number
    {
        return this._paletteId;
    }

    public _Str_895(k: string, _arg_2: number): boolean
    {
        return this._isMandatory[k.toUpperCase()][Math.min(_arg_2, 1)];
    }

    public _Str_1002(k: string): number
    {
        const _local_2 = this._isMandatory[k.toUpperCase()];

        return _local_2.indexOf(false);
    }

    public get _Str_710(): AdvancedMap<string, IFigurePartSet>
    {
        return this._partSets;
    }
}