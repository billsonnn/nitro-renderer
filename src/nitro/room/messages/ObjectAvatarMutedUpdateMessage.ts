import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarMutedUpdateMessage extends ObjectStateUpdateMessage
{
    private _isMuted: boolean;

    constructor(isMuted: boolean = false)
    {
        super();

        this._isMuted = isMuted;
    }

    public get isMuted(): boolean
    {
        return this._isMuted;
    }
}