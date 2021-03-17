export class RoomTradingLevelEnum
{
    public static _Str_12752: number = 0;
    public static _Str_14475: number = 1;
    public static _Str_9173: number = 2;


    public static _Str_22614(k: number): string
    {
        switch(k)
        {
            case RoomTradingLevelEnum._Str_9173:
                return '${trading.mode.free}';
            case RoomTradingLevelEnum._Str_14475:
                return '${trading.mode.controller}';
            case RoomTradingLevelEnum._Str_12752:
                return '${trading.mode.not.allowed}';
        }

        return '';
    }
}