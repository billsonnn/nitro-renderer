import { BaseTexture, Texture } from '@pixi/core';
import { decompressFrames, parseGIF } from 'gifuct-js';
import { GetAssetManager, IAssetData, IRoomGeometry, MapDataType, MouseEventType, RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '../../../../../api';
import { RoomObjectRoomAdEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { Nitro } from '../../../../Nitro';
import { ObjectAdUpdateMessage, ObjectDataUpdateMessage } from '../../../messages';
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

        if(this._hasClickUrl)
        {
            options = (options + (((FurnitureRoomBrandingLogic.CLICKURL_KEY + '=') + ((clickUrl !== null) ? clickUrl : '')) + '\t'));
        }

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

        if(imageUrl.endsWith('.gif'))
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IS_ANIMATED, true);

            fetch(imageUrl)
                .then(resp => resp.arrayBuffer())
                .then(buff => parseGIF(buff))
                .then(gif =>
                {
                    const width = gif.lsd.width;
                    const height = gif.lsd.height;
                    const wh = width * height;
                    const frames = decompressFrames(gif, false);
                    const textures = [];
                    const durations = [];

                    let frame = new Uint8Array(wh * 4);

                    for(let ind = 0; ind < frames.length; ind++)
                    {
                        if(ind > 0) frame = frame.slice(0);

                        const pixels = frames[ind].pixels;
                        const colorTable = frames[ind].colorTable;
                        const trans = frames[ind].transparentIndex;
                        const dims = frames[ind].dims;

                        for(let j = 0; j < dims.height; j++)
                        {
                            for(let i = 0; i < dims.width; i++)
                            {
                                const pixel = pixels[j * dims.width + i];
                                const coord = (j + dims.top) * width + (i + dims.left);

                                if(trans !== pixel)
                                {
                                    const c = colorTable[pixel];

                                    frame[4 * coord] = c[0];
                                    frame[4 * coord + 1] = c[1];
                                    frame[4 * coord + 2] = c[2];
                                    frame[4 * coord + 3] = 255;
                                }
                            }
                        }

                        const baseTexture = BaseTexture.fromBuffer(frame, width, height);

                        textures.push(new Texture(baseTexture));
                        durations.push(frames[ind].delay);
                    }

                    Nitro.instance.roomEngine.roomContentLoader.createGifCollection(imageUrl, textures, durations);

                    this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
                })
                .catch(error =>
                {
                    this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADING_FAILED));
                });
        }
        else
        {
            const asset = GetAssetManager();

            if(!asset) return;

            const texture = asset.getTexture(imageUrl);

            if(!texture)
            {
                const status = await asset.downloadAsset(imageUrl);

                if(!status)
                {
                    this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADING_FAILED));
                }
                else
                {
                    this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
                }

                return;
            }

            this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
        }
    }
}
