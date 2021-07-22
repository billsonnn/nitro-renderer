import { IRoomObjectModel } from '../../../../../room/object/IRoomObjectModel';
import { HabboWebTools } from '../../../../utils';
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

    protected handleAdClick():void
    {
        const adUrl = this.getAdClickUrl(this.object.model);

        if(adUrl.indexOf('http') === 0)
        {
            HabboWebTools.openWebPage(adUrl);

            return;
        }

        super.handleAdClick();
    }
}
