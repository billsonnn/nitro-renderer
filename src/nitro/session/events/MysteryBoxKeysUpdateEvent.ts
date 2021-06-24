import { NitroEvent } from '../../../core/events/NitroEvent';

export class MysteryBoxKeysUpdateEvent extends NitroEvent
{
    public static MYSTERY_BOX_KEYS_UPDATE: string = 'mbke_update';

    private _boxColor: string;
    private _keyColor: string;

    constructor(k: string, _arg_2: string)
    {
        super(MysteryBoxKeysUpdateEvent.MYSTERY_BOX_KEYS_UPDATE);

        this._boxColor = k;
        this._keyColor = _arg_2;
    }

    public get boxColor(): string
    {
        return this._boxColor;
    }

    public get keyColor(): string
    {
        return this._keyColor;
    }
}
