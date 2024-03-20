import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FurnitureStackHeightParser implements IMessageParser
{
    private _furniId: number;
    private _height: number;

    public flush(): boolean
    {
        this._furniId = -1;
        this._height = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._furniId = wrapper.readInt();
        this._height = (wrapper.readInt() / 100);

        return true;
    }

    public get furniId(): number
    {
        return this._furniId;
    }

    public get height(): number
    {
        return this._height;
    }
}
