import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class OfferRewardDeliveredMessageParser implements IMessageParser
{
    private _contentType: string;
    private _classId: number;
    private _name: string;
    private _description: string;

    public flush(): boolean
    {
        this._contentType = null;
        this._classId = 0;
        this._name = null;
        this._description = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._contentType = wrapper.readString();
        this._classId = wrapper.readInt();
        this._name = wrapper.readString();
        this._description = wrapper.readString();

        return true;
    }

    public get contentType(): string
    {
        return this._contentType;
    }

    public get classId(): number
    {
        return this._classId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }
}
