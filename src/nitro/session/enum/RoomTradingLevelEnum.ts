export class RoomTradingLevelEnum
{
    public static NO_TRADING: number = 0;
    public static ROOM_CONTROLLER_REQUIRED: number = 1;
    public static FREE_TRADING: number = 2;


    public static getLocalizationKey(k: number): string
    {
        switch(k)
        {
            case RoomTradingLevelEnum.FREE_TRADING:
                return '${trading.mode.free}';
            case RoomTradingLevelEnum.ROOM_CONTROLLER_REQUIRED:
                return '${trading.mode.controller}';
            case RoomTradingLevelEnum.NO_TRADING:
                return '${trading.mode.not.allowed}';
        }

        return '';
    }
}
