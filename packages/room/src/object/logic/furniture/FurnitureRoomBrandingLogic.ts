import { IAssetData, IRoomGeometry, MapDataType, MouseEventType, RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { RoomObjectRoomAdEvent, RoomSpriteMouseEvent } from '@nitrots/events';
import { ObjectAdUpdateMessage, ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRoomBrandingLogic extends FurnitureLogic
{
    public static STATE: string = 'state';
    public static IMAGEURL_KEY: string = 'imageUrl';
    public static CLICKURL_KEY: string = 'clickUrl';
    public static OFFSETX_KEY: string = 'offsetX';
    public static OFFSETY_KEY: string = 'offsetY';
    public static OFFSETZ_KEY: string = 'offsetZ';

    protected _disableFurnitureSelection: boolean;
    protected _hasClickUrl: boolean;

    constructor()
    {
        super();

        this._disableFurnitureSelection = true;
        this._hasClickUrl = false;
    }

    public getEventTypes(): string[]
    {
        const types = [RoomObjectRoomAdEvent.ROOM_AD_LOAD_IMAGE];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(this._disableFurnitureSelection)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_SELECTION_DISABLED, 1);
        }
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage) this.processAdDataUpdateMessage(message);

        if(message instanceof ObjectAdUpdateMessage) this.processAdUpdate(message);
    }

    private processAdDataUpdateMessage(message: ObjectDataUpdateMessage): void
    {
        if(!message) return;

        const objectData = new MapDataType();

        objectData.initializeFromRoomObjectModel(this.object.model);

        const state = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.STATE));

        if(!isNaN(state) && (this.object.getState(0) !== state)) this.object.setState(state, 0);

        const imageUrl = objectData.getValue(FurnitureRoomBrandingLogic.IMAGEURL_KEY);
        const existingUrl = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL);

        if(!existingUrl || (existingUrl !== imageUrl))
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL, imageUrl);
            this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS, 0);

            this.downloadBackground();
        }

        const clickUrl = objectData.getValue(FurnitureRoomBrandingLogic.CLICKURL_KEY);

        if(clickUrl)
        {
            const existingUrl = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_URL);

            if(!existingUrl || existingUrl !== clickUrl)
            {
                if(this.object.model) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_URL, clickUrl);
            }
        }

        const offsetX = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETX_KEY));
        const offsetY = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETY_KEY));
        const offsetZ = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETZ_KEY));

        if(!isNaN(offsetX)) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_X, offsetX);
        if(!isNaN(offsetY)) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Y, offsetY);
        if(!isNaN(offsetZ)) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Z, offsetZ);

        let options = (((FurnitureRoomBrandingLogic.IMAGEURL_KEY + '=') + ((imageUrl !== null) ? imageUrl : '')) + '\t');

        if(this._hasClickUrl) options = (options + (((FurnitureRoomBrandingLogic.CLICKURL_KEY + '=') + ((clickUrl !== null) ? clickUrl : '')) + '\t'));

        options = (options + (((FurnitureRoomBrandingLogic.OFFSETX_KEY + '=') + offsetX) + '\t'));
        options = (options + (((FurnitureRoomBrandingLogic.OFFSETY_KEY + '=') + offsetY) + '\t'));
        options = (options + (((FurnitureRoomBrandingLogic.OFFSETZ_KEY + '=') + offsetZ) + '\t'));

        this.object.model.setValue(RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM, (RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS + options));
    }

    private processAdUpdate(message: ObjectAdUpdateMessage): void
    {
        if(!message || !this.object) return;

        switch(message.type)
        {
            case ObjectAdUpdateMessage.IMAGE_LOADED:
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS, 1);
                break;
            case ObjectAdUpdateMessage.IMAGE_LOADING_FAILED:
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS, -1);
                break;
        }
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry) return;

        if((event.type === MouseEventType.MOUSE_MOVE) || (event.type === MouseEventType.DOUBLE_CLICK)) return;

        super.mouseEvent(event, geometry);
    }

    private async downloadBackground(): Promise<void>
    {
        const model = this.object && this.object.model;

        if(!model) return;

        const imageUrl = model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL);
        const imageStatus = model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS);

        if(!imageUrl || (imageUrl === '') || (imageStatus === 1)) return;

        const asset = GetAssetManager();

        if(!asset) return;

        const texture = asset.getTexture(imageUrl);

        if(!texture)
        {
            const status = await asset.downloadAsset(imageUrl);

            if(!status)
            {
                this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADING_FAILED));

                return;
            }
        }

        this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
    }
}
