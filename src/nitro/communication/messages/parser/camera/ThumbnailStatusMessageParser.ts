import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class ThumbnailStatusMessageParser implements IMessageParser
{
  private _ok:boolean = true;
  private _renderLimitHit:boolean = false;


  public isOk():boolean
  {
      return this._ok;
  }

  public isRenderLimitHit():boolean
  {
      return this._renderLimitHit;
  }

  public flush():boolean
  {
      this._ok = true;
      this._renderLimitHit = false;
      return true;
  }

  public parse(k:IMessageDataWrapper):boolean
  {
      if(k.bytesAvailable)
      {
          this._ok = k.readBoolean();
          this._renderLimitHit = k.readBoolean();
      }
      return true;
  }
}
