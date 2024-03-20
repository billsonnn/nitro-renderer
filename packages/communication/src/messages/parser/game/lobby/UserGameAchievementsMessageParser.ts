import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UserGameAchievementsMessageParser implements IMessageParser
{


    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;



        return true;
    }

}
