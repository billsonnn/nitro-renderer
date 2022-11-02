export interface IFurnitureStackingHeightMap
{
    dispose: () => void;
    getTileHeight(x: number, y: number): number;
    setTileHeight(x: number, y: number, height: number): void;
    setStackingBlocked(x: number, y: number, isNotStackable: boolean): void;
    setIsRoomTile(x: number, y: number, isRoomTile: boolean): void;
    validateLocation(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number, _arg_6: number, _arg_7: number, _arg_8: number, _arg_9: boolean, _arg_10?: number): boolean;
    readonly width: number;
    readonly height: number;
}
