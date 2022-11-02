import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class FavouriteChangedMessageParser implements IMessageParser
{
    private _flatId: number;
    private _added: boolean;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._flatId = wrapper.readInt();
        this._added = wrapper.readBoolean();

        return true;
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get added(): boolean
    {
        return this._added;
    }
}
