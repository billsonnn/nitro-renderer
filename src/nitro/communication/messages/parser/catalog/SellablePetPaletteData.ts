import { IMessageDataWrapper } from '../../../../../api';

export class SellablePetPaletteData
{
    private _type: number;
    private _breedId: number;
    private _paletteId: number;
    private _sellable: boolean;
    private _rare: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._type = -1;
        this._breedId = -1;
        this._paletteId = -1;
        this._sellable = false;
        this._rare = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type = wrapper.readInt();
        this._breedId = wrapper.readInt();
        this._paletteId = wrapper.readInt();
        this._sellable = wrapper.readBoolean();
        this._rare = wrapper.readBoolean();

        return true;
    }

    public get type(): number
    {
        return this._type;
    }

    public get breedId(): number
    {
        return this._breedId;
    }

    public get paletteId(): number
    {
        return this._paletteId;
    }

    public get sellable(): boolean
    {
        return this._sellable;
    }

    public get rare(): boolean
    {
        return this._rare;
    }
}
