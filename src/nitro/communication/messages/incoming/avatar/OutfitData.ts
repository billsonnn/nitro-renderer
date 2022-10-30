import { IMessageDataWrapper } from '../../../../../api';

export class OutfitData
{
    private _slotId: number;
    private _figureString: string;
    private _gender: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._slotId = wrapper.readInt();
        this._figureString = wrapper.readString();
        this._gender = wrapper.readString();
    }

    public get slotId(): number
    {
        return this._slotId;
    }

    public get figureString(): string
    {
        return this._figureString;
    }

    public get gender(): string
    {
        return this._gender;
    }
}
