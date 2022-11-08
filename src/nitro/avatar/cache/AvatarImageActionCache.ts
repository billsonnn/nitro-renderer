import { GetTickerTime } from '../../../pixi-proxy';
import { AvatarImageDirectionCache } from './AvatarImageDirectionCache';

export class AvatarImageActionCache
{
    private _cache: Map<string, AvatarImageDirectionCache>;
    private _lastAccessTime: number;

    constructor()
    {
        this._cache = new Map();

        this.setLastAccessTime(GetTickerTime());
    }

    public dispose(): void
    {
        this.debugInfo('[dispose]');

        if(!this._cache) return;

        for(const direction of this._cache.values())
        {
            if(direction) direction.dispose();
        }

        this._cache.clear();
    }

    public getDirectionCache(k: number): AvatarImageDirectionCache
    {
        const existing = this._cache.get(k.toString());

        if(!existing) return null;

        return existing;
    }

    public updateDirectionCache(k: number, _arg_2: AvatarImageDirectionCache): void
    {
        this._cache.set(k.toString(), _arg_2);
    }

    public setLastAccessTime(k: number): void
    {
        this._lastAccessTime = k;
    }

    public getLastAccessTime(): number
    {
        return this._lastAccessTime;
    }

    private debugInfo(k: string): void
    {
    }
}
