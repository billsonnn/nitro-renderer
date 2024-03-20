import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class LoadGameMessageParser implements IMessageParser
{
    private _gameTypeId:number;
    private _url:string;
    private _quality:string;
    private _scaleMode:string;
    private _frameRate:number;
    private _minMajorVersion:number;
    private _minMinorVersion:number;
    private _params:Map<string, string>;
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
        this._url = wrapper.readString();
        this._quality = wrapper.readString();
        this._scaleMode = wrapper.readString();
        this._frameRate = wrapper.readInt();
        this._minMajorVersion = wrapper.readInt();
        this._minMinorVersion = wrapper.readInt();
        this._params = new Map<string,string>();
        const count = wrapper.readInt();
        let _local_3 = 0;
        while(_local_3 < count)
        {
            this._params.set(wrapper.readString(), wrapper.readString());
            _local_3++;
        }

        return true;
    }

    public get gameTypeId():number
    {
        return this._gameTypeId;
    }

    public get url():string
    {
        return this._url;
    }

    public get quality():string
    {
        return this._quality;
    }

    public get scaleMode():string
    {
        return this._scaleMode;
    }

    public get frameRate():number
    {
        return this._frameRate;
    }

    public get minMajorVersion():number
    {
        return this._minMajorVersion;
    }

    public get minMinorVersion():number
    {
        return this._minMinorVersion;
    }

    public get params():Map<string,string>
    {
        return this._params;
    }

    public get gameClientId():string
    {
        return this._gameClientId;
    }
}
