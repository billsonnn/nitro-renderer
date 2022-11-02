import { IMessageDataWrapper } from '../../../../../../api';

export class BreedingPetInfo
{
    private _webId: number;
    private _name: string;
    private _level: number;
    private _figure: string;
    private _owner: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._webId = wrapper.readInt();
        this._name = wrapper.readString();
        this._level = wrapper.readInt();
        this._figure = wrapper.readString();
        this._owner = wrapper.readString();
    }

    public dispose(): void
    {
        this._webId = 0;
        this._name = '';
        this._level = 0;
        this._figure = '';
        this._owner = '';
    }

    public get webId(): number
    {
        return this._webId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get level(): number
    {
        return this._level;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get owner(): string
    {
        return this._owner;
    }
}
