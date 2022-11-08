import { IMessageDataWrapper, IPetFigureData } from '../../../../../../api';

export class PetFigureDataParser implements IPetFigureData
{
    private _typeId: number;
    private _paletteId: number;
    private _color: string;
    private _breedId: number;
    private _customPartCount: number;
    private _customParts: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._typeId = wrapper.readInt();
        this._paletteId = wrapper.readInt();
        this._color = wrapper.readString();
        this._breedId = wrapper.readInt();
        this._customParts = [];
        this._customPartCount = wrapper.readInt();

        let i = 0;

        while(i < this._customPartCount)
        {
            this._customParts.push(wrapper.readInt());
            this._customParts.push(wrapper.readInt());
            this._customParts.push(wrapper.readInt());

            i++;
        }
    }

    public get typeId(): number
    {
        return this._typeId;
    }

    public get paletteId(): number
    {
        return this._paletteId;
    }

    public get color(): string
    {
        return this._color;
    }

    public get breedId(): number
    {
        return this._breedId;
    }

    public get figuredata(): string
    {
        let figure = ((((this.typeId + ' ') + this.paletteId) + ' ') + this.color);

        figure = (figure + (' ' + this.custompartCount));

        for(const _local_2 of this.customParts) figure = (figure + (' ' + _local_2));

        return figure;
    }

    public get customParts(): number[]
    {
        return this._customParts;
    }

    public get custompartCount(): number
    {
        return this._customPartCount;
    }
}
