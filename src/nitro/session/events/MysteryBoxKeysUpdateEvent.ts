import { NitroEvent } from '../../../core/events/NitroEvent';

export class MysteryBoxKeysUpdateEvent extends NitroEvent
{
    public static MBKE_UPDATE: string = 'mbke_update';

    private _boxColor: string;
    private _keyColor: string;

    constructor(k: string, _arg_2: string)
    {
        super(MysteryBoxKeysUpdateEvent.MBKE_UPDATE);

        this._boxColor = k;
        this._keyColor = _arg_2;
    }

    public get _Str_18286(): string
    {
        return this._boxColor;
    }

    public get _Str_17811(): string
    {
        return this._keyColor;
    }
}