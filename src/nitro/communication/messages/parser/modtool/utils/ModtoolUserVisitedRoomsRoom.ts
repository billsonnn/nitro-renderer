import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class ModtoolUserVisitedRoomsRoom
{
    private _roomId:number;
    private _roomName:string;
    private _Str_20266:number;
    private _Str_20472:number;

    constructor(k:IMessageDataWrapper)
    {
        this._roomId = k.readInt();
        this._roomName = k.readString();
        this._Str_20266 = k.readInt();
        this._Str_20472 = k.readInt();
    }

    public get roomId():number
    {
        return this._roomId;
    }

    public get roomName():string
    {
        return this._roomName;
    }

    public get _Str_22929():number
    {
        return this._Str_20266;
    }

    public get _Str_25550():number
    {
        return this._Str_20472;
    }
}
