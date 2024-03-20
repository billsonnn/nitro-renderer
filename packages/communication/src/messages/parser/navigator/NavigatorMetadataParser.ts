import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { NavigatorTopLevelContext } from './utils';

export class NavigatorMetadataParser implements IMessageParser
{
    private _topLevelContexts: NavigatorTopLevelContext[];

    public flush(): boolean
    {
        this._topLevelContexts = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalContexts = wrapper.readInt();

        while(totalContexts > 0)
        {
            this._topLevelContexts.push(new NavigatorTopLevelContext(wrapper));

            totalContexts--;
        }

        return true;
    }

    public get topLevelContexts(): NavigatorTopLevelContext[]
    {
        return this._topLevelContexts;
    }
}
