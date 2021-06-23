import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class ClubGiftData
{
    private  _offerId:number;
    private  _isVip:boolean;
    private  _isSelectable:boolean;
    private  _daysRequired:number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.parse(wrapper);
    }


    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId = wrapper.readInt();
        this._isVip = wrapper.readBoolean();
        this._daysRequired = wrapper.readInt();
        this._isSelectable = wrapper.readBoolean();
        return true;
    }

    public  get offerId():number
    {
        return this._offerId;
    }

    public  get isVip():boolean
    {
        return this._isVip;
    }

    public  get isSelectable():boolean
    {
        return this._isSelectable;
    }

    public  get daysRequired():number
    {
        return this._daysRequired;
    }
}
