import { SortableSprite } from '../utils';

export class RoomObjectSortableSpriteCacheItem
{
    private _sprites: SortableSprite[];
    private _updateId1: number;
    private _updateId2: number;
    private _isEmpty: boolean;

    constructor()
    {
        this._sprites = [];
        this._updateId1 = -1;
        this._updateId2 = -1;
        this._isEmpty = false;
    }

    public get spriteCount(): number
    {
        return this._sprites.length;
    }

    public get isEmpty(): boolean
    {
        return this._isEmpty;
    }

    public dispose(): void
    {
        this.setSpriteCount(0);
    }

    public addSprite(sprite: SortableSprite): void
    {
        this._sprites.push(sprite);
    }

    public getSprite(k: number): SortableSprite
    {
        return this._sprites[k];
    }

    public get sprites(): SortableSprite[]
    {
        return this._sprites;
    }

    public needsUpdate(k: number, _arg_2: number): boolean
    {
        if((k === this._updateId1) && (_arg_2 === this._updateId2)) return false;

        this._updateId1 = k;
        this._updateId2 = _arg_2;

        return true;
    }

    public setSpriteCount(k: number): void
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
