import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RoomOccupiedTilesMessageParser implements IMessageParser
{
    private _blockedTilesMap: boolean[][];

    public flush(): boolean
    {
        this._blockedTilesMap = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let tilesCount = wrapper.readInt();

        while(tilesCount > 0)
        {
            const x = wrapper.readInt();
            const y = wrapper.readInt();

            if(!this._blockedTilesMap[y]) this._blockedTilesMap[y] = [];

            this._blockedTilesMap[y][x] = true;

            tilesCount--;
        }

        return true;
    }

    public get blockedTilesMap(): boolean[][]
    {
        return this._blockedTilesMap;
    }
}
