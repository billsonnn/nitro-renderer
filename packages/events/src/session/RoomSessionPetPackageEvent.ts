import { IRoomSession, PetFigureData } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetPackageEvent extends RoomSessionEvent
{
    public static RSOPPE_OPEN_PET_PACKAGE_REQUESTED: string = 'RSOPPE_OPEN_PET_PACKAGE_REQUESTED';
    public static RSOPPE_OPEN_PET_PACKAGE_RESULT: string = 'RSOPPE_OPEN_PET_PACKAGE_RESULT';

    private _objectId: number = -1;
    private _figureData: PetFigureData;
    private _nameValidationStatus: number = 0;
    private _nameValidationInfo: string = null;

    constructor(petPackageName: string, session: IRoomSession, objectId: number, figureData: PetFigureData, nameValidationStatus: number, nameValidationInfo: string)
    {
        super(petPackageName, session);

        this._objectId = objectId;
        this._figureData = figureData;
        this._nameValidationStatus = nameValidationStatus;
        this._nameValidationInfo = nameValidationInfo;
    }

    public get objectId(): number
    {
        return this._objectId;
    }

    public get figureData(): PetFigureData
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
