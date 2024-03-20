import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { OutfitData } from './OutfitData';

export class WardrobeMessageParser implements IMessageParser
{
    private _state: number;
    private _outfits: OutfitData[];

    public flush(): boolean
    {
        this._state = 0;
        this._outfits = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._state = wrapper.readInt();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._outfits.push(new OutfitData(wrapper));

            count--;
        }

        return true;
    }

    public get state(): number
    {
        return this._state;
    }

    public get outfits(): OutfitData[]
    {
        return this._outfits;
    }
}
