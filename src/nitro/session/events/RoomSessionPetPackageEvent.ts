import { PetFigureData } from '../../communication/messages/parser/inventory/pets/PetFigureData';
import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetPackageEvent extends RoomSessionEvent
{
    public static RSOPPE_OPEN_PET_PACKAGE_REQUESTED: string = 'RSOPPE_OPEN_PET_PACKAGE_REQUESTED';
    public static RSOPPE_OPEN_PET_PACKAGE_RESULT: string = 'RSOPPE_OPEN_PET_PACKAGE_RESULT';

    private _objectId: number = -1;
    private _figureData:PetFigureData;
    private _nameValidationStatus: number = 0;
    private _nameValidationInfo: string = null;

    constructor(k: string, _arg_2: IRoomSession, _arg_3: number, _arg_4: PetFigureData, _arg_5: number, _arg_6: string)
    {
        super(k, _arg_2);
        this._objectId = _arg_3;
        this._figureData = _arg_4;
        this._nameValidationStatus = _arg_5;
        this._nameValidationInfo = _arg_6;
    }

    public get _Str_1577(): number
    {
        return this._objectId;
    }

    public get figureData():PetFigureData
    {
        return this._figureData;
    }

    public get nameValidationStatus(): number
    {
        return this._nameValidationStatus;
    }

    public get nameValidationInfo(): string
    {
        return this._nameValidationInfo;
    }
}