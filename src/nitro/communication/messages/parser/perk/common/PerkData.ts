export class PerkData
{
    private _code: string;
    private _errorMessage: string;
    private _isAllowed: boolean;

    constructor(code: string, errorMessage: string, isAllowed: boolean)
    {
        this._code = code;
        this._errorMessage = errorMessage;
        this._isAllowed = isAllowed;
    }

    public get code(): string
    {
        return this._code;
    }

    public get errorMessage(): string
    {
        return this._errorMessage;
    }

    public get isAllowed(): boolean
    {
        return this._isAllowed;
    }
}
