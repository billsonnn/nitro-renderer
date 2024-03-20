import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarEffectUpdateMessage extends ObjectStateUpdateMessage
{
    private _effect: number;
    private _delayMilliseconds: number;

    constructor(effect: number, delayMilliseconds: number = 0)
    {
        super();

        this._effect = effect;
        this._delayMilliseconds = delayMilliseconds;
    }

    public get effect(): number
    {
        return this._effect;
    }

    public get delayMilliseconds(): number
    {
        return this._delayMilliseconds;
    }
}