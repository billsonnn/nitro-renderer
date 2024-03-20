import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GotMysteryBoxPrizeMessageParser implements IMessageParser
{
    private _contentType:string;
    private _classId:number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._contentType = wrapper.readString();
        this._classId = wrapper.readInt();

        return true;
    }

    public get contentType():string
    {
        return this._contentType;
    }

    public get classId():number
    {
        return this._classId;
    }

}
