import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { ConditionDefinition } from './ConditionDefinition';

export class WiredFurniConditionParser implements IMessageParser
{
    private _definition: ConditionDefinition;

    public flush(): boolean
    {
        this._definition = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._definition = new ConditionDefinition(wrapper);

        return true;
    }

    public get definition(): ConditionDefinition
    {
        return this._definition;
    }
}
