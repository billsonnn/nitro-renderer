import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class LoadGameUrlParser implements IMessageParser
{
    private _gameTypeId: number;
    private _url: string;
    private _gameClientId: string;

    public flush(): boolean
    {
        this._gameTypeId = 0;
        this._url = null;
        this._gameClientId = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();
        this._gameClientId = wrapper.readString();
        this._url = wrapper.readString();

        return true;
    }

    public get gameTypeId(): number
    {
        return this._gameTypeId;
    }

    public get url(): string
    {
        return this._url;
    }

    public get gameClientId(): string
    {
        return this._gameClientId;
    }
}
