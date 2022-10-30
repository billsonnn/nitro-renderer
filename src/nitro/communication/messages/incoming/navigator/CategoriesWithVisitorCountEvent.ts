import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CategoriesWithVisitorCountParser } from '../../parser/navigator/CategoriesWithVisitorCountParser';

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
