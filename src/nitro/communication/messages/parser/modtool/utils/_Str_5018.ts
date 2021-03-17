import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { _Str_5460 } from './_Str_5460';
import { _Str_2484 } from './_Str_2484';

export class _Str_5018
{
    private _Str_12818:string[];
    private _Str_14428:string[];
    private _issues:_Str_2484[];
    private _Str_21327:boolean;
    private _Str_20034:boolean;
    private _Str_21542:boolean;
    private _Str_22205:boolean;
    private _Str_22169:boolean;
    private _Str_19231:boolean;
    private _Str_19156:boolean;

    private _disposed: boolean = false;

    constructor(wrapper: IMessageDataWrapper)
    {
        const local2 = new _Str_5460();
        this._issues = [];
        this._Str_12818 = [];
        this._Str_14428= [];

        let local3 = wrapper.readInt();
        let i = 0;
        while(i < local3)
        {
            if(local2.parse(wrapper))
            {
                this._issues.push(local2._Str_22192);
            }
            i++;
        }

        local3 = wrapper.readInt();
        i = 0;
        while(i < local3)
        {
            this._Str_12818.push(wrapper.readString());
            i++;
        }

        local3 = wrapper.readInt();
        i = 0;
        while(i < local3)
        {
            wrapper.readString();
            i++;
        }

        this._Str_21327 = wrapper.readBoolean();
        this._Str_20034 = wrapper.readBoolean();
        this._Str_21542 = wrapper.readBoolean();
        this._Str_22205 = wrapper.readBoolean();
        this._Str_22169 = wrapper.readBoolean();
        this._Str_19231 = wrapper.readBoolean();
        this._Str_19156 = wrapper.readBoolean();
        local3 = wrapper.readInt();
        i = 0;
        while(i < local3)
        {
            this._Str_14428.push(wrapper.readString());
            i++;
        }


    }
    public  dispose():void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
        this._Str_12818 = null;
        this._Str_14428 = null;
        this._issues = null;
    }

    public get disposed():boolean
    {
        return this._disposed;
    }

    public get _Str_15690():string[]
    {
        return this._Str_12818;
    }

    public get _Str_18336():string[]
    {
        return this._Str_14428;
    }

    public get issues():_Str_2484[]
    {
        return this._issues;
    }

    public get _Str_24070():boolean
    {
        return this._Str_21327;
    }

    public get _Str_12765():boolean
    {
        return this._Str_20034;
    }

    public get _Str_18465():boolean
    {
        return this._Str_21542;
    }

    public get _Str_20397():boolean
    {
        return this._Str_22205;
    }

    public get _Str_21242():boolean
    {
        return this._Str_22169;
    }

    public get _Str_24851():boolean
    {
        return this._Str_19231;
    }

    public get _Str_24333():boolean
    {
        return this._Str_19156;
    }

}
