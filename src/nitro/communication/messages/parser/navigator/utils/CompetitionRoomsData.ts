import { IMessageDataWrapper } from '../../../../../../api';

export class CompetitionRoomsData
{
    private _goalId: number;
    private _pageIndex: number;
    private _pageCount: number;

    constructor(k: IMessageDataWrapper, _arg_2: number = 0, _arg_3: number = 0)
    {
        this._goalId = _arg_2;
        this._pageIndex = _arg_3;

        if(k)
        {
            this._goalId = k.readInt();
            this._pageIndex = k.readInt();
            this._pageCount = k.readInt();
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
