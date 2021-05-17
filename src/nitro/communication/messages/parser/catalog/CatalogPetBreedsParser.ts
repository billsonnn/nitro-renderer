import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogPetPaletteBreed } from './utils';

export class CatalogPetBreedsParser implements IMessageParser
{
    private _productCode: string;
    private _palettes: CatalogPetPaletteBreed[];

    public flush(): boolean
    {
        this._productCode   = '';
        this._palettes      = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._productCode = wrapper.readString();

        let totalPalettes = wrapper.readInt();

        while(totalPalettes > 0)
        {
            this._palettes.push(new CatalogPetPaletteBreed(wrapper));

            totalPalettes--;
        }

        return true;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get palettes(): CatalogPetPaletteBreed[]
    {
        return this._palettes;
    }
}
