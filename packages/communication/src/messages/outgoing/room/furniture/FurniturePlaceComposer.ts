import { IMessageComposer, RoomObjectCategory } from '@nitrots/api';

export class FurniturePlaceComposer implements IMessageComposer<string[]>
{
    private _itemId: number;
    private _category: number;
    private _wallLocation: string;
    private _x: number;
    private _y: number;
    private _direction: number;

    constructor(itemId: number, category: number, wallLocation: string, x: number, y: number, direction: number)
    {
        this._itemId = itemId;
        this._category = category;
        this._wallLocation = wallLocation;
        this._x = x;
        this._y = y;
        this._direction = direction;
    }

    public getMessageArray()
    {
        switch(this._category)
        {
            case RoomObjectCategory.FLOOR:
                return [`${this._itemId} ${this._x} ${this._y} ${this._direction}`];
            case RoomObjectCategory.WALL:
                return [`${this._itemId} ${this._wallLocation} `];
            default:
                return [];
        }
    }

    public dispose(): void
    {
        return;
    }
}
