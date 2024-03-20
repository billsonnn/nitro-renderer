import { TraxChannelItem } from './TraxChannelItem';

export class TraxChannel
{
    private _id: number;
    private _items: TraxChannelItem[];

    constructor(id: number)
    {
        this._id = id;
        this._items = [];
    }

    public addChannelItem(item: TraxChannelItem): void
    {
        this._items.push(item);
    }

    public get items(): TraxChannelItem[]
    {
        return this._items;
    }
}
