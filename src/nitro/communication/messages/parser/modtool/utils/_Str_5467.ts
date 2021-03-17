import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class _Str_5467
{
    private _userId:number;
    private _userName:string;
    private _Str_19258:number;
    private _Str_20876:number;
    private _online:boolean;
    private _Str_21621:number;
    private _Str_20013:number;
    private _Str_20917:number;
    private _Str_20349:number;
    private _Str_21386:number;
    private _Str_20848:string;
    private _Str_21819:string;
    private _Str_20982:number;
    private _Str_19460:number;
    private _Str_22254:string;
    private _figure:string;
    private _Str_20625:string;
    private _Str_19116:string = '';
    private  _Str_20729:number = 0;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
        this._figure = wrapper.readString();
        this._Str_19258 = wrapper.readInt();
        this._Str_20876 = wrapper.readInt();
        this._online = wrapper.readBoolean();
        this._Str_21621 = wrapper.readInt();
        this._Str_20013 = wrapper.readInt();
        this._Str_20917 = wrapper.readInt();
        this._Str_20349 = wrapper.readInt();
        this._Str_21386 = wrapper.readInt();
        this._Str_20848 = wrapper.readString();
        this._Str_21819 = wrapper.readString();
        this._Str_20982 = wrapper.readInt();
        this._Str_19460 = wrapper.readInt();
        this._Str_22254 = wrapper.readString();
        this._Str_20625 = wrapper.readString();
        if(wrapper.bytesAvailable)
        {
            this._Str_19116 = wrapper.readString();
            this._Str_20729 = wrapper.readInt();
        }
    }

    public get userId():number
    {
        return this._userId;
    }

    public get userName():string
    {
        return this._userName;
    }

    public get figure():string
    {
        return this._figure;
    }

    public get _Str_24334():number
    {
        return this._Str_19258;
    }

    public get _Str_23276():number
    {
        return this._Str_20876;
    }

    public get online():boolean
    {
        return this._online;
    }

    public get _Str_24656():number
    {
        return this._Str_21621;
    }

    public get _Str_22987():number
    {
        return this._Str_20013;
    }

    public get _Str_16987():number
    {
        return this._Str_20917;
    }

    public get _Str_20373():number
    {
        return this._Str_20349;
    }

    public get _Str_24526():number
    {
        return this._Str_21386;
    }

    public get _Str_23969():string
    {
        return this._Str_20848;
    }

    public get _Str_22786():string
    {
        return this._Str_21819;
    }

    public get _Str_25657():number
    {
        return this._Str_20982;
    }

    public get _Str_22700():number
    {
        return this._Str_19460;
    }

    public get _Str_20219():string
    {
        return this._Str_22254;
    }

    public get _Str_22262():string
    {
        return this._Str_20625;
    }

    public get _Str_24447():string
    {
        return this._Str_19116;
    }

    public get _Str_19137():number
    {
        return this._Str_20729;
    }
}
