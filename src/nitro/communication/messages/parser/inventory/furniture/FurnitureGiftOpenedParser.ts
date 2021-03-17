import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

// see _Str_8104
export class FurnitureGiftOpenedParser implements IMessageParser
{
    private _Str_2625: string;
    private _Str_2825: number;
    private _Str_2570: string;
    private _Str_3054: number;
    private _Str_3970: string;
    private _Str_3224: boolean;
    private _Str_10229: string;

    public flush(): boolean
    {
        this._Str_2625 = '';
        this._Str_2825 = 0;
        this._Str_2570 = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_2625 = wrapper.readString();
        this._Str_2825 = wrapper.readInt();
        this._Str_2570 = wrapper.readString();
        this._Str_3054 = wrapper.readInt();
        this._Str_3970 = wrapper.readString();
        this._Str_3224 = wrapper.readBoolean();
        this._Str_10229 = wrapper.readString();
        return true;
    }

    public get _Str_2887():string
    {
        return this._Str_2625;
    }

    public get classId():number
    {
        return this._Str_2825;
    }

    public get productCode():string
    {
        return this._Str_2570;
    }

    public get placedItemId():number
    {
        return this._Str_3054;
    }

    public get placedItemType():string
    {
        return this._Str_3970;
    }

    public get _Str_4057():boolean
    {
        return this._Str_3224;
    }

    public get petFigureString():string
    {
        return this._Str_10229;
    }
}
