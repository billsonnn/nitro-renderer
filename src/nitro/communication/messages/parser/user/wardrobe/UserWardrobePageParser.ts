import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UserWardrobePageParser implements IMessageParser
{
    private _looks: Map<number, [string, string]>;

    public flush(): boolean
    {
        this._looks = new Map();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        wrapper.readInt();

        let totalLooks = wrapper.readInt();

        while(totalLooks > 0)
        {
            const slotId = wrapper.readInt();
            const look = wrapper.readString();
            const gender = wrapper.readString();

            this._looks.set(slotId, [look, gender]);

            totalLooks--;
        }

        return true;
    }

    public get looks(): Map<number, string[]>
    {
        return this._looks;
    }
}
