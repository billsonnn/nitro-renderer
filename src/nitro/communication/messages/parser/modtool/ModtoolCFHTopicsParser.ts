import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { CallForHelpCategoryData } from './utils/CallForHelpCategoryData';

export class ModtoolCFHTopicsParser  implements IMessageParser
{
    private _callForHelpCategories: CallForHelpCategoryData[];
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._callForHelpCategories = [];
        const count = wrapper.readInt();
        let i = 0;
        while(i < count)
        {
            this._callForHelpCategories.push(new CallForHelpCategoryData(wrapper));
            i++;
        }

        return true;
    }

    public get callForHelpCategories(): CallForHelpCategoryData[]
    {
        return this._callForHelpCategories;
    }
}
