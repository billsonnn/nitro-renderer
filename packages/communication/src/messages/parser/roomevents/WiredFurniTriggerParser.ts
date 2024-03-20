import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { TriggerDefinition } from './TriggerDefinition';

export class WiredFurniTriggerParser implements IMessageParser
{
    private _definition: TriggerDefinition;

    public flush(): boolean
    {
        this._definition = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._definition = new TriggerDefinition(wrapper);

        return true;
    }

    public get definition(): TriggerDefinition
    {
        return this._definition;
    }
}
