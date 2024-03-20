import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { SellablePetPaletteData } from './SellablePetPaletteData';

export class SellablePetPalettesParser implements IMessageParser
{
    private _productCode: string;
    private _palettes: SellablePetPaletteData[];

    public flush(): boolean
    {
        this._productCode = '';
        this._palettes = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._productCode = wrapper.readString();

        let totalPalettes = wrapper.readInt();

        while(totalPalettes > 0)
        {
            this._palettes.push(new SellablePetPaletteData(wrapper));

            totalPalettes--;
        }

        return true;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get palettes(): SellablePetPaletteData[]
    {
        return this._palettes;
    }
}
