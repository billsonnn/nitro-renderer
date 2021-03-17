export interface IRoomContentListener
{
    onRoomContentLoaded(id: number, assetName: string, sucess: boolean): void;
}