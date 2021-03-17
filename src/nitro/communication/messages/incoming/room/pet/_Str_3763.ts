import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class _Str_3763
{
    private _Str_7992: number;
    private _name: string;
    private _level: number;
    private _figure: string;
    private _owner: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._Str_7992  = wrapper.readInt();
        this._name      = wrapper.readString();
        this._level     = wrapper.readInt();
        this._figure    = wrapper.readString();
        this._owner     = wrapper.readString();
    }

    public dispose():void
    {
        this._Str_7992  = 0;
        this._name      = '';
        this._level     = 0;
        this._figure    = '';
        this._owner     = '';
    }

    public get _Str_5277(): number
    {
        return this._Str_7992;
    }

    public get name(): string
    {
        return this._name;
    }

    public get level(): number
    {
        return this._level;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get owner(): string
    {
        return this._owner;
    }
}