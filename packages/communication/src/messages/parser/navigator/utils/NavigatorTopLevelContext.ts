import { IMessageDataWrapper } from '@nitrots/api';
import { NavigatorSavedSearch } from './NavigatorSavedSearch';

export class NavigatorTopLevelContext
{
    private _code: string;
    private _savedSearches: NavigatorSavedSearch[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._code = null;
        this._savedSearches = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._code = wrapper.readString();

        let totalSavedSearches = wrapper.readInt();

        while(totalSavedSearches > 0)
        {
            this._savedSearches.push(new NavigatorSavedSearch(wrapper));

            totalSavedSearches--;
        }

        return true;
    }

    public get code(): string
    {
        return this._code;
    }

    public get savedSearches(): NavigatorSavedSearch[]
    {
        return this._savedSearches;
    }
}
