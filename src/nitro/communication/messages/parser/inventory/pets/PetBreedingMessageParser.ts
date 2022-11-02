import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class PetBreedingMessageParser implements IMessageParser
{
    public static STATE_CANCEL: number = 1;
    public static STATE_ACCEPT: number = 2;
    public static STATE_REQUEST: number = 3;

    private _state: number;
    private _ownPetId: number;
    private _otherPetId: number;

    public flush(): boolean
    {
        this._state = 0;
        this._ownPetId = 0;
        this._otherPetId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._state = wrapper.readInt();
        this._ownPetId = wrapper.readInt();
        this._otherPetId = wrapper.readInt();

        return true;
    }

    public get state(): number
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
