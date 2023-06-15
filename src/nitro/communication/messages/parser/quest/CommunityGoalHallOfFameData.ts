import { IDisposable, IMessageDataWrapper } from '@/api'
import { HallOfFameEntryData } from '@/nitro'

export class CommunityGoalHallOfFameData implements IDisposable {
  constructor(wrapper: IMessageDataWrapper) {
    this._hof = []
    this._goalCode = wrapper.readString()

    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._hof.push(new HallOfFameEntryData(wrapper))
    }
  }

  private _goalCode: string

  public get goalCode(): string {
    return this._goalCode
  }

  private _hof: HallOfFameEntryData[]

  public get hof(): HallOfFameEntryData[] {
    return this._hof
  }

  public get disposed(): boolean {
    return this._hof == null
  }

  public dispose(): void {
    this._hof = null
  }
}
