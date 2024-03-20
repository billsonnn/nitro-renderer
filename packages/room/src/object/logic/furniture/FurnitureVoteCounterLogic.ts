import { RoomObjectVariable, VoteDataType } from '@nitrots/api';
import { GetTickerTime } from '@nitrots/utils';
import { ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureVoteCounterLogic extends FurnitureMultiStateLogic
{
    private static UPDATE_INTERVAL: number = 33;
    private static MAX_UPDATE_TIME: number = 1000;

    private _total: number;
    private _lastUpdate: number;
    private _interval: number;

    constructor()
    {
        super();

        this._total = 0;
        this._lastUpdate = 0;
        this._interval = 33;
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            const stuffData = (message.data as VoteDataType);

            if(!stuffData) return;

            this.updateTotal(stuffData.result);
        }
    }

    private updateTotal(k: number): void
    {
        this._total = k;

        if(!this._lastUpdate)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT, k);

            this._lastUpdate = GetTickerTime();

            return;
        }

        if(this._total !== this.currentTotal)
        {
            const difference = Math.abs((this._total - this.currentTotal));

            if((difference * FurnitureVoteCounterLogic.UPDATE_INTERVAL) > FurnitureVoteCounterLogic.MAX_UPDATE_TIME)
            {
                this._interval = (FurnitureVoteCounterLogic.MAX_UPDATE_TIME / difference);
            }
            else
            {
                this._interval = FurnitureVoteCounterLogic.UPDATE_INTERVAL;
            }

            this._lastUpdate = GetTickerTime();
        }
    }

    public update(time: number): void
    {
        super.update(time);

        if(this.object)
        {
            if((this.currentTotal !== this._total) && (time >= (this._lastUpdate + this._interval)))
            {
                const _local_2 = (time - this._lastUpdate);
                let _local_3 = (_local_2 / this._interval);
                let _local_4 = 1;

                if(this._total < this.currentTotal) _local_4 = -1;

                if(_local_3 > (_local_4 * (this._total - this.currentTotal))) _local_3 = (_local_4 * (this._total - this.currentTotal));

                this.object.model.setValue(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT, (this.currentTotal + (_local_4 * _local_3)));

                this._lastUpdate = (time - (_local_2 - (_local_3 * this._interval)));
            }
        }
    }

    private get currentTotal(): number
    {
        return this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT);
    }
}
