import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class BuildersClubFurniCountMessageParser implements IMessageParser
{
    private _furniCount: number;

    public flush(): boolean
    {
        this._furniCount = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._furniCount = wrapper.readInt();

        return true;
    }

    public get furniCount(): number
    {
        return this._furniCount;
    }
}
