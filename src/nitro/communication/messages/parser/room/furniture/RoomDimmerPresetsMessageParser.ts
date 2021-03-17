import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { MoodlightFromServer } from '../../../incoming/room/furniture/moodlightFromServer';

export class RoomDimmerPresetsMessageParser implements IMessageParser
{
    private _selectedPresetId: number = 0;
    private _presets: MoodlightFromServer[];

    constructor()
    {
        this._presets = [];
    }

    public get _Str_10888(): number
    {
        return this._presets.length;
    }

    public get _Str_6226(): number
    {
        return this._selectedPresetId;
    }

    public _Str_14989(k: number): MoodlightFromServer
    {
        if((k < 0) || (k >= this._Str_10888)) return null;

        return this._presets[k];
    }

    public flush(): boolean
    {
        this._presets = [];

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        const totalPresets = k.readInt();

        this._selectedPresetId = k.readInt();

        let _local_3 = 0;

        while(_local_3 < totalPresets)
        {
            const presetId = k.readInt();
            const isBackGroundOnly = k.readInt(); // Background only? 2: 1
            const color = k.readString();
            const colorForSWF = parseInt(color.substr(1), 16);
            const intensity = k.readInt();

            const _local_9 = new MoodlightFromServer(presetId);

            _local_9.type       = isBackGroundOnly;
            _local_9.color      = colorForSWF;
            _local_9.intensity  = intensity;

            _local_9.parsed();
            _local_9.htmlColor = color;
            this._presets.push(_local_9);

            _local_3++;
        }

        return true;
    }
}
