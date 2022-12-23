import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
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

        const _local_2 = wrapper.readInt();
        this._giftOptions = [];
        let _local_3:number;

        while(_local_3 < _local_2)
        {
            this._giftOptions.push(new NewUserExperienceGiftOptions(wrapper));
            _local_3++;
        }

        return true;
    }

    public get giftOptions(): NewUserExperienceGiftOptions[]
    {
        return this._giftOptions;
    }
}
