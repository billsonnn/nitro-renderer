import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { CommunityGoalHallOfFameData } from '../../incoming/quest/CommunityGoalHallOfFameData';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class CommunityGoalHallOfFameMessageParser implements IMessageParser
{
  private _data: CommunityGoalHallOfFameData;

  public flush(): boolean
  {
      this._data = null;
      return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean
  {
      if(!wrapper) return false;

      this._data = new CommunityGoalHallOfFameData(wrapper);
      return true;
  }

  public get data(): CommunityGoalHallOfFameData
  {
      return this._data;
  }
}
