import { IMessageDataWrapper } from '../../../../../api';

export class PopularTagData
{
    private _tagName: string;
    private _userCount: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._tagName = wrapper.readString();
        this._userCount = wrapper.readInt();
    }

    public get tagName(): string
    {
        return this._tagName;
    }

    public get userCount(): number
    {
        return this._userCount;
    }
}
