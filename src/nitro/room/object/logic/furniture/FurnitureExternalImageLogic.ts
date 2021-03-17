import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomSpriteMouseEvent } from '../../../../../room/events/RoomSpriteMouseEvent';
import { IRoomGeometry } from '../../../../../room/utils/IRoomGeometry';
import { MouseEventType } from '../../../../ui/MouseEventType';
import { RoomWidgetEnum } from '../../../../ui/widget/enums/RoomWidgetEnum';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureExternalImageLogic extends FurnitureMultiStateLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(!asset) return;

        if(this.object && this.object.model)
        {
            let maskType = '';

            if(asset.maskType && (asset.maskType !== '') && (asset.maskType.length > 0)) maskType = asset.maskType;

            this.object.model.setValue(RoomObjectVariable.FURNITURE_USES_PLANE_MASK, 0);
            this.object.model.setValue(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE, maskType);
        }
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK:
                this.useObject();
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public get widget(): string
    {
        return RoomWidgetEnum.EXTERNAL_IMAGE;
    }
}