import { NitroEvent } from '../core';

export class MysteryBoxKeysUpdateEvent extends NitroEvent
{
    public static MYSTERY_BOX_KEYS_UPDATE: string = 'mbke_update';

    private _boxColor: string;
    private _keyColor: string;

    constructor(boxColor: string, keyColor: string)
    {
        super(MysteryBoxKeysUpdateEvent.MYSTERY_BOX_KEYS_UPDATE);

        this._boxColor = boxColor;
        this._keyColor = keyColor;
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
