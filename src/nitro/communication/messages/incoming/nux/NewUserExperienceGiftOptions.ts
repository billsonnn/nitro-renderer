import { IMessageDataWrapper } from '../../../../../api';
import { NewUserExperienceGift } from './NewUserExperienceGift';

export class NewUserExperienceGiftOptions
{
    private _dayIndex: number;
    private _stepIndex: number;
    private _options: NewUserExperienceGift[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._dayIndex = wrapper.readInt();
        this._stepIndex = wrapper.readInt();
        this._options = [];

        const _local_2:number = wrapper.readInt();
        let _local_3:number;

        while(_local_3 < _local_2)
        {
            this._options.push(new NewUserExperienceGift(wrapper));
            _local_3++;
        }
    }

    public get dayIndex(): number
    {
        return this._dayIndex;
    }

    public get stepIndex(): number
    {
        return this._stepIndex;
    }

    public get options(): NewUserExperienceGift[]
    {
        return this._options;
    }
}
