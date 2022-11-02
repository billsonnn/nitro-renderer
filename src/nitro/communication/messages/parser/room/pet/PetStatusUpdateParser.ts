import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class PetStatusUpdateParser implements IMessageParser
{
    private _roomIndex: number;
    private _petId: number;
    private _canBreed: boolean;
    private _canHarvest: boolean;
    private _canRevive: boolean;
    private _hasBreedingPermission: boolean;

    public flush(): boolean
    {
        this._roomIndex = -1;
        this._petId = -1;
        this._canBreed = false;
        this._canHarvest = false;
        this._canRevive = false;
        this._hasBreedingPermission = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomIndex = wrapper.readInt();
        this._petId = wrapper.readInt();
        this._canBreed = wrapper.readBoolean();
        this._canHarvest = wrapper.readBoolean();
        this._canRevive = wrapper.readBoolean();
        this._hasBreedingPermission = wrapper.readBoolean();

        return true;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get petId(): number
    {
        return this._petId;
    }

    public get canBreed(): boolean
    {
        return this._canBreed;
    }

    public get canHarvest(): boolean
    {
        return this._canHarvest;
    }

    public get canRevive(): boolean
    {
        return this._canRevive;
    }

    public get hasBreedingPermission(): boolean
    {
        return this._hasBreedingPermission;
    }
}
