import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class TalentTrackLevelMessageParser implements IMessageParser
{
    private _talentTrackName: string;
    private _level: number;
    private _maxLevel: number;

    public flush(): boolean
    {
        this._talentTrackName = null;
        this._level = -1;
        this._maxLevel = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._talentTrackName = wrapper.readString();
        this._level = wrapper.readInt();
        this._maxLevel = wrapper.readInt();

        return true;
    }

    public get talentTrackName(): string
    {
        return this._talentTrackName;
    }

    public get level(): number
    {
        return this._level;
    }

    public get maxLevel(): number
    {
        return this._maxLevel;
    }
}
