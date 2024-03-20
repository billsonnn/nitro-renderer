import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FloorHeightMapMessageParser implements IMessageParser
{
    public static TILE_BLOCKED: number = -110;

    private _model: string;
    private _width: number;
    private _height: number;
    private _heightMap: number[][];
    private _wallHeight: number;
    private _scale: number;

    public flush(): boolean
    {
        this._model = null;
        this._width = 0;
        this._height = 0;
        this._wallHeight = -1;
        this._heightMap = [];
        this._scale = 64;
        this._model = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const scale = wrapper.readBoolean();
        const wallHeight = wrapper.readInt();
        const model = wrapper.readString();

        return this.parseExplicitly(model, wallHeight, scale);
    }

    public parseModel(modelString: string, wallHeight: number, scale: boolean = true): boolean
    {
        return this.parseExplicitly(modelString, wallHeight, scale);
    }

    private parseExplicitly(modelString: string, wallHeight: number, scale: boolean = true): boolean
    {
        this._scale = scale ? 32 : 64;
        this._wallHeight = wallHeight;
        this._model = modelString;

        const model = this._model.split('\r');
        const modelRows = model.length;

        let width = 0;
        const height = 0;

        let iterator = 0;

        while(iterator < modelRows)
        {
            const row = model[iterator];

            if(row.length > width)
            {
                width = row.length;
            }

            iterator++;
        }

        this._heightMap = [];
        iterator = 0;

        while(iterator < modelRows)
        {
            const heightMap: number[] = [];

            let subIterator = 0;

            while(subIterator < width)
            {
                heightMap.push(FloorHeightMapMessageParser.TILE_BLOCKED);

                subIterator++;
            }

            this._heightMap.push(heightMap);

            iterator++;
        }

        this._width = width;
        this._height = modelRows;

        iterator = 0;

        while(iterator < modelRows)
        {
            const heightMap = this._heightMap[iterator];
            const text = model[iterator];

            if(text.length > 0)
            {
                let subIterator = 0;

                while(subIterator < text.length)
                {
                    const char = text.charAt(subIterator);
                    let height = FloorHeightMapMessageParser.TILE_BLOCKED;

                    if((char !== 'x') && (char !== 'X')) height = parseInt(char, 36);

                    heightMap[subIterator] = height;

                    subIterator++;
                }
            }

            iterator++;
        }

        return true;
    }

    public getHeight(x: number, y: number): number
    {
        if((x < 0) || (x >= this._width) || (y < 0) || (y >= this._height)) return -110;

        const row = this._heightMap[y];

        if(row === undefined) return -110;

        const height = row[x];

        if(height === undefined) return -110;

        return height;
    }

    public get model(): string
    {
        return this._model;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get heightMap(): number[][]
    {
        return this._heightMap;
    }

    public get wallHeight(): number
    {
        return this._wallHeight;
    }

    public get scale(): number
    {
        return this._scale;
    }
}
