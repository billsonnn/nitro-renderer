import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class CameraPublishStatusMessageParser implements IMessageParser
{
  private _ok: boolean = false;
  private _secondsToWait: number = 0;
  private _extraDataId: string;


  public isOk(): boolean
  {
      return this._ok;
  }

  public getSecondsToWait(): number
  {
      return this._secondsToWait;
  }

  public getExtraDataId(): string
  {
      return this._extraDataId;
  }

  public flush(): boolean
  {
      this._ok = false;
      this._secondsToWait = 0;
      this._extraDataId = null;
      return true;
  }

  public parse(k: IMessageDataWrapper): boolean
  {
      this._ok = k.readBoolean();
      this._secondsToWait = k.readInt();
      if(((this._ok) && (k.bytesAvailable)))
      {
          this._extraDataId = k.readString();
      }
      return true;
  }
}
