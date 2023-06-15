import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MiniMailNewMessageParser implements IMessageParser {
  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    return true
  }
}
