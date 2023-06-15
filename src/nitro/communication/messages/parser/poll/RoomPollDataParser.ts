import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomPollDataParser implements IMessageParser {
  private _question: string

  public get question(): string {
    return this._question
  }

  private _choices: string[]

  public get choices(): string[] {
    return this._choices.slice()
  }

  flush(): boolean {
    this._question = null
    this._choices = []
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._question = wrapper.readString()
    this._choices = []

    const totalChoices = wrapper.readInt()
    let total = 0

    while (total < totalChoices) {
      this._choices.push(wrapper.readString())
      total++
    }

    return true
  }
}
