import { IMessageDataWrapper } from '../../../../../api';

export class TalentTrackRewardPerk
{
    private _perkId: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._perkId = wrapper.readInt();
    }

    public get perkId(): number
    {
        return this._perkId;
    }
}
