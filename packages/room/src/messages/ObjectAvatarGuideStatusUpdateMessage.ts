import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarGuideStatusUpdateMessage extends ObjectStateUpdateMessage
{
    private _guideStatus: number;

    constructor(value: number)
    {
        super();

        this._guideStatus = value;
    }

    public get guideStatus(): number
    {
        return this._guideStatus;
    }
}