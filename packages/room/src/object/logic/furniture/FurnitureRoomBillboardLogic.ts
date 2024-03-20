import { IRoomObjectModel, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectRoomAdEvent } from '@nitrots/events';
import { HabboWebTools } from '@nitrots/utils';
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

    protected handleAdClick(objectId: number, objectType: string, clickUrl: string): void
    {
        if(clickUrl.indexOf('http') === 0)
        {
            HabboWebTools.openWebPage(clickUrl);

            return;
        }

        if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK, this.object, '', clickUrl));
    }
}
