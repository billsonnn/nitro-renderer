import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarPostureUpdateMessage extends ObjectStateUpdateMessage
{
    private _postureType: string;
    private _parameter: string;

    constructor(postureType: string, parameter: string = '')
    {
        super();

        this._postureType = postureType;
        this._parameter = parameter;
    }

    public get postureType(): string
    {
        return this._postureType;
    }

    public get parameter(): string
    {
        return this._parameter;
    }
}