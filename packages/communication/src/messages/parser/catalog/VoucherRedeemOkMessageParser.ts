import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class VoucherRedeemOkMessageParser implements IMessageParser
{
    private _productName: string = '';
    private _productDescription: string = '';

    public flush(): boolean
    {
        this._productDescription = '';
        this._productName = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._productDescription = wrapper.readString();
        this._productName = wrapper.readString();

        return true;
    }

    public get productName(): string
    {
        return this._productName;
    }

    public get productDescription(): string
    {
        return this._productDescription;
    }
}
