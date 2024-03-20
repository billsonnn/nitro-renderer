import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FriendParser } from './FriendParser';

export class FriendListFragmentParser implements IMessageParser
{
    private _totalFragments: number;
    private _fragmentNumber: number;
    private _fragment: FriendParser[];

    public flush(): boolean
    {
        this._totalFragments = 0;
        this._fragmentNumber = 0;
        this._fragment = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._totalFragments = wrapper.readInt();
        this._fragmentNumber = wrapper.readInt();

        let totalFriends = wrapper.readInt();

        while(totalFriends > 0)
        {
            this._fragment.push(new FriendParser(wrapper));

            totalFriends--;
        }

        return true;
    }

    public get totalFragments(): number
    {
        return this._totalFragments;
    }

    public get fragmentNumber(): number
    {
        return this._fragmentNumber;
    }

    public get fragment(): FriendParser[]
    {
        return this._fragment;
    }
}
