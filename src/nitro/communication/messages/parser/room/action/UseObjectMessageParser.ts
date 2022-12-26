import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UseObjectMessageParser implements IMessageParser
{
    private _userId: number;
    private _itemType: number;

    public flush(): boolean
    {
        this._userId = 0;
        this._itemType = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._itemType = wrapper.readInt();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get itemType(): number
    {
        return this._itemType;
    }
}
