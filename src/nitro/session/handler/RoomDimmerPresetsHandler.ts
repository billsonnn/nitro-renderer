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

        connection.addMessageEvent(new RoomDimmerPresetsEvent(this._Str_25786.bind(this)));
    }

    private _Str_25786(k: RoomDimmerPresetsEvent): void
    {
        if(!k) return;

        const parser = k.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const event = new RoomSessionDimmerPresetsEvent(RoomSessionDimmerPresetsEvent.RSDPE_PRESETS, session);

        event.selectedPresetId = parser._Str_6226;

        let i = 0;

        while(i < parser._Str_10888)
        {
            const preset = parser._Str_14989(i);

            if(preset)
            {
                event._Str_17287(preset.id, preset.type, preset.color, preset.intensity);
            }

            i++;
        }

        this.listener && this.listener.events.dispatchEvent(event);
    }
}
