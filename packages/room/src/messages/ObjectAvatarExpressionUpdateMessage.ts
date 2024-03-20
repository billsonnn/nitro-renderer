import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarExpressionUpdateMessage extends ObjectStateUpdateMessage
{
    private _expressionType: number;

    constructor(expressionType: number = 0)
    {
        super();

        this._expressionType = expressionType;
    }

    public get expressionType(): number
    {
        return this._expressionType;
    }
}