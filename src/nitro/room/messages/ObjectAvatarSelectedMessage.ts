import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarSelectedMessage extends ObjectStateUpdateMessage {
  constructor(selected: boolean) {
    super()

    this._selected = selected
  }

  private _selected: boolean

  public get selected(): boolean {
    return this._selected
  }
}
