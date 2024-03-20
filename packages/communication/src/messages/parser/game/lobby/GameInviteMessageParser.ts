import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GameInviteMessageParser implements IMessageParser
{
    private _gameTypeId:number;
    private _inviterId:number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();
        this._inviterId = wrapper.readInt();

        return true;
    }

    public get gameTypeId():number
    {
        return this._gameTypeId;
    }

    public get inviterId():number
    {
        return this._inviterId;
    }
}
