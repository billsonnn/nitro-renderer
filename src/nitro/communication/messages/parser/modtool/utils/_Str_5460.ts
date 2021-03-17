import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { _Str_2484 } from './_Str_2484';
import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { _Str_8176 } from './_Str_8176';

export  class _Str_5460 implements IMessageParser
{
    private _Str_13730:_Str_2484;


    public get _Str_22192():_Str_2484
    {
        return this._Str_13730;
    }

    public flush():boolean
    {
        this._Str_13730 = null;
        return true;
    }

    public parse(k:IMessageDataWrapper):boolean
    {
        const _local_2:number = k.readInt();
        const _local_3:number = k.readInt();
        const _local_4:number = k.readInt();
        const _local_5:number = k.readInt();
        const _local_6:number = k.readInt();
        const _local_7:number = k.readInt();
        const _local_8:number = k.readInt();
        const _local_9:number = k.readInt();
        const _local_10:string = k.readString();
        const _local_11:number = k.readInt();
        const _local_12:string = k.readString();
        const _local_13:number = k.readInt();
        const _local_14:string = k.readString();
        const _local_15:string = k.readString();
        const _local_16:number = k.readInt();
        const _local_17:number = k.readInt();
        const _local_18:_Str_8176[] = [];
        let _local_19 = 0;
        while(_local_19 < _local_17)
        {
            _local_18.push(new _Str_8176(k));
            _local_19++;
        }
        this._Str_13730 = new _Str_2484(_local_2, _local_3, _local_4, _local_5, _local_6, _local_7, _local_8, _local_9, _local_10, _local_11, _local_12, _local_13, _local_14, _local_15, _local_16, _local_18);
        return true;
    }
}
