import { IFurnitureData } from '../../../api';

export class FurnitureData implements IFurnitureData
{
    private _type: string;
    private _id: number;
    private _className: string;
    private _fullName: string;
    private _category: string;
    private _hasIndexedColor: boolean;
    private _colourIndex: number;
    private _revision: number;
    private _tileSizeX: number;
    private _tileSizeY: number;
    private _tileSizeZ: number;
    private _colors: number[];
    private _localizedName: string;
    private _description: string;
    private _adUrl: string;
    private _purchaseOfferId: number;
    private _rentOfferId: number;
    private _customParams: string;
    private _specialType: number;
    private _purchaseCouldBeUsedForBuyout: boolean;
    private _rentCouldBeUsedForBuyout: boolean;
    private _availableForBuildersClub: boolean;
    private _canStandOn: boolean;
    private _canSitOn: boolean;
    private _canLayOn: boolean;
    private _excludedFromDynamic: boolean;
    private _furniLine: string;
    private _environment: string;
    private _rare: boolean;

    constructor(type: string, id: number, fullName: string, className: string, category: string, localizedName: string, description: string, revision: number, tileSizeX: number, tileSizeY: number, tileSizeZ: number, colors: number[], hadIndexedColor: boolean, colorIndex: number, adUrl: string, purchaseOfferId: number, purchaseCouldBeUsedForBuyout: boolean, rentOfferId: number, rentCouldBeUsedForBuyout: boolean, availableForBuildersClub: boolean, customParams: string, specialType: number, canStandOn: boolean, canSitOn: boolean, canLayOn: boolean, excludedfromDynamic: boolean, furniLine: string, environment: string, rare: boolean)
    {
        this._type = type;
        this._id = id;
        this._fullName = fullName;
        this._className = className;
        this._category = category;
        this._revision = revision;
        this._tileSizeX = tileSizeX;
        this._tileSizeY = tileSizeY;
        this._tileSizeZ = tileSizeZ;
        this._colors = colors;
        this._hasIndexedColor = hadIndexedColor;
        this._colourIndex = colorIndex;
        this._localizedName = localizedName;
        this._description = description;
        this._adUrl = adUrl;
        this._purchaseOfferId = purchaseOfferId;
        this._purchaseCouldBeUsedForBuyout = purchaseCouldBeUsedForBuyout;
        this._rentOfferId = rentOfferId;
        this._rentCouldBeUsedForBuyout = rentCouldBeUsedForBuyout;
        this._customParams = customParams;
        this._specialType = specialType;
        this._availableForBuildersClub = availableForBuildersClub;
        this._canStandOn = canStandOn;
        this._canSitOn = canSitOn;
        this._canLayOn = canLayOn;
        this._excludedFromDynamic = excludedfromDynamic;
        this._furniLine = furniLine;
        this._environment = environment;
        this._rare = rare;
    }

    public get type(): string
    {
        return this._type;
    }

    public get id(): number
    {
        return this._id;
    }

    public get className(): string
    {
        return this._className;
    }

    public set className(k: string)
    {
        this._className = k;
    }

    public get fullName(): string
    {
        return this._fullName;
    }

    public get category(): string
    {
        return this._category;
    }

    public get hasIndexedColor(): boolean
    {
        return this._hasIndexedColor;
    }

    public get colorIndex(): number
    {
        return this._colourIndex;
    }

    public get revision(): number
    {
        return this._revision;
    }

    public get tileSizeX(): number
    {
        return this._tileSizeX;
    }

    public get tileSizeY(): number
    {
        return this._tileSizeY;
    }

    public get tileSizeZ(): number
    {
        return this._tileSizeZ;
    }

    public get colors(): number[]
    {
        return this._colors;
    }

    public get name(): string
    {
        return this._localizedName;
    }

    public get description(): string
    {
        return this._description;
    }

    public get adUrl(): string
    {
        return this._adUrl;
    }

    public get purchaseOfferId(): number
    {
        return this._purchaseOfferId;
    }

    public get customParams(): string
    {
        return this._customParams;
    }

    public get specialType(): number
    {
        return this._specialType;
    }

    public get rentOfferId(): number
    {
        return this._rentOfferId;
    }

    public get purchaseCouldBeUsedForBuyout(): boolean
    {
        return this._purchaseCouldBeUsedForBuyout;
    }

    public get rentCouldBeUsedForBuyout(): boolean
    {
        return this._rentCouldBeUsedForBuyout;
    }

    public get availableForBuildersClub(): boolean
    {
        return this._availableForBuildersClub;
    }

    public get canStandOn(): boolean
    {
        return this._canStandOn;
    }

    public get canSitOn(): boolean
    {
        return this._canSitOn;
    }

    public get canLayOn(): boolean
    {
        return this._canLayOn;
    }

    public get isExternalImage(): boolean
    {
        return !(this._className.indexOf('external_image') === -1);
    }

    public get excludeDynamic(): boolean
    {
        return this._excludedFromDynamic;
    }

    public get furniLine(): string
    {
        return this._furniLine;
    }

    public get environment(): string
    {
        return this._environment;
    }

    public get rare(): boolean
    {
        return this._rare;
    }
}
