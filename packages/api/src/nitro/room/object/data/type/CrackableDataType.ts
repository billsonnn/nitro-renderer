import { IMessageDataWrapper } from '../../../../../communication';
import { IRoomObjectModel } from '../../../../../room';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataKey } from '../ObjectDataKey';

export class CrackableDataType extends ObjectDataBase implements IObjectData
{
    public static FORMAT_KEY = ObjectDataKey.CRACKABLE_KEY;

    private _state: string;
    private _hits: number;
    private _target: number;

    constructor()
    {
        super();

        this._state = '';
        this._hits = 0;
        this._target = 0;
    }

    public parseWrapper(wrapper: IMessageDataWrapper): void
    {
        if(!wrapper) return;

        this._state = wrapper.readString();
        this._hits = wrapper.readInt();
        this._target = wrapper.readInt();

        super.parseWrapper(wrapper);
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void
    {
        super.initializeFromRoomObjectModel(model);

        this._state = model.getValue<string>(RoomObjectVariable.FURNITURE_CRACKABLE_STATE);
        this._hits = model.getValue<number>(RoomObjectVariable.FURNITURE_CRACKABLE_HITS);
        this._target = model.getValue<number>(RoomObjectVariable.FURNITURE_CRACKABLE_TARGET);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, CrackableDataType.FORMAT_KEY);
        model.setValue(RoomObjectVariable.FURNITURE_CRACKABLE_STATE, this._state);
        model.setValue(RoomObjectVariable.FURNITURE_CRACKABLE_HITS, this._hits);
        model.setValue(RoomObjectVariable.FURNITURE_CRACKABLE_TARGET, this._target);
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public compare(data: IObjectData): boolean
    {
        return true;
    }

    public get hits(): number
    {
        return this._hits;
    }

    public get target(): number
    {
        return this._target;
    }
}
