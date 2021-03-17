import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarTypingUpdateMessage extends ObjectStateUpdateMessage
{
    private _isTyping: boolean;

    constructor(isTyping: boolean = false)
    {
        super();

        this._isTyping = isTyping;
    }

    public get isTyping(): boolean
    {
        return this._isTyping;
    }
}