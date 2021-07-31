import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class CompetitionStatusMessageParser implements IMessageParser
{
  private _ok:boolean = false;
  private _errorReason:string = null;


  public isOk():boolean
  {
      return this._ok;
  }

  public getErrorReason():string
  {
      return this._errorReason;
  }

  public flush():boolean
  {
      this._ok = false;
      this._errorReason = null;
      return true;
  }

  public parse(k:IMessageDataWrapper):boolean
  {
      this._ok = k.readBoolean();
      this._errorReason = k.readString();
      return true;
  }
}
