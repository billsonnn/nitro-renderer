export class RoomObjectUserType
{
    public static USER: string = 'user';
    public static PET: string = 'pet';
    public static BOT: string = 'bot';
    public static RENTABLE_BOT: string = 'rentable_bot';
    public static MONSTER_PLANT: string = 'monsterplant';
    public static AVATAR_TYPES: { [key: string]: number } = { 'user': 1, 'pet': 2, 'bot': 3, 'rentable_bot': 4 };

    public static getTypeNumber(type: string): number
    {
        return RoomObjectUserType.AVATAR_TYPES[type];
    }

    public static getTypeString(type: number): string
    {
        for(const key in RoomObjectUserType.AVATAR_TYPES)
        {
            if(!key) continue;

            if(RoomObjectUserType.AVATAR_TYPES[key] !== type) continue;

            return key;
        }

        return null;
    }

    public static getRealType(type: string): string
    {
        switch(type)
        {
            case RoomObjectUserType.BOT:
            case RoomObjectUserType.RENTABLE_BOT:
                return RoomObjectUserType.USER;
            default:
                return type;
        }
    }
}