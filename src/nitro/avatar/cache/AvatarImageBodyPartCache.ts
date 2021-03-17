import { Nitro } from '../../Nitro';
import { AvatarImageDirectionCache } from './AvatarImageDirectionCache';

export class AvatarImageBodyPartCache
{
    private _Str_586: Map<string, AvatarImageDirectionCache>;
    private _Str_1509: number;

    constructor()
    {
        this._Str_586 = new Map();

        this._Str_1108(Nitro.instance.time);
    }

    public dispose(): void
    {
        this._Str_587('[dispose]');

        if(!this._Str_586) return;

        for(const direction of this._Str_586.values())
        {
            if(direction) direction.dispose();
        }

        this._Str_586.clear();
    }

    public _Str_2070(k: number): AvatarImageDirectionCache
    {
        const existing = this._Str_586.get(k.toString());

        if(!existing) return null;

        return existing;
    }

    public _Str_2168(k: number, _arg_2: AvatarImageDirectionCache): void
    {
        this._Str_586.set(k.toString(), _arg_2);
    }

    public _Str_1108(k: number): void
    {
        this._Str_1509 = k;
    }

    public _Str_1815(): number
    {
        return this._Str_1509;
    }

    private _Str_587(k: string): void
    {
    }
}
