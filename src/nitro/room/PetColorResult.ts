import { IPetColorResult } from '../../api';

export class PetColorResult implements IPetColorResult
{
    private static COLOR_TAGS: string[] = ['Null', 'Black', 'White', 'Grey', 'Red', 'Orange', 'Pink', 'Green', 'Lime', 'Blue', 'Light-Blue', 'Dark-Blue', 'Yellow', 'Brown', 'Dark-Brown', 'Beige', 'Cyan', 'Purple', 'Gold'];

    private _breed: number;
    private _tag: string;
    private _id: string;
    private _primaryColor: number;
    private _secondaryColor: number;
    private _isMaster: boolean;
    private _layerTags: string[];

    constructor(primaryColor: number, secondaryColor: number, breed: number, tag: number, id: string, isMaster: boolean, layerTags: string[])
    {
        this._layerTags = [];
        this._primaryColor = (primaryColor & 0xFFFFFF);
        this._secondaryColor = (secondaryColor & 0xFFFFFF);
        this._breed = breed;
        this._tag = (((tag > -1) && (tag < PetColorResult.COLOR_TAGS.length)) ? PetColorResult.COLOR_TAGS[tag] : '');
        this._id = id;
        this._isMaster = isMaster;
        this._layerTags = layerTags;
    }

    public get primaryColor(): number
    {
        return this._primaryColor;
    }

    public get secondaryColor(): number
    {
        return this._secondaryColor;
    }

    public get breed(): number
    {
        return this._breed;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public get id(): string
    {
        return this._id;
    }

    public get isMaster(): boolean
    {
        return this._isMaster;
    }

    public get layerTags(): string[]
    {
        return this._layerTags;
    }
}
