import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class ShowEnforceRoomCategoryDialogParser implements IMessageParser
{
    private _selectionType: number;

    public flush(): boolean
    {
        this._selectionType = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._selectionType = wrapper.readInt();

        return true;
    }

    public get selectionType(): number
    {
        return this._selectionType;
    }
}
