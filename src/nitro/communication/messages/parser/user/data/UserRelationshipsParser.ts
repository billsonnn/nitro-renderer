import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { RelationshipStatusEnum } from '../../../../../enums/RelationshipStatusEnum';
import { UserRelationshipDataParser } from './UserRelationshipDataParser';

export class UserRelationshipsParser implements IMessageParser
{
    private _id: number;
    private _hearts: UserRelationshipDataParser[];
    private _smiles: UserRelationshipDataParser[];
    private _bobbas: UserRelationshipDataParser[];

    public flush(): boolean
    {
        this._id     = 0;
        this._hearts = [];
        this._smiles = [];
        this._bobbas = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id                = wrapper.readInt();
        let relationshipsCount  = wrapper.readInt();

        while(relationshipsCount > 0)
        {
            const relationship = new UserRelationshipDataParser(wrapper);

            if(relationship.level === RelationshipStatusEnum.HEART)
            {
                this._hearts.push(relationship);
            }
            else if(relationship.level === RelationshipStatusEnum.SMILE)
            {
                this._smiles.push(relationship);
            }
            else if(relationship.level === RelationshipStatusEnum.BOBBA)
            {
                this._bobbas.push(relationship);
            }

            relationshipsCount--;
        }

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get hearts(): UserRelationshipDataParser[]
    {
        return this._hearts;
    }

    public get smiles(): UserRelationshipDataParser[]
    {
        return this._smiles;
    }

    public get bobbas(): UserRelationshipDataParser[]
    {
        return this._bobbas;
    }
}
