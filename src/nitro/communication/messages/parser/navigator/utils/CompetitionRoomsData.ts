import { IMessageDataWrapper } from '../../../../../../api';

export class CompetitionRoomsData
{
    private _goalId: number;
    private _pageIndex: number;
    private _pageCount: number;

    constructor(wrapper: IMessageDataWrapper, goalId: number = 0, pageIndex: number = 0)
    {
        this._goalId = goalId;
        this._pageIndex = pageIndex;

        if(wrapper)
        {
            this._goalId = wrapper.readInt();
            this._pageIndex = wrapper.readInt();
            this._pageCount = wrapper.readInt();
        }
    }

    public get goalId(): number
    {
        return this._goalId;
    }

    public get pageIndex(): number
    {
        return this._pageIndex;
    }

    public get pageCount(): number
    {
        return this._pageCount;
    }
}
