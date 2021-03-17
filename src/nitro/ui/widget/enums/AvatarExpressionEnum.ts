export class AvatarExpressionEnum
{
    public static NONE: AvatarExpressionEnum = new AvatarExpressionEnum(0);
    public static _Str_6268: AvatarExpressionEnum = new AvatarExpressionEnum(1);
    public static _Str_5579: AvatarExpressionEnum = new AvatarExpressionEnum(2);
    public static _Str_7336: AvatarExpressionEnum = new AvatarExpressionEnum(3);
    public static _Str_10353: AvatarExpressionEnum = new AvatarExpressionEnum(4);
    public static _Str_6989: AvatarExpressionEnum = new AvatarExpressionEnum(5);
    public static _Str_16682: AvatarExpressionEnum = new AvatarExpressionEnum(6);
    public static _Str_6325: AvatarExpressionEnum = new AvatarExpressionEnum(7);

    private _ordinal: number;

    constructor(k: number)
    {
        this._ordinal = k;
    }

    public get _Str_6677(): number
    {
        return this._ordinal;
    }

    public _Str_1451(k: AvatarExpressionEnum): boolean
    {
        return (k) && (k._ordinal == this._ordinal);
    }
}