import { ActionDefinition } from '../actions/ActionDefinition';
import { IActionDefinition } from '../actions/IActionDefinition';
import { IFigureSetData } from './IFigureSetData';
import { ActivePartSet } from './parts/ActivePartSet';
import { PartDefinition } from './parts/PartDefinition';

export class PartSetsData implements IFigureSetData
{
    private _parts: Map<string, PartDefinition>;
    private _activePartSets: Map<string, ActivePartSet>;

    constructor()
    {
        this._parts             = new Map();
        this._activePartSets    = new Map();
    }

    public parse(data: any): boolean
    {
        if(data.partSet && (data.partSet.length > 0))
        {
            for(const part of data.partSet)
            {
                if(!part) continue;

                this._parts.set(part.setType, new PartDefinition(part));
            }
        }

        if(data.activePartSets && (data.activePartSets.length > 0))
        {
            for(const activePart of data.activePartSets)
            {
                if(!activePart) continue;

                this._activePartSets.set(activePart.id, new ActivePartSet(activePart));
            }
        }

        return true;
    }

    public _Str_1017(data: any): boolean
    {
        if(data.partSet && (data.partSet.length > 0))
        {
            for(const part of data.partSet)
            {
                if(!part) continue;

                this._parts.set(part.setType, new PartDefinition(part));
            }
        }

        if(data.activePartSets && (data.activePartSets.length > 0))
        {
            for(const activePart of data.activePartSets)
            {
                if(!activePart) continue;

                this._activePartSets.set(activePart.id, new ActivePartSet(activePart));
            }
        }

        return false;
    }

    public _Str_1795(k:IActionDefinition): string[]
    {
        const activePartSet = this._activePartSets.get(k.activePartSet);

        if(!activePartSet) return [];

        return activePartSet._Str_806;
    }

    public _Str_1102(part: string): PartDefinition
    {
        const existing = this._parts.get(part);

        if(!existing) return null;

        return existing;
    }

    public _Str_1520(k: any): PartDefinition
    {
        const _local_2 = k.setType as string;

        let existing = this._parts.get(_local_2);

        if(!existing)
        {
            existing = new PartDefinition(k);

            this._parts.set(_local_2, existing);
        }

        return existing;
    }

    public _Str_1113(k: ActionDefinition): ActivePartSet
    {
        const existing = this._activePartSets.get(k.activePartSet);

        if(!existing) return null;

        return existing;
    }

    public get _Str_806(): Map<string, PartDefinition>
    {
        return this._parts;
    }

    public get _Str_1979(): Map<string, ActivePartSet>
    {
        return this._activePartSets;
    }
}