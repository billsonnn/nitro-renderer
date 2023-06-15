import { IMessageDataWrapper } from '@/api'

export class TalentTrackRewardPerk {
  constructor(wrapper: IMessageDataWrapper) {
    this._perkId = wrapper.readInt()
  }

  private _perkId: number

  public get perkId(): number {
    return this._perkId
  }
}
