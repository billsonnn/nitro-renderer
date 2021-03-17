import { RoomObjectLocationCacheItem } from './RoomObjectLocationCacheItem';
import { RoomObjectSortableSpriteCacheItem } from './RoomObjectSortableSpriteCacheItem';

export class RoomObjectCacheItem
{
    private _objectId: number;
    private _location: RoomObjectLocationCacheItem;
    private _sprites: RoomObjectSortableSpriteCacheItem;

    constructor(accurateZ: string)
    {
        this._location  = new RoomObjectLocationCacheItem(accurateZ);
        this._sprites   = new RoomObjectSortableSpriteCacheItem();
    }

    public get location(): RoomObjectLocationCacheItem
    {
        return this._location;
    }

    public get sprites(): RoomObjectSortableSpriteCacheItem
    {
        return this._sprites;
    }

    public dispose(): void
    {
        if(this._location)
        {
            this._location.dispose();

            this._location = null;
        }

        if(this._sprites)
        {
            this._sprites.dispose();

            this._sprites = null;
        }
    }

    public get _Str_1577(): number
    {
        return this._objectId;
    }

    public set _Str_1577(k:number)
    {
        this._objectId = k;
    }
}