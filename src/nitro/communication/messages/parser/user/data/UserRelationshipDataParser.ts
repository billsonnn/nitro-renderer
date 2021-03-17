import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { RelationshipStatusEnum } from '../../../../../enums/RelationshipStatusEnum';

export class UserRelationshipDataParser
{
    private _level: RelationshipStatusEnum;
    private _userId: number;
    private _username: string;
    private _figure: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._level     = RelationshipStatusEnum.NONE;
        this._userId    = 0;
        this._username  = null;
        this._figure    = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._level     = wrapper.readInt();
        wrapper.readInt();
        this._userId    = wrapper.readInt();
        this._username  = wrapper.readString();
        this._figure    = wrapper.readString();

        return true;
    }

    public get level(): RelationshipStatusEnum
    {
        return this._level;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }
}
