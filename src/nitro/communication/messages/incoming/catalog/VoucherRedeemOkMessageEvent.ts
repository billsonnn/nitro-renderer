import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { VoucherRedeemOkMessageParser } from '@/nitro'

export class VoucherRedeemOkMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, VoucherRedeemOkMessageParser)
  }

  public getParser(): VoucherRedeemOkMessageParser {
    return this.parser as VoucherRedeemOkMessageParser
  }
}
