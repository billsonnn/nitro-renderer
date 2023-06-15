import { IMessageDataWrapper } from '@/api'
import { ChatRecordData } from '@/nitro'

export class UserChatlogData {
  constructor(wrapper: IMessageDataWrapper) {
    this._userId = wrapper.readInt()
    this._username = wrapper.readString()
    const size = wrapper.readInt()
    for (let i = 0; i < size; i++) {
      this._roomChatlogs.push(new ChatRecordData(wrapper))
    }
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _username: string

  public get username(): string {
    return this._username
  }

  private _roomChatlogs: ChatRecordData[] = []

  public get roomChatlogs(): ChatRecordData[] {
    return this._roomChatlogs
  }
}
