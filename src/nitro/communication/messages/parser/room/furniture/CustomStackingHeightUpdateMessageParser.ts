import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class CustomStackingHeightUpdateMessageParser implements IMessageParser
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

        const height = wrapper.readInt();

        this._height = height / 100;

        return true;
    }

    public get height(): number
    {
        return this._height;
    }

    public get furniId(): number
    {
        return this._furniId;
    }
}
