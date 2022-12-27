import { IMessageDataWrapper } from '../../../../../api';
import { PopularTagData } from './PopularTagData';

export class PopularRoomTagsData
{
    private _tags: PopularTagData[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._tags = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._tags = [];

        const totalTags = wrapper.readInt();

        let total = 0;

        while(total < totalTags)
        {
            this._tags.push(new PopularTagData(wrapper));
            total++;
        }

        return true;
    }

    public get tags(): PopularTagData[]
    {
        return this._tags;
    }
}
