import { IDisposable, IMessageDataWrapper } from '../../../../../api';
import { INamed } from '../moderation';
import { CallForHelpTopicData } from './CallForHelpTopicData';

export class CallForHelpCategoryData implements INamed, IDisposable
{
    private _name: string;
    private _topics: CallForHelpTopicData[];
    private _disposed: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._topics = [];
        this._name = wrapper.readString();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._topics.push(new CallForHelpTopicData(wrapper));

            count--;
        }
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._disposed = true;
        this._topics = null;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get name(): string
    {
        return this._name;
    }

    public get topics(): CallForHelpTopicData[]
    {
        return this._topics;
    }
}
