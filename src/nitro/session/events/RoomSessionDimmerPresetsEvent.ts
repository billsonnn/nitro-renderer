import { IRoomSession } from '../IRoomSession';
import { RoomSessionDimmerPresetsEventPresetItem } from './RoomSessionDimmerPresetsEventPresetItem';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionDimmerPresetsEvent extends RoomSessionEvent
{
    public static ROOM_DIMMER_PRESETS: string = 'RSDPE_PRESETS';

    private _selectedPresetId: number = 0;
    private _presets: RoomSessionDimmerPresetsEventPresetItem[];

    constructor(k: string, _arg_2: IRoomSession)
    {
        super(k, _arg_2);

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

    public set selectedPresetId(k: number)
    {
        this._selectedPresetId = k;
    }

    public storePreset(k: number, _arg_2: number, _arg_3: number, _arg_4: number): void
    {
        const _local_5:RoomSessionDimmerPresetsEventPresetItem = new RoomSessionDimmerPresetsEventPresetItem(k, _arg_2, _arg_3, _arg_4);
        this._presets[(k - 1)] = _local_5;
    }

    public getPreset(k: number):RoomSessionDimmerPresetsEventPresetItem
    {
        if(((k < 0) || (k >= this._presets.length)))
        {
            return null;
        }
        return this._presets[k];
    }
}
