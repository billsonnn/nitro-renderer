import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RoomHeightMapParser implements IMessageParser
{
    private _width: number;
    private _height: number;
    private _heights: number[];

    public static decodeTileHeight(height: number): number
    {
        return ((height < 0) ? -1 : ((height & 16383) / 0x0100));
    }

    public static decodeIsStackingBlocked(height: number): boolean
    {
        return !!(height & 0x4000);
    }

    public static decodeIsRoomTile(height: number): boolean
    {
        return height >= 0;
    }

    public getTileHeight(x: number, y: number): number
    {
        if((x < 0) || (x >= this._width) || (y < 0) || (y >= this._height)) return -1;

        return RoomHeightMapParser.decodeTileHeight(this._heights[((y * this._width) + x)]);
    }

    public getStackingBlocked(x: number, y: number): boolean
    {
        if((x < 0) || (x >= this._width) || (y < 0) || (y >= this._height)) return true;

        return RoomHeightMapParser.decodeIsStackingBlocked(this._heights[((y * this._width) + x)]);
    }

    public isRoomTile(x: number, y: number): boolean
    {
        if((x < 0) || (x >= this._width) || (y < 0) || (y >= this._height)) return false;

        return RoomHeightMapParser.decodeIsRoomTile(this._heights[((y * this._width) + x)]);
    }

    public flush(): boolean
    {
        this._width = 0;
        this._height = 0;
        this._heights = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._width = wrapper.readInt();
        const totalTiles = wrapper.readInt();
        this._height = totalTiles / this._width;

        let i = 0;

        while(i < totalTiles)
        {
            this._heights[i] = wrapper.readShort();

            i++;
        }

        return true;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get heights(): number[]
    {
        return this._heights;
    }
}
