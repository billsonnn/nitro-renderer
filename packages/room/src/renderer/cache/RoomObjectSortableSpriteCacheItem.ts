import { SortableSprite } from '../utils';

export class RoomObjectSortableSpriteCacheItem
{
    private _sprites: SortableSprite[] = [];
    private _updateId1: number = -1;
    private _updateId2: number = -1;
    private _isEmpty: boolean = false;

    public dispose(): void
    {
        this.setSpriteCount(0);
    }

    public addSprite(sprite: SortableSprite): void
    {
        this._sprites.push(sprite);
    }

    public getSprite(index: number): SortableSprite
    {
        return this._sprites[index];
    }

    public needsUpdate(id1: number, id2: number): boolean
    {
        if((id1 === this._updateId1) && (id2 === this._updateId2)) return false;

        this._updateId1 = id1;
        this._updateId2 = id2;

        return true;
    }

    public setSpriteCount(count: number): void
    {
        if(count < this._sprites.length)
        {
            let i = count;

            while(i < this._sprites.length)
            {
                this._sprites[i]?.dispose();

                i++;
            }

            this._sprites.splice(count, (this._sprites.length - count));
        }

        this._isEmpty = (this._sprites.length) ? false : true;
    }

    public get sprites(): SortableSprite[]
    {
        return this._sprites;
    }

    public get spriteCount(): number
    {
        return this._sprites.length;
    }

    public get isEmpty(): boolean
    {
        return this._isEmpty;
    }
}
