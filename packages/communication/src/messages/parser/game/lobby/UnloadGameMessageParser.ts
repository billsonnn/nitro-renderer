import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UnloadGameMessageParser implements IMessageParser
{
    private _gameTypeId:number;
    private _gameClientId:string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();
        this._gameClientId = wrapper.readString();

        return true;
    }

    public get gameTypeId():number
    {
        return this._gameTypeId;
    }

    public get gameClientId():string
    {
        return this._gameClientId;
    }
}
