import { IMessageDataWrapper } from '../../../../../../core';

export class CallForHelpCategoryData
{
    private _name: string;
    private _topics: CallForHelpTopicData[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._topics = [];
        this._name = wrapper.readString();
        const count = wrapper.readInt();
        let i = 0;
        while(i < count)
        {
            const name = wrapper.readString();
            const id = wrapper.readInt();
            const unknown = wrapper.readString();
            this._topics.push({
                name,
                id,
                consequence: unknown
            });
            i++;
        }

    }

    public get topics(): CallForHelpTopicData[]
    {
        return this._topics;
    }

    public get name(): string
    {
        return this._name;
    }
}

interface CallForHelpTopicData {
    name: string;
    id: number;
    consequence: string;
}
