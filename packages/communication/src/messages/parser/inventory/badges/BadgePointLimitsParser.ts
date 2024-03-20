import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { BadgeAndPointLimit } from './BadgeAndPointLimit';

export class BadgePointLimitsParser implements IMessageParser
{
    private _data: BadgeAndPointLimit[];

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
                this._data.push(new BadgeAndPointLimit(_local_4, wrapper));

                _local_6++;
            }

            _local_2--;
        }

        return true;
    }

    public get data(): BadgeAndPointLimit[]
    {
        return this._data;
    }
}
