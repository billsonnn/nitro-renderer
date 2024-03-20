import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class PetExperienceParser implements IMessageParser
{
    private _petId: number;
    private _roomIndex: number;
    private _gainedExperience: number;

    public flush(): boolean
    {
        this._petId = -1;
        this._roomIndex = -1;
        this._gainedExperience = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._petId = wrapper.readInt();
        this._roomIndex = wrapper.readInt();
        this._gainedExperience = wrapper.readInt();

        return true;
    }

    public get petId(): number
    {
        return this._petId;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get gainedExperience(): number
    {
        return this._gainedExperience;
    }
}
