export class GameConfigurationData
{
    private _gameId:number;
    private _gameNameId:string;
    private _bgColor:number;
    private _textColor:number;
    private _assetUrl:string;
    private _supportUrl:string;

    constructor(gameId:number, gameNameId:string, bgColor:number, textColor:number, assetUrl:string, supportUrl:string)
    {
        this._gameId = gameId;
        this._gameNameId = gameNameId;
        this._bgColor = bgColor;
        this._textColor = textColor;
        this._assetUrl = assetUrl;
        this._supportUrl = supportUrl;
    }

    public get gameId():number
    {
        return this._gameId;
    }

    public get gameNameId():string
    {
        return this._gameNameId;
    }

    public get bgColor():number
    {
        return this._bgColor;
    }

    public get textColor():number
    {
        return this._textColor;
    }

    public get assetUrl():string
    {
        return this._assetUrl;
    }

    public get supportUrl():string
    {
        return this._supportUrl;
    }
}
