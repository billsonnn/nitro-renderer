import { IDisposable, IMessageDataWrapper } from '@nitrots/api';
import { HallOfFameEntryData } from './HallOfFameEntryData';

export class CommunityGoalHallOfFameData implements IDisposable
{
    private _goalCode: string;
    private _hof: HallOfFameEntryData[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._hof = [];
        this._goalCode = wrapper.readString();

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            this._hof.push(new HallOfFameEntryData(wrapper));
        }
    }

    public dispose(): void
    {
        this._hof = null;
    }

    public get disposed(): boolean
    {
        return this._hof == null;
    }

    public get hof(): HallOfFameEntryData[]
    {
        return this._hof;
    }

    public get goalCode(): string
    {
        return this._goalCode;
    }
}
