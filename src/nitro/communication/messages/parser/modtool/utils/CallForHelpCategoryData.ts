import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class CallForHelpCategoryData
{
    private _name: string;
    private _topics: _Str_3509[];

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
                _Str_18308: unknown
            });
            i++;
        }

    }

    public get topics(): _Str_3509[]
    {
        return this._topics;
    }
}

interface _Str_3509 {
    name: string;
    id: number;
    _Str_18308: string;
}
