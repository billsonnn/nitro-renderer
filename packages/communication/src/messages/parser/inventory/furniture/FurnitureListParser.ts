import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FurnitureListItemParser } from './FurnitureListItemParser';

export class FurnitureListParser implements IMessageParser
{
    private _totalFragments: number;
    private _fragmentNumber: number;
    private _fragment: Map<number, FurnitureListItemParser>;

    public flush(): boolean
    {
        this._totalFragments = 0;
        this._fragmentNumber = 0;
        this._fragment = new Map();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._totalFragments = wrapper.readInt();
        this._fragmentNumber = wrapper.readInt();

        let totalItems = wrapper.readInt();

        while(totalItems > 0)
        {
            const item = new FurnitureListItemParser(wrapper);

            if(item) this._fragment.set(item.itemId, item);

            totalItems--;
        }

        return true;
    }

    public get totalFragments(): number
    {
        return this._totalFragments;
    }

    public get fragmentNumber(): number
    {
        return this._fragmentNumber;
    }

    public get fragment(): Map<number, FurnitureListItemParser>
    {
        return this._fragment;
    }
}
