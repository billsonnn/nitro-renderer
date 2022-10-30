import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HabboGroupDeactivatedMessageParser implements IMessageParser
{
    private _groupId: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._groupId = wrapper.readInt();

        return true;
    }

    public get groupId(): number
    {
        return this._groupId;
    }
}
