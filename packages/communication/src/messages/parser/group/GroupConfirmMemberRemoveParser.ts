import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GroupConfirmMemberRemoveParser implements IMessageParser
{
    private _userId: number;
    private _furnitureCount: number;

    flush(): boolean
    {
        this._userId = 0;
        this._furnitureCount = 0;

        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._furnitureCount = wrapper.readInt();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get furnitureCount(): number
    {
        return this._furnitureCount;
    }
}
