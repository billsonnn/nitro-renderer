import { IAdvancedMap, IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { AdvancedMap } from '@nitrots/utils';

export class BadgesParser implements IMessageParser
{
    private _allBadgeCodes: string[];
    private _activeBadgeCodes: string[];
    private _badgeIds: IAdvancedMap<string, number>;

    public flush(): boolean
    {
        this._allBadgeCodes = [];
        this._activeBadgeCodes = null;
        this._badgeIds = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._allBadgeCodes = [];
        this._activeBadgeCodes = [];
        this._badgeIds = new AdvancedMap();

        let count = wrapper.readInt();

        while(count > 0)
        {
            const badgeId = wrapper.readInt();
            const badgeCode = wrapper.readString();

            this._badgeIds.add(badgeCode, badgeId);

            this._allBadgeCodes.push(badgeCode);

            count--;
        }

        count = wrapper.readInt();

        while(count > 0)
        {
            const badgeSlot = wrapper.readInt();
            const badgeCode = wrapper.readString();

            this._activeBadgeCodes.push(badgeCode);

            count--;
        }

        return true;
    }

    public getBadgeId(code: string): number
    {
        return this._badgeIds.getValue(code);
    }
    public getAllBadgeCodes(): string[]
    {
        return this._allBadgeCodes;
    }

    public getActiveBadgeCodes(): string[]
    {
        return this._activeBadgeCodes;
    }
}
