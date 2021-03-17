import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class _Str_5178
{
    private  _Str_2507:number;
    private  _Str_6052:boolean;
    private  _Str_693:boolean;
    private  _Str_19803:number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.parse(wrapper);
    }


    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_2507 = wrapper.readInt();
        this._Str_6052 = wrapper.readBoolean();
        this._Str_19803 = wrapper.readInt();
        this._Str_693 = wrapper.readBoolean();
        return true;
    }

    public  get offerId():number
    {
        return this._Str_2507;
    }

    public  get _Str_12313():boolean
    {
        return this._Str_6052;
    }

    public get isClubOnly(): boolean
    {
        return this._Str_6052;
    }
    public  get isSelectable():boolean
    {
        return this._Str_693;
    }

    public  get _Str_21146():number
    {
        return this._Str_19803;
    }

    public get availableInDays(): number
    {
        return this._Str_19803;
    }

    public get isAvailable(): boolean
    {
        return this._Str_693;
    }


}
