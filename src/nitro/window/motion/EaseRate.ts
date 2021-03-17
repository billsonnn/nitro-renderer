import { Ease } from './Ease';
import { Interval } from './Interval';

export class EaseRate extends Ease
{
    protected _Str_21638: number;

    constructor(k: Interval, _arg_2: number)
    {
        super(k);

        this._Str_21638 = _arg_2;
    }
}