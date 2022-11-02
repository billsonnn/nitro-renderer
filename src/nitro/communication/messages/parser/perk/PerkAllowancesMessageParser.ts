import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PerkData } from './common';

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
            wrapper.readString(),
            wrapper.readBoolean()
        ));

        return true;
    }

    public isAllowed(perkCode: string): boolean
    {
        let allowed = false;

        for(const perk of this._perks)
        {
            if(perk.code === perkCode)
            {
                allowed = perk.isAllowed;
                break;
            }
        }

        return allowed;
    }

    public get perks(): PerkData[]
    {
        return this._perks;
    }
}
