import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class IsUserPartOfCompetitionMessageParser implements IMessageParser
{
    private _isPartOf: boolean;
    private _targetId: number;

    public flush(): boolean
    {
        this._isPartOf = false;
        this._targetId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._isPartOf = wrapper.readBoolean();
        this._targetId = wrapper.readInt();

        return true;
    }

    public get isPartOf(): boolean
    {
        return this._isPartOf;
    }

    public get targetId(): number
    {
        return this._targetId;
    }
}
