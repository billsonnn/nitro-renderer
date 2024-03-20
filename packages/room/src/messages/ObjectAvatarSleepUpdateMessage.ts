import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarSleepUpdateMessage extends ObjectStateUpdateMessage
{
    private _isSleeping: boolean;

    constructor(isSleeping: boolean = false)
    {
        super();

        this._isSleeping = isSleeping;
    }

    public get isSleeping(): boolean
    {
        return this._isSleeping;
    }
}