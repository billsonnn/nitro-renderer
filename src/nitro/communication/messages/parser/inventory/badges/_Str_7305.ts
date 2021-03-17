import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { _Str_7446 } from './_Str_7446';

export class _Str_7305 implements IMessageParser
{
    private _data: _Str_7446[];

    public flush(): boolean
    {
        this._data = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let _local_2 = wrapper.readInt();

        while(_local_2 > 0)
        {
            const _local_4 = wrapper.readString();
            const _local_5 = wrapper.readInt();

            let _local_6 = 0;

            while(_local_6 < _local_5)
            {
                this._data.push(new _Str_7446(_local_4, wrapper));

                _local_6++;
            }

            _local_2--;
        }

        return true;
    }

    public get data(): _Str_7446[]
    {
        return this._data;
    }
}