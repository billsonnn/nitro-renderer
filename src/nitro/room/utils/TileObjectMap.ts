import { IRoomObject, ITileObjectMap, NitroLogger, RoomObjectVariable } from '../../../api';

export class TileObjectMap implements ITileObjectMap
{
    private _tileObjectMap: Map<number, Map<number, IRoomObject>>;
    private _width: number;
    private _height: number;

    constructor(k: number, _arg_2: number)
    {
        this._tileObjectMap = new Map();

        let index = 0;

        while(index < _arg_2)
        {
            this._tileObjectMap.set(index, new Map());

            index++;
        }

        this._width = k;
        this._height = _arg_2;
    }

    public clear(): void
    {
        for(const k of this._tileObjectMap.values())
        {
            if(!k) continue;

            k.clear();
        }

        this._tileObjectMap.clear();
    }

    public populate(k: IRoomObject[]): void
    {
        this.clear();

        for(const _local_2 of k) this.addRoomObject(_local_2);
    }

    public dispose(): void
    {
        this._tileObjectMap = null;
        this._width = 0;
        this._height = 0;
    }

    public getObjectIntTile(k: number, _arg_2: number): IRoomObject
    {
        if((((k >= 0) && (k < this._width)) && (_arg_2 >= 0)) && (_arg_2 < this._height))
        {
            const existing = this._tileObjectMap.get(_arg_2);

            if(existing) return existing.get(k);
        }

        return null;
    }

    public setObjectInTile(k: number, _arg_2: number, _arg_3: IRoomObject): void
    {
        if(!_arg_3.isReady)
        {
            NitroLogger.log('Assigning non initialized object to tile object map!');

            return;
        }

        if((((k >= 0) && (k < this._width)) && (_arg_2 >= 0)) && (_arg_2 < this._height))
        {
            const existing = this._tileObjectMap.get(_arg_2);

            if(existing) existing.set(k, _arg_3);
        }
    }

    public addRoomObject(k: IRoomObject): void
    {
        if(!k || !k.model || !k.isReady) return;

        const location = k.getLocation();
        const direction = k.getDirection();

        if(!location || !direction) return;

        let sizeX = k.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
        let sizeY = k.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);

        if(sizeX < 1) sizeX = 1;
        if(sizeY < 1) sizeY = 1;

        const directionNumber = ((Math.trunc((direction.x + 45)) % 360) / 90);

        if((directionNumber === 1) || (directionNumber === 3)) [sizeX, sizeY] = [sizeY, sizeX];

        let y = location.y;

        while(y < (location.y + sizeY))
        {
            let x = location.x;

            while(x < (location.x + sizeX))
            {
                const roomObject = this.getObjectIntTile(x, y);

                if((!(roomObject)) || ((!(roomObject === k)) && (roomObject.getLocation().z <= location.z)))
                {
                    this.setObjectInTile(x, y, k);
                }

                x++;
            }

            y++;
        }
    }
}
