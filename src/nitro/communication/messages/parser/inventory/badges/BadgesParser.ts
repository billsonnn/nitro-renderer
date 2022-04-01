import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { AdvancedMap } from '../../../../../../core/utils/AdvancedMap';

export class BadgesParser implements IMessageParser
{
    private _allBadgeCodes: string[];
    private _activeBadgeCodes: AdvancedMap<string, number>;
    private _badgeIds: AdvancedMap<string, number>;

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
        this._activeBadgeCodes = new AdvancedMap();
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

            this._activeBadgeCodes.add(badgeCode, badgeSlot);

            count--;
        }

        return true;
    }

    public getBadgeId(code: string): number
    {
        return this._badgeIds.getValue(code);
    }

    public getActiveBadgeSlot(code: string): number
    {
        return this._activeBadgeCodes.getValue(code);
    }

    public getAllBadgeCodes(): string[]
    {
        return this._allBadgeCodes;
    }

    public getActiveBadgeCodes(): string[]
    {
        return this._activeBadgeCodes.getKeys();
    }
}
