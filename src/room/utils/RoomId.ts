export class RoomId
{
    private static PREVIEW_ROOM_ID_BASE: number = 0x7FFF0000;

    public static makeRoomPreviewerId(k: number): number
    {
        return (k & 0xFFFF) + RoomId.PREVIEW_ROOM_ID_BASE;
    }

    public static isRoomPreviewerId(k: number): boolean
    {
        return (k >= RoomId.PREVIEW_ROOM_ID_BASE);
    }
}