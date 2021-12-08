import { IConnection } from '../../../core/communication/connections/IConnection';
import { RoomDimmerPresetsEvent } from '../../communication/messages/incoming/room/furniture/RoomDimmerPresetsMessageEvent';
import { RoomSessionDimmerPresetsEvent } from '../events/RoomSessionDimmerPresetsEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class RoomDimmerPresetsHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomDimmerPresetsEvent(this.onRoomDimmerPresets.bind(this)));
    }

    private onRoomDimmerPresets(event: RoomDimmerPresetsEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const presetEvent = new RoomSessionDimmerPresetsEvent(RoomSessionDimmerPresetsEvent.ROOM_DIMMER_PRESETS, session);

        presetEvent.selectedPresetId = parser.selectedPresetId;

        let i = 0;

        while(i < parser.presetCount)
        {
            const preset = parser.getPreset(i);

            if(preset) presetEvent.storePreset(preset.id, preset.type, preset.color, preset.brightness);

            i++;
        }

        this.listener && this.listener.events.dispatchEvent(presetEvent);
    }
}
