import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarGestureUpdateMessage extends ObjectStateUpdateMessage
{
    private _gesture: number;

    constructor(gesture: number = 0)
    {
        super();

        this._gesture = gesture;
    }

    public get gesture(): number
    {
        return this._gesture;
    }
}