import { IRoomSession } from '../IRoomSession';
import { RoomSessionDimmerPresetsEventPresetItem } from './RoomSessionDimmerPresetsEventPresetItem';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionDimmerPresetsEvent extends RoomSessionEvent
{
    public static ROOM_DIMMER_PRESETS: string = 'RSDPE_PRESETS';

    private _selectedPresetId: number = 0;
    private _presets: RoomSessionDimmerPresetsEventPresetItem[];

    constructor(type: string, session: IRoomSession)
    {
        super(type, session);

        this._presets = [];
    }

    public get presetCount(): number
    {
        return this._presets.length;
    }

    public get selectedPresetId(): number
    {
        return this._selectedPresetId;
    }

    public set selectedPresetId(id: number)
    {
        this._selectedPresetId = id;
    }

    public storePreset(id: number, bgOnly: boolean, color: string, brightness: number): void
    {
        this._presets[(id - 1)] = new RoomSessionDimmerPresetsEventPresetItem(id, bgOnly, color, brightness);
    }

    public getPreset(id: number): RoomSessionDimmerPresetsEventPresetItem
    {
        if((id < 0) || (id >= this._presets.length)) return null;

        return this._presets[id];
    }
}
