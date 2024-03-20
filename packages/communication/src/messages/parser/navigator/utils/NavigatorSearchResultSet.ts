import { IMessageDataWrapper } from '@nitrots/api';
import { NavigatorSearchResultList } from './NavigatorSearchResultList';

export class NavigatorSearchResultSet
{
    private _code: string;
    private _data: string;
    private _results: NavigatorSearchResultList[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._code = null;
        this._data = null;
        this._results = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._code = wrapper.readString();
        this._data = wrapper.readString();

        let totalResults = wrapper.readInt();

        while(totalResults > 0)
        {
            this._results.push(new NavigatorSearchResultList(wrapper));

            totalResults--;
        }

        return true;
    }

    public get code(): string
    {
        return this._code;
    }

    public get data(): string
    {
        return this._data;
    }

    public get results(): NavigatorSearchResultList[]
    {
        return this._results;
    }
}
