import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FurnitureAliasesParser implements IMessageParser
{
    private _aliases: Map<string, string>;

    public flush(): boolean
    {
        this._aliases = new Map();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalCount = wrapper.readInt();

        while(totalCount > 0)
        {
            this._aliases.set(wrapper.readString(), wrapper.readString());

            totalCount--;
        }

        return true;
    }

    public get aliases(): Map<string, string>
    {
        return this._aliases;
    }
}
