import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class CameraStorageUrlMessageParser implements IMessageParser
{
  private _url:string;

  public get url():string
  {
      return this._url;
  }

  public flush():boolean
  {
      this._url = '';
      return true;
  }

  public parse(k:IMessageDataWrapper):boolean
  {
      this._url = k.readString();
      return true;
  }
}
