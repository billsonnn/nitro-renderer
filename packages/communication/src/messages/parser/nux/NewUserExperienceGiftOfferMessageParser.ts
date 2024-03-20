import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { NewUserExperienceGiftOptions } from '../../incoming/nux';

export class NewUserExperienceGiftOfferMessageParser implements IMessageParser
{
    private _giftOptions: NewUserExperienceGiftOptions[];

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();
        this._giftOptions = [];
        let index = 0;

        while(index < count)
        {
            this._giftOptions.push(new NewUserExperienceGiftOptions(wrapper));
            index++;
        }

        return true;
    }

    public get giftOptions(): NewUserExperienceGiftOptions[]
    {
        return this._giftOptions;
    }
}
