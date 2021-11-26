import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { PerkData } from './common/PerkData';

export class PerkAllowancesMessageParser implements IMessageParser
{
    private _perks: PerkData[];

    public flush(): boolean
    {
        this._perks = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._perks = [];

        const size: number = wrapper.readInt();

        for(let i = 0; i < size; i++) this._perks.push(new PerkData(
            wrapper.readString(),
            wrapper.readBoolean(),
            wrapper.readString()
        ));

        return true;
    }

    public get perks(): PerkData[]
    {
        return this._perks;
    }
}
