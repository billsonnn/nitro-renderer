import { IMessageDataWrapper, RelationshipStatusEnum } from '../../../../../../api';

export class RelationshipStatusInfo
{
    private _relationshipStatusType: number;
    private _friendCount: number;
    private _randomFriendId: number;
    private _randomFriendName: string;
    private _randomFriendFigure: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._relationshipStatusType = RelationshipStatusEnum.NONE;
        this._friendCount = 0;
        this._randomFriendId = 0;
        this._randomFriendFigure = null;
        this._randomFriendName = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._relationshipStatusType = wrapper.readInt();
        this._friendCount = wrapper.readInt();
        this._randomFriendId = wrapper.readInt();
        this._randomFriendName = wrapper.readString();
        this._randomFriendFigure = wrapper.readString();

        return true;
    }

    public get relationshipStatusType(): number
    {
        return this._relationshipStatusType;
    }

    public get friendCount(): number
    {
        return this._friendCount;
    }

    public get randomFriendId(): number
    {
        return this._randomFriendId;
    }

    public get randomFriendName(): string
    {
        return this._randomFriendName;
    }

    public get randomFriendFigure(): string
    {
        return this._randomFriendFigure;
    }
}
