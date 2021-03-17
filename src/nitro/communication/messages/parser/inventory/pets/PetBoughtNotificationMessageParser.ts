import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { PetData } from './PetData';

export class PetBoughtNotificationMessageParser implements IMessageParser
{
    private _gift: boolean;
    private _pet: PetData;

    public flush(): boolean
    {
        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        this._gift  = k.readBoolean();
        this._pet   = new PetData(k);

        return true;
    }

    public get gift(): boolean
    {
        return this._gift;
    }

    public get pet(): PetData
    {
        return this._pet;
    }
}
