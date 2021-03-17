import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { Nitro } from '../../../../Nitro';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { VoteDataType } from '../../data/type/VoteDataType';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureVoteCounterLogic extends FurnitureMultiStateLogic
{
    private static _Str_3536: number = 33;
    private static _Str_5967: number = 1000;

    private _total: number;
    private _lastUpdate: number;
    private _interval: number;

    constructor()
    {
        super();

        this._total         = 0;
        this._lastUpdate    = 0;
        this._interval      = 33;
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            const stuffData = (message.data as VoteDataType);

            if(!stuffData) return;

            this._Str_24990(stuffData.result);
        }
    }

    private _Str_24990(k: number): void
    {
        this._total = k;

        if(!this._lastUpdate)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT, k);

            this._lastUpdate = Nitro.instance.time;

            return;
        }

        if(this._total !== this._Str_8221)
        {
            const difference = Math.abs((this._total - this._Str_8221));

            if((difference * FurnitureVoteCounterLogic._Str_3536) > FurnitureVoteCounterLogic._Str_5967)
            {
                this._interval = (FurnitureVoteCounterLogic._Str_5967 / difference);
            }
            else
            {
                this._interval = FurnitureVoteCounterLogic._Str_3536;
            }

            this._lastUpdate = Nitro.instance.time;
        }
    }

    public update(time: number): void
    {
        super.update(time);

        if(this.object)
        {
            if((this._Str_8221 !== this._total) && (time >= (this._lastUpdate + this._interval)))
            {
                const _local_2 = (time - this._lastUpdate);
                let _local_3 = (_local_2 / this._interval);
                let _local_4 = 1;

                if(this._total < this._Str_8221) _local_4 = -1;

                if(_local_3 > (_local_4 * (this._total - this._Str_8221))) _local_3 = (_local_4 * (this._total - this._Str_8221));

                this.object.model.setValue(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT, (this._Str_8221 + (_local_4 * _local_3)));

                this._lastUpdate = (time - (_local_2 - (_local_3 * this._interval)));
            }
        }
    }

    private get _Str_8221(): number
    {
        return this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT);
    }
}
