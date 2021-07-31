import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class InitCameraMessageParser implements IMessageParser
{
  private _creditPrice:number = 0;
  private _ducketPrice:number = 0;
  private _publishDucketPrice:number = 0;


  public getCreditPrice():number
  {
      return this._creditPrice;
  }

  public getDucketPrice():number
  {
      return this._ducketPrice;
  }

  public getPublishDucketPrice():number
  {
      return this._publishDucketPrice;
  }

  public flush():boolean
  {
      this._creditPrice = 0;
      this._ducketPrice = 0;
      this._publishDucketPrice = 0;
      return true;
  }

  public parse(k:IMessageDataWrapper):boolean
  {
      this._creditPrice = k.readInt();
      this._ducketPrice = k.readInt();
      if(k.bytesAvailable)
      {
          this._publishDucketPrice = k.readInt();
      }
      return true;
  }
}
