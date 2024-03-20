import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class PetLevelUpdateMessageParser implements IMessageParser
{
    private _roomIndex: number;
    private _petId: number;
    private _level: number;

    flush(): boolean
    {
        this._roomIndex = -1;
        this._petId = -1;
        this._level = -1;

        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._roomIndex = wrapper.readInt();
        this._petId = wrapper.readInt();
        this._level = wrapper.readInt();

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

    public get level(): number
    {
        return this._level;
    }
}
