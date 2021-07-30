import { RenderTexture } from 'pixi.js';
import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';
import { PNGEncoder } from '../../../../utils/PNGEncoder';

export class RenderRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof RenderRoomMessageComposer>>
{
  private _data: any;

  constructor(k:any, _arg_2: string, _arg_3: string, _arg_4: number, _arg_5: number)
  {
      this._data = [];
  }

  public getMessageArray()
  {
      return this._data;
  }

  public dispose(): void
  {
      this._data = [];
  }

  public assignBitmap(texture: RenderTexture):void
  {
      const bitmapEncoded = PNGEncoder.encode(texture);
      this._data = [ bitmapEncoded ];
      return;
  }
}
