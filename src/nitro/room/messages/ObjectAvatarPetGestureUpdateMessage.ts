import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarPetGestureUpdateMessage extends ObjectStateUpdateMessage
{
    private _gesture: string;

    constructor(gesture: string)
    {
        super();

        this._gesture = gesture;
    }

    public get gesture(): string
    {
        return this._gesture;
    }
}