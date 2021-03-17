import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { Triggerable } from './Triggerable';

export class TriggerDefinition extends Triggerable
{
    private _triggerConf: number;
    private _conflictingActions: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        super(wrapper);

        this._conflictingActions    = [];
        this._triggerConf           = wrapper.readInt();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._conflictingActions.push(wrapper.readInt());

            count--;
        }
    }

    public get type(): number
    {
        return this._triggerConf;
    }

    public get code(): number
    {
        return this._triggerConf;
    }

    public get _Str_21837(): number[]
    {
        return this._conflictingActions;
    }
}