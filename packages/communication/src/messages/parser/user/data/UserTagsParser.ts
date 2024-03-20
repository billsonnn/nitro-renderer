import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UserTagsParser implements IMessageParser
{
    private _roomUnitId: number;
    private _tags: string[];

    public flush(): boolean
    {
        this._roomUnitId = -1;
        this._tags = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomUnitId = wrapper.readInt();

        let totalTags = wrapper.readInt();

        while(totalTags > 0)
        {
            this._tags.push(wrapper.readString());

            totalTags--;
        }

        return true;
    }

    public get roomUnitId(): number
    {
        return this._roomUnitId;
    }

    public get tags(): string[]
    {
        return this._tags;
    }
}
