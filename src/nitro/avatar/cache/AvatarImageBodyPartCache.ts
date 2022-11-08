import { IActiveActionData } from '../../../api';
import { AvatarImageActionCache } from './AvatarImageActionCache';

export class AvatarImageBodyPartCache
{
    private _cache: Map<string, AvatarImageActionCache>;
    private _currentAction: IActiveActionData;
    private _currentDirection: number;
    private _disposed: boolean;

    constructor()
    {
        this._cache = new Map();
    }

    public setAction(k: IActiveActionData, _arg_2: number): void
    {
        if(!this._currentAction) this._currentAction = k;

        const _local_3 = this.getActionCache(this._currentAction);

        if(_local_3) _local_3.setLastAccessTime(_arg_2);

        this._currentAction = k;
    }

    public dispose(): void
    {
        if(!this._disposed)
        {
            if(!this._cache) return;

            this.disposeActions(0, 2147483647);

            this._cache.clear();

            this._cache = null;
            this._disposed = true;
        }
    }

    public disposeActions(k: number, _arg_2: number): void
    {
        if(!this._cache || this._disposed) return;

        for(const [key, cache] of this._cache.entries())
        {
            if(!cache) continue;

            const _local_3 = cache.getLastAccessTime();

            if((_arg_2 - _local_3) >= k)
            {
                cache.dispose();

                this._cache.delete(key);
            }
        }
    }

    public getAction(): IActiveActionData
    {
        return this._currentAction;
    }

    public setDirection(k: number): void
    {
        this._currentDirection = k;
    }

    public getDirection(): number
    {
        return this._currentDirection;
    }

    public getActionCache(k: IActiveActionData = null): AvatarImageActionCache
    {
        if(!this._currentAction) return null;

        if(!k) k = this._currentAction;

        if(k.overridingAction) return this._cache.get(k.overridingAction);

        return this._cache.get(k.id);
    }

    public updateActionCache(k: IActiveActionData, _arg_2: AvatarImageActionCache): void
    {
        if(k.overridingAction) this._cache.set(k.overridingAction, _arg_2);
        else this._cache.set(k.id, _arg_2);
    }

    private debugInfo(k: string): void
    {
    }
}
