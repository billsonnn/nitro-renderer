import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { LoveLockFurniFriendConfirmedParser } from '../../../parser/room/furniture/LoveLockFurniFriendConfirmedParser';

export class LoveLockFurniFriendConfirmedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoveLockFurniFriendConfirmedParser);
    }

    public getParser(): LoveLockFurniFriendConfirmedParser
    {
        return this.parser as LoveLockFurniFriendConfirmedParser;
    }
}
