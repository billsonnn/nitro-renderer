import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { NavigatorEventCategoryDataParser } from './NavigatorEventCategoryDataParser';

export class UserEventCatsMessageParser implements IMessageParser
{
    private _categories: NavigatorEventCategoryDataParser[];

    public flush(): boolean
    {
        this._categories = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalCategories = wrapper.readInt();

        while(totalCategories > 0)
        {
            this._categories.push(new NavigatorEventCategoryDataParser(wrapper));

            totalCategories--;
        }

        return true;
    }

    public get categories(): NavigatorEventCategoryDataParser[]
    {
        return this._categories;
    }
}
