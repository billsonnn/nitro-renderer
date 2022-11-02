import { IProductData } from '../../../api';

export class ProductData implements IProductData
{
    private _type: string;
    private _name: string;
    private _description: string;

    constructor(type: string, name: string, description: string)
    {
        this._type = type;
        this._name = name;
        this._description = description;
    }

    public get type(): string
    {
        return this._type;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }
}
