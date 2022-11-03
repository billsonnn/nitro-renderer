import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CategoriesWithVisitorCountParser } from '../../parser';

export class CategoriesWithVisitorCountEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CategoriesWithVisitorCountParser);
    }

    public getParser(): CategoriesWithVisitorCountParser
    {
        return this.parser as CategoriesWithVisitorCountParser;
    }
}
