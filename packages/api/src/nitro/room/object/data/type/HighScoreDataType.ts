import { IMessageDataWrapper } from '../../../../../communication';
import { IRoomObjectModel } from '../../../../../room';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataKey } from '../ObjectDataKey';
import { HighScoreData } from './HighScoreData';

export class HighScoreDataType extends ObjectDataBase implements IObjectData
{
    public static FORMAT_KEY = ObjectDataKey.HIGHSCORE_KEY;

    private _state: string;
    private _scoreType: number;
    private _clearType: number;
    private _entries: HighScoreData[];

    constructor()
    {
        super();

        this._state = '';
        this._scoreType = -1;
        this._clearType = -1;
        this._entries = [];
    }

    public parseWrapper(wrapper: IMessageDataWrapper): void
    {
        if(!wrapper) return;

        this._state = wrapper.readString();
        this._scoreType = wrapper.readInt();
        this._clearType = wrapper.readInt();

        let totalScores = wrapper.readInt();

        while(totalScores > 0)
        {
            const data = new HighScoreData();

            data.score = wrapper.readInt();

            let totalUsers = wrapper.readInt();

            while(totalUsers > 0)
            {
                data.addUsername(wrapper.readString());

                totalUsers--;
            }

            this._entries.push(data);

            totalScores--;
        }

        super.parseWrapper(wrapper);
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void
    {
        this._scoreType = model.getValue<number>(RoomObjectVariable.FURNITURE_HIGHSCORE_SCORE_TYPE);
        this._clearType = model.getValue<number>(RoomObjectVariable.FURNITURE_HIGHSCORE_CLEAR_TYPE);
        this._entries = [];

        const totalEntries = model.getValue<number>(RoomObjectVariable.FURNITURE_HIGHSCORE_DATA_ENTRY_COUNT);

        let i = 0;

        while(i < totalEntries)
        {
            const data = new HighScoreData();

            data.score = model.getValue<number>(RoomObjectVariable.FURNITURE_HIGHSCORE_DATA_ENTRY_BASE_SCORE_ + i);
            data.users = model.getValue<string[]>(RoomObjectVariable.FURNITURE_HIGHSCORE_DATA_ENTRY_BASE_USERS_ + i);

            this._entries.push(data);

            i++;
        }

        super.initializeFromRoomObjectModel(model);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, HighScoreDataType.FORMAT_KEY);
        model.setValue(RoomObjectVariable.FURNITURE_HIGHSCORE_SCORE_TYPE, this._scoreType);
        model.setValue(RoomObjectVariable.FURNITURE_HIGHSCORE_CLEAR_TYPE, this._clearType);

        if(this._entries)
        {
            model.setValue(RoomObjectVariable.FURNITURE_HIGHSCORE_DATA_ENTRY_COUNT, this._entries.length);

            let i = 0;

            while(i < this._entries.length)
            {
                const entry = this._entries[i];

                model.setValue((RoomObjectVariable.FURNITURE_HIGHSCORE_DATA_ENTRY_BASE_SCORE_ + i), entry.score);
                model.setValue((RoomObjectVariable.FURNITURE_HIGHSCORE_DATA_ENTRY_BASE_USERS_ + i), entry.users);

                i++;
            }
        }
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public get entries(): HighScoreData[]
    {
        return this._entries;
    }

    public get clearType(): number
    {
        return this._clearType;
    }

    public get scoreType(): number
    {
        return this._scoreType;
    }
}
