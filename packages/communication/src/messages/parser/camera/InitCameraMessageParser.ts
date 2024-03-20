import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class InitCameraMessageParser implements IMessageParser
{
    private _creditPrice: number = 0;
    private _ducketPrice: number = 0;
    private _publishDucketPrice: number = 0;

    public flush(): boolean
    {
        this._creditPrice = 0;
        this._ducketPrice = 0;
        this._publishDucketPrice = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._creditPrice = wrapper.readInt();
        this._ducketPrice = wrapper.readInt();

        if(wrapper.bytesAvailable) this._publishDucketPrice = wrapper.readInt();

        return true;
    }

    public get creditPrice(): number
    {
        return this._creditPrice;
    }

    public get ducketPrice(): number
    {
        return this._ducketPrice;
    }

    public get publishDucketPrice(): number
    {
        return this._publishDucketPrice;
    }
}
