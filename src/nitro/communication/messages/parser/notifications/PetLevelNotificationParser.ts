import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PetFigureDataParser } from '../inventory';

export class PetLevelNotificationParser implements IMessageParser
{
    private _petId: number;
    private _petName: string;
    private _level: number;
    private _figureData: PetFigureDataParser;

    public flush(): boolean
    {
        this._petId = -1;
        this._petName = null;
        this._level = 0;
        this._figureData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._petId = wrapper.readInt();
        this._petName = wrapper.readString();
        this._level = wrapper.readInt();
        this._figureData = new PetFigureDataParser(wrapper);

        return true;
    }

    public get petId(): number
    {
        return this._petId;
    }

    public get petName(): string
    {
        return this._petName;
    }

    public get level(): number
    {
        return this._level;
    }

    public get figureData(): PetFigureDataParser
    {
        return this._figureData;
    }
}
