import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class MarketplaceItemStatsParser implements IMessageParser
{
    private _Str_5049:number;
    private _Str_10039:number;
    private _Str_10803:number;
    private _Str_8270:number[];
    private _Str_9670:number[];
    private _Str_8961:number[];
    private _Str_10894:number;
    private _Str_10644:number;

    public get _Str_3925():number
    {
        return this._Str_5049;
    }

    public get _Str_4121():number
    {
        return this._Str_10039;
    }

    public get _Str_10461():number
    {
        return this._Str_10803;
    }

    public get _Str_9174():any[]
    {
        return this._Str_8270;
    }

    public get _Str_11365():any[]
    {
        return this._Str_9670;
    }

    public get _Str_11956():any[]
    {
        return this._Str_8961;
    }

    public get _Str_8798():number
    {
        return this._Str_10894;
    }

    public get _Str_9431():number
    {
        return this._Str_10644;
    }

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_5049 = wrapper.readInt();
        this._Str_10039 = wrapper.readInt();
        this._Str_10803 = wrapper.readInt();
        const _local_2:number = wrapper.readInt();
        this._Str_8270 = [];
        this._Str_9670 = [];
        this._Str_8961 = [];
        let _local_3 = 0;
        while(_local_3 < _local_2)
        {
            this._Str_8270.push(wrapper.readInt());
            this._Str_9670.push(wrapper.readInt());
            this._Str_8961.push(wrapper.readInt());
            _local_3++;
        }
        this._Str_10644 = wrapper.readInt();
        this._Str_10894 = wrapper.readInt();
        return true;
    }


}
