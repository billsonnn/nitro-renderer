import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { ICatalogLocalizationData } from './ICatalogLocalizationData';

export class CatalogLocalizationData implements ICatalogLocalizationData
{
    private _images: string[];
    private _texts: string[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._images    = [];
        this._texts     = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalImages = wrapper.readInt();

        while(totalImages > 0)
        {
            this._images.push(wrapper.readString());

            totalImages--;
        }

        let totalTexts = wrapper.readInt();

        while(totalTexts > 0)
        {
            this._texts.push(wrapper.readString());

            totalTexts--;
        }

        return true;
    }

    public get images(): string[]
    {
        return this._images;
    }

    public get texts(): string[]
    {
        return this._texts;
    }
}
