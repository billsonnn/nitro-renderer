export class PerkData
{
    private _code: string;
    private _isAllowed: boolean;
    private _errorMessage: string;

    constructor(code: string, isAllowed: boolean, errorMessage: string)
    {
        this._code = code;
        this._isAllowed = isAllowed;
        this._errorMessage = errorMessage;
    }

    public get code(): string
    {
        return this._code;
    }

    public get isAllowed(): boolean
    {
        return this._isAllowed;
    }

    public get errorMessage(): string
    {
        return this._errorMessage;
    }
}
