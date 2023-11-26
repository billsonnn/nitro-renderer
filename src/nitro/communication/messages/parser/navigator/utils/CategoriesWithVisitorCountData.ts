import { IMessageDataWrapper } from '../../../../../../api';

export class CategoriesWithVisitorCountData
{
    private _categoryToCurrentUserCountMap: Map<number, number>;
    private _categoryToMaxUserCountMap: Map<number, number>;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._categoryToCurrentUserCountMap = new Map();
        this._categoryToMaxUserCountMap = new Map();

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            const _local_4 = wrapper.readInt();
            const _local_5 = wrapper.readInt();
            const _local_6 = wrapper.readInt();
            this._categoryToCurrentUserCountMap.set(_local_4, _local_5);
            this._categoryToMaxUserCountMap.set(_local_4, _local_6);
        }
    }

    public get categoryToCurrentUserCountMap(): Map<number, number>
    {
        return this._categoryToCurrentUserCountMap;
    }

    public get categoryToMaxUserCountMap(): Map<number, number>
    {
        return this._categoryToMaxUserCountMap;
    }
}
