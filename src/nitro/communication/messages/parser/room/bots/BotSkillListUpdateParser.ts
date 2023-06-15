import { IMessageDataWrapper, IMessageParser } from '@/api'
import { BotSkillData } from '@/nitro'

export class BotSkillListUpdateParser implements IMessageParser {
  private _botId: number

  public get botId(): number {
    return this._botId
  }

  private _skillList: BotSkillData[]

  public get skillList(): BotSkillData[] {
    return this._skillList
  }

  public flush(): boolean {
    this._botId = -1
    this._skillList = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._botId = wrapper.readInt()

    let totalSkills = wrapper.readInt()

    while (totalSkills > 0) {
      this._skillList.push(new BotSkillData(wrapper))

      totalSkills--
    }

    return true
  }
}
