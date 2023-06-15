import { EaseRate } from '@/nitro'
import { Interval } from '@/nitro'

export class EaseOut extends EaseRate {
  constructor(k: Interval, _arg_2: number) {
    super(k, _arg_2)
  }

  public update(k: number): void {
    this._interval.update(Math.pow(k, (1 / this._rate)))
  }
}
