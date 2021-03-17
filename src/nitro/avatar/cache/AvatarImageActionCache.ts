import { IActiveActionData } from '../actions/IActiveActionData';
import { AvatarImageBodyPartCache } from './AvatarImageBodyPartCache';

export class AvatarImageActionCache
{
    private _Str_586: Map<string, AvatarImageBodyPartCache>;
    private _Str_1233: IActiveActionData;
    private _Str_1188: number;
    private _disposed: boolean;

    constructor()
    {
        this._Str_586 = new Map();
    }

    public _Str_1565(k: IActiveActionData, _arg_2: number): void
    {
        if(!this._Str_1233) this._Str_1233 = k;

        const _local_3 = this._Str_1961(this._Str_1233);

        if(_local_3) _local_3._Str_1108(_arg_2);

        this._Str_1233 = k;
    }

    public dispose(): void
    {
        if(!this._disposed)
        {
            if(!this._Str_586) return;

            this._Str_2089(0, 2147483647);

            this._Str_586.clear();

            this._Str_586   = null;
            this._disposed  = true;
        }
    }

    public _Str_2089(k: number, _arg_2: number): void
    {
        if(!this._Str_586 || this._disposed) return;

        for(const [ key, cache ] of this._Str_586.entries())
        {
            if(!cache) continue;

            const _local_3 = cache._Str_1815();

            if((_arg_2 - _local_3) >= k)
            {
                cache.dispose();

                this._Str_586.delete(key);
            }
        }
    }

    public _Str_2244():IActiveActionData
    {
        return this._Str_1233;
    }

    public setDirection(k: number): void
    {
        this._Str_1188 = k;
    }

    public getDirection(): number
    {
        return this._Str_1188;
    }

    public _Str_1961(k: IActiveActionData=null): AvatarImageBodyPartCache
    {
        if(!this._Str_1233) return null;

        if(!k) k = this._Str_1233;

        if(k._Str_707) return this._Str_586.get(k._Str_707);

        return this._Str_586.get(k.id);
    }

    public _Str_1765(k: IActiveActionData, _arg_2: AvatarImageBodyPartCache): void
    {
        if(k._Str_707) this._Str_586.set(k._Str_707, _arg_2);
        else this._Str_586.set(k.id, _arg_2);
    }

    private _Str_587(k: string): void
    {
    }
}