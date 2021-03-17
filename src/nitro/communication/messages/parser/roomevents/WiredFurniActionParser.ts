import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { ActionDefinition } from '../../incoming/roomevents/ActionDefinition';

export class WiredFurniActionParser implements IMessageParser
{
    private _definition: ActionDefinition;

    public flush(): boolean
    {
        this._definition = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._definition = new ActionDefinition(wrapper);

        return true;
    }

    public get definition(): ActionDefinition
    {
        return this._definition;
    }
}