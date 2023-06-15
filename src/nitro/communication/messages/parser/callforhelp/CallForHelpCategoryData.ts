import { IDisposable, IMessageDataWrapper } from '@/api'
import { INamed } from '@/nitro'
import { CallForHelpTopicData } from '@/nitro'

export class CallForHelpCategoryData implements INamed, IDisposable {
  constructor(wrapper: IMessageDataWrapper) {
    this._topics = []
    this._name = wrapper.readString()

    let count = wrapper.readInt()

    while (count > 0) {
      this._topics.push(new CallForHelpTopicData(wrapper))

      count--
    }
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _topics: CallForHelpTopicData[]

  public get topics(): CallForHelpTopicData[] {
    return this._topics
  }

  private _disposed: boolean

  public get disposed(): boolean {
    return this._disposed
  }

  public dispose(): void {
    if (this._disposed) return

    this._disposed = true
    this._topics = null
  }
}
