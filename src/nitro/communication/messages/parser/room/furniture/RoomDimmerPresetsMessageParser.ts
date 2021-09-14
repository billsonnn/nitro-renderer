import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { MoodlightFromServer } from '../../../incoming/room/furniture/moodlightFromServer';

export class RoomDimmerPresetsMessageParser implements IMessageParser
{
    private _selectedPresetId: number = 0;
    private _presets: MoodlightFromServer[];

    constructor()
    {
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

    public getPreset(k: number): MoodlightFromServer
    {
        if((k < 0) || (k >= this.presetCount)) return null;

        return this._presets[k];
    }

    public flush(): boolean
    {
        this._presets = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        const totalPresets = wrapper.readInt();

        this._selectedPresetId = wrapper.readInt();

        for(let i = 0; i < totalPresets; i++)
        {
            const presetId = wrapper.readInt();
            const bgOnly = wrapper.readInt() === 2;
            const color = wrapper.readString();
            const brightness = wrapper.readInt();

            this._presets.push(new MoodlightFromServer(presetId, bgOnly, color, brightness));
        }

        return true;
    }
}
