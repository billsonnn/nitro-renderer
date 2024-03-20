import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { NodeData } from './NodeData';

export class CatalogIndexMessageParser implements IMessageParser
{
    private _root: NodeData;
    private _newAdditionsAvailable: boolean;
    private _catalogType: string;

    public flush(): boolean
    {
        this._root = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._root = new NodeData(wrapper);
        this._newAdditionsAvailable = wrapper.readBoolean();
        this._catalogType = wrapper.readString();

        return true;
    }

    public get root(): NodeData
    {
        return this._root;
    }

    public get newAdditionsAvailable(): boolean
    {
        return this._newAdditionsAvailable;
    }

    public get catalogType(): string
    {
        return this._catalogType;
    }
}
