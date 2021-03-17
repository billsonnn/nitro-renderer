import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { PetFigureData } from '../../inventory/pets/PetFigureData';

export class PetFigureUpdateParser implements IMessageParser
{
    private _roomIndex: number;
    private _petId: number;
    private _figureData: PetFigureData;
    private _hasSaddle: boolean;
    private _isRiding: boolean;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomIndex     = wrapper.readInt();
        this._petId         = wrapper.readInt();
        this._figureData    = new PetFigureData(wrapper);
        this._hasSaddle     = wrapper.readBoolean();
        this._isRiding      = wrapper.readBoolean();

        return true;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get petId(): number
    {
        return this._petId;
    }

    public get figureData(): PetFigureData
    {
        return this._figureData;
    }

    public get hasSaddle(): boolean
    {
        return this._hasSaddle;
    }

    public get isRiding(): boolean
    {
        return this._isRiding;
    }
}