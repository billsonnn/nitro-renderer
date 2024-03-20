import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FriendCategoryData } from './FriendCategoryData';
import { FriendParser } from './FriendParser';

export class FriendListUpdateParser implements IMessageParser
{
    private _categories: FriendCategoryData[];
    private _removedFriendIds: number[];
    private _addedFriends: FriendParser[];
    private _updatedFriends: FriendParser[];

    public flush(): boolean
    {
        this._categories = [];
        this._removedFriendIds = [];
        this._addedFriends = [];
        this._updatedFriends = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalCategories = wrapper.readInt();

        while(totalCategories > 0)
        {
            this._categories.push(new FriendCategoryData(wrapper));

            totalCategories--;
        }

        let totalUpdates = wrapper.readInt();

        while(totalUpdates > 0)
        {
            const type = wrapper.readInt();

            if(type === -1)
            {
                this._removedFriendIds.push(wrapper.readInt());
            }

            else if(type === 0)
            {
                this._updatedFriends.push(new FriendParser(wrapper));
            }

            else if(type === 1)
            {
                this._addedFriends.push(new FriendParser(wrapper));
            }

            totalUpdates--;
        }

        return true;
    }

    public get categories(): FriendCategoryData[]
    {
        return this._categories;
    }

    public get removedFriendIds(): number[]
    {
        return this._removedFriendIds;
    }

    public get addedFriends(): FriendParser[]
    {
        return this._addedFriends;
    }

    public get updatedFriends(): FriendParser[]
    {
        return this._updatedFriends;
    }
}
