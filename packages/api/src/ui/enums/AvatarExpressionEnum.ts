export class AvatarExpressionEnum
{
    public static NONE: AvatarExpressionEnum = new AvatarExpressionEnum(0);
    public static WAVE: AvatarExpressionEnum = new AvatarExpressionEnum(1);
    public static BLOW: AvatarExpressionEnum = new AvatarExpressionEnum(2);
    public static LAUGH: AvatarExpressionEnum = new AvatarExpressionEnum(3);
    public static CRY: AvatarExpressionEnum = new AvatarExpressionEnum(4);
    public static IDLE: AvatarExpressionEnum = new AvatarExpressionEnum(5);
    public static JUMP: AvatarExpressionEnum = new AvatarExpressionEnum(6);
    public static RESPECT: AvatarExpressionEnum = new AvatarExpressionEnum(7);

    private _ordinal: number;

    constructor(k: number)
    {
        this._ordinal = k;
    }

    public get ordinal(): number
    {
        return this._ordinal;
    }

    public equals(k: AvatarExpressionEnum): boolean
    {
        return (k) && (k._ordinal == this._ordinal);
    }
}
