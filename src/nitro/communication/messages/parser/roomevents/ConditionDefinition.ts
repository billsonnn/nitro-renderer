import { IMessageDataWrapper } from '../../../../../api';
import { Triggerable } from './Triggerable';

export class ConditionDefinition extends Triggerable
{
    private _type: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        super(wrapper);

        this._type = wrapper.readInt();
    }

    public get type(): number
    {
        return this._type;
    }

    public get code(): number
    {
        return this._type;
    }
}
