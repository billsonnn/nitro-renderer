import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CallForHelpPendingCallsMessageParser implements IMessageParser {
  private _calls: ICall[]

  public get pendingCalls(): ICall[] {
    return this._calls
  }

  public get count(): number {
    return this._calls.length
  }

  flush(): boolean {
    this._calls = []
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._calls = []

    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      const callId = wrapper.readString()
      const timestamp = wrapper.readString()
      const message = wrapper.readString()

      this._calls.push({ callId: callId, timeStamp: timestamp, message: message })
    }
    return true
  }
}

export interface ICall {
  callId: string;
  timeStamp: string;
  message: string;
}
