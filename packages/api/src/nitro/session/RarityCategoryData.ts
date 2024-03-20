import { IMessageDataWrapper } from '@nitrots/api';

export class RarityCategoryData
{
    private _chance: number;
    private _breeds: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._chance = wrapper.readInt();
        this._breeds = [];

        let totalCount = wrapper.readInt();

        while(totalCount > 0)
        {
            this._breeds.push(wrapper.readInt());

            totalCount--;
        }
    }

    public dispose(): void
    {
        this._chance = -1;
        this._breeds = [];
    }

    public get chance(): number
    {
        return this._chance;
    }

    public get breeds(): number[]
    {
        return this._breeds;
    }
}
