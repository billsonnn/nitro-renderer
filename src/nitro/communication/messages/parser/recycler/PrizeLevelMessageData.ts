import { PrizeMessageData } from '.';
import { IMessageDataWrapper } from '../../../../../api';

export class PrizeLevelMessageData
{
    private _prizeLevelId: number;
    private _probabilityDenominator: number;
    private _prizes: PrizeMessageData[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._prizeLevelId = wrapper.readInt();
        this._probabilityDenominator = wrapper.readInt();
        this._prizes = [];

        let totalPrizes: number = wrapper.readInt();

        while(totalPrizes > 0)
        {
            this._prizes.push(new PrizeMessageData(wrapper));
            totalPrizes--;
        }
    }

    public get prizeLevelId(): number
    {
        return this._prizeLevelId;
    }

    public get probabilityDenominator(): number
    {
        return this._probabilityDenominator;
    }

    public get prizes(): PrizeMessageData[]
    {
        return this._prizes;
    }
}
