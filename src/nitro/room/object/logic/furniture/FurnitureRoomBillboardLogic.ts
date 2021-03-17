import { IRoomObjectModel } from '../../../../../room/object/IRoomObjectModel';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureRoomBrandingLogic } from './FurnitureRoomBrandingLogic';

export class FurnitureRoomBillboardLogic extends FurnitureRoomBrandingLogic
{
    constructor()
    {
        super();

        this._hasClickUrl = true;
    }

    protected getAdClickUrl(model: IRoomObjectModel): string
    {
        return model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_URL);
    }
}