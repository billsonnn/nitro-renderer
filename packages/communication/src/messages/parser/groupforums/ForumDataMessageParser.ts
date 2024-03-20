import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { ExtendedForumData } from './ExtendedForumData';

export class ForumDataMessageParser implements IMessageParser
{
    private _extendedForumData: ExtendedForumData;

    public flush(): boolean
    {
        this._extendedForumData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._extendedForumData = ExtendedForumData.parse(wrapper);

        return true;
    }

    public get extendedForumData(): ExtendedForumData
    {
        return this._extendedForumData;
    }
}
