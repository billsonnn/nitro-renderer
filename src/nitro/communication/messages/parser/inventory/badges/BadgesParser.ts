import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { AdvancedMap } from '../../../../../../core/utils/AdvancedMap';

export class BadgesParser implements IMessageParser
{
    private _allBadgeCodes: string[];
    private _activeBadgeCodes: string[];
    private _badgeIds: AdvancedMap<string, number>;

    public flush(): boolean
    {
        this._allBadgeCodes = [];
        this._activeBadgeCodes = [];
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

            this._activeBadgeCodes[badgeSlot] = badgeCode;

            count--;
        }

        return true;
    }

    public getBadgeId(k: string): number
    {
        return this._badgeIds.getValue(k);
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
