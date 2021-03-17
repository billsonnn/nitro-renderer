import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarChatUpdateMessage extends ObjectStateUpdateMessage
{
    private _numberOfWords: number;

    constructor(numberOfWords: number = 0)
    {
        super();

        this._numberOfWords = numberOfWords;
    }

    public get numberOfWords(): number
    {
        return this._numberOfWords;
    }
}