import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class PetBreedingMessageParser implements IMessageParser
{
    public static NO_SUITABLE_NESTS: number = 1;
    public static NEST_FULL: number = 2;
    public static NOT_OWNER: number = 3;

    private _state: number;
    private _ownPetId: number;
    private _otherPetId: number;

    flush(): boolean
    {
        this._state = -1;
        this._ownPetId = -1;
        this._otherPetId = -1;

        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._state = wrapper.readInt();
        this._ownPetId = wrapper.readInt();
        this._otherPetId = wrapper.readInt();

        return true;
    }

    public get petId(): number
    {
        return this._state;
    }

    public get ownPetId(): number
    {
        return this._ownPetId;
    }

    public get otherPetId(): number
    {
        return this._otherPetId;
    }
}
