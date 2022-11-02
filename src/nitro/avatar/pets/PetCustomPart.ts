import { IPetCustomPart } from '../../../api';

export class PetCustomPart implements IPetCustomPart
{
    private _layerId: number;
    private _partId: number;
    private _paletteId: number;

    constructor(layerId: number, partId: number, paletteId: number)
    {
        this._layerId = layerId;
        this._partId = partId;
        this._paletteId = paletteId;
    }

    public get layerId(): number
    {
        return this._layerId;
    }

    public set layerId(layerId: number)
    {
        this._layerId = layerId;
    }

    public get partId(): number
    {
        return this._partId;
    }

    public set partId(partId: number)
    {
        this._partId = partId;
    }

    public get paletteId(): number
    {
        return this._paletteId;
    }

    public set paletteId(paletteId: number)
    {
        this._paletteId = paletteId;
    }
}
