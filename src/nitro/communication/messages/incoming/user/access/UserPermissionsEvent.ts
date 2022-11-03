import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserPermissionsParser } from '../../../parser';

export class UserPermissionsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserPermissionsParser);
    }

    public getParser(): UserPermissionsParser
    {
        return this.parser as UserPermissionsParser;
    }
}
