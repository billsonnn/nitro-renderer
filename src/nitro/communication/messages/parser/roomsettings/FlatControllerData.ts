import { IMessageDataWrapper } from '../../../../../api';
import { IFlatUser } from './IFlatUser';

export class FlatControllerData implements IFlatUser
{
    private _userId: number;
    private _userName: string;
    private _selected: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get selected(): boolean
    {
        return this._selected;
    }

    public set selected(selected: boolean)
    {
        this._selected = selected;
    }
}
