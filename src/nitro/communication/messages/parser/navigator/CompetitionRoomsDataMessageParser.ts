import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { CompetitionRoomsData } from './utils';

export class CompetitionRoomsDataMessageParser implements IMessageParser
{
    private _data: CompetitionRoomsData;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new CompetitionRoomsData(wrapper);

        return true;
    }

    public get data(): CompetitionRoomsData
    {
        return this._data;
    }
}
