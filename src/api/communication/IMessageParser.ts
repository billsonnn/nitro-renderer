import { IMessageDataWrapper } from '@/api'

export interface IMessageParser {
  flush(): boolean;

  parse(wrapper: IMessageDataWrapper): boolean;
}
