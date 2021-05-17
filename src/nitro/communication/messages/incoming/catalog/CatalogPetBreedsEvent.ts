import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPetBreedsParser } from '../../parser';

export class CatalogPetBreedsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPetBreedsParser);
    }

    public getParser(): CatalogPetBreedsParser
    {
        return this.parser as CatalogPetBreedsParser;
    }
}
