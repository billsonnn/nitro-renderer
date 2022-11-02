import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { WiredActionDefinition } from './WiredActionDefinition';

export class WiredFurniActionParser implements IMessageParser
{
    private _definition: WiredActionDefinition;

    public flush(): boolean
    {
        this._definition = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._definition = new WiredActionDefinition(wrapper);

        return true;
    }

    public get definition(): WiredActionDefinition
    {
        return this._definition;
    }
}
