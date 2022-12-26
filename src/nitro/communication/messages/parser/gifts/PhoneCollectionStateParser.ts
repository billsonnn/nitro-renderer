import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class PhoneCollectionStateParser implements IMessageParser
{
    private _phoneStatusCode: number;
    private _collectionStatusCode: number;
    private _millisecondsToAllowProcessReset: number;

    public flush(): boolean
    {
        this._phoneStatusCode = -1;
        this._millisecondsToAllowProcessReset = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._phoneStatusCode = wrapper.readInt();
        this._collectionStatusCode = wrapper.readInt();
        this._millisecondsToAllowProcessReset = wrapper.readInt();

        return true;
    }

    public get phoneStatusCode(): number
    {
        return this._phoneStatusCode;
    }

    public get collectionStatusCode(): number
    {
        return this._collectionStatusCode;
    }

    public get millisecondsToAllowProcessReset(): number
    {
        return this._millisecondsToAllowProcessReset;
    }
}
