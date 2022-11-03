import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineUseProductEvent extends RoomEngineObjectEvent
{
    public static USE_PRODUCT_FROM_ROOM: string = 'REUPE_USE_PRODUCT_FROM_ROOM';
    public static USE_PRODUCT_FROM_INVENTORY: string = 'REUPE_USE_PRODUCT_FROM_INVENTORY';

    private _inventoryStripId: number;
    private _furnitureTypeId: number;

    constructor(type: string, roomId: number, objectId: number, category: number, inventoryStripId = -1, furnitureTypeId = -1)
    {
        super(type, roomId, objectId, category);

        this._inventoryStripId = inventoryStripId;
        this._furnitureTypeId = furnitureTypeId;
    }

    public get inventoryStripId(): number
    {
        return this._inventoryStripId;
    }

    public get furnitureTypeId(): number
    {
        return this._furnitureTypeId;
    }
}
