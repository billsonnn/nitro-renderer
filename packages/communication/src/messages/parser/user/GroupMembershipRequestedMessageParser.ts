import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { MemberData } from '../../incoming';

export class GroupMembershipRequestedMessageParser implements IMessageParser
{
    private _groupId: number;
    private _requester: MemberData;

    public flush(): boolean
    {
        this._groupId = -1;
        this._requester = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupId = wrapper.readInt();
        this._requester = new MemberData(wrapper);

        return true;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get requester(): MemberData
    {
        return this._requester;
    }
}
