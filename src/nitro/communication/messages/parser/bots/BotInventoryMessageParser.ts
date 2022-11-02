import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { BotData } from './BotData';

export class BotInventoryMessageParser implements IMessageParser
{
    private _items: Map<number, BotData>;

    public flush(): boolean
    {
        this._items = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._items = new Map();

        let count = wrapper.readInt();

        while(count > 0)
        {
            const data = new BotData(wrapper);

            this._items.set(data.id, data);

            count--;
        }

        return true;
    }

    public get items(): Map<number, BotData>
    {
        return this._items;
    }
}
