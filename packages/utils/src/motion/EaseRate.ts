import { Ease } from './Ease';
import { Interval } from './Interval';

export class EaseRate extends Ease
{
    protected _rate: number;

    constructor(k: Interval, _arg_2: number)
    {
        super(k);

        this._rate = _arg_2;
    }
}
