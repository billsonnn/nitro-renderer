import { RoomEngineTriggerWidgetEvent } from './RoomEngineTriggerWidgetEvent';

export class RoomEngineAreaHideStateEvent extends RoomEngineTriggerWidgetEvent
{
    public static UPDATE_STATE_AREA_HIDE: string = 'REAHSE_UPDATE_STATE_AREA_HIDE';

    private _isOn: boolean;

    constructor(roomId: number, furniId: number, category: number, on: boolean)
    {
        super(RoomEngineAreaHideStateEvent.UPDATE_STATE_AREA_HIDE, roomId, furniId, category);

        this._isOn = on;
    }

    public get isOn(): boolean
    {
        return this._isOn;
    }
}
