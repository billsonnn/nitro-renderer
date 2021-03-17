import { SortableSprite } from '../utils/SortableSprite';

export class RoomObjectSortableSpriteCacheItem
{
    private _sprites: SortableSprite[];
    private _updateId1: number;
    private _updateId2: number;
    private _isEmpty: boolean;

    constructor()
    {
        this._sprites   = [];
        this._updateId1 = -1;
        this._updateId2 = -1;
        this._isEmpty   = false;
    }

    public get _Str_3008(): number
    {
        return this._sprites.length;
    }

    public get isEmpty(): boolean
    {
        return this._isEmpty;
    }

    public dispose(): void
    {
        this._Str_20276(0);
    }

    public _Str_12937(sprite: SortableSprite): void
    {
        this._sprites.push(sprite);
    }

    public _Str_2505(k: number): SortableSprite
    {
        return this._sprites[k];
    }

    public get _Str_9272(): SortableSprite[]
    {
        return this._sprites;
    }

    public _Str_17574(k: number, _arg_2: number): boolean
    {
        if((k === this._updateId1) && (_arg_2 === this._updateId2)) return false;

        this._updateId1 = k;
        this._updateId2 = _arg_2;

        return true;
    }

    public _Str_20276(k: number): void
    {
        if(k < this._sprites.length)
        {
            let iterator = k;

            while(iterator < this._sprites.length)
            {
                const sprite = this._sprites[iterator];

                if(sprite) sprite.dispose();

                iterator++;
            }

            this._sprites.splice(k, (this._sprites.length - k));
        }

        this._isEmpty = (this._sprites.length) ? false : true;
    }
}