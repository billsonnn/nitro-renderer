import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineObjectPlacedOnUserEvent extends RoomEngineObjectEvent
{
    private _droppedObjectId: number;
    private _droppedObjectCategory: number;

    constructor(k: string, roomId: number, objectId: number, category: number, droppedObjectId: number, droppedObjectCategory: number)
    {
        super(k, roomId, objectId, category);

        this._droppedObjectId = droppedObjectId;
        this._droppedObjectCategory = droppedObjectCategory;
    }

    public get droppedObjectId(): number
    {
        return this._droppedObjectId;
    }

    public get droppedObjectCategory(): number
    {
        return this._droppedObjectCategory;
    }
}