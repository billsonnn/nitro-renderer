import { IMessageDataWrapper } from '@nitrots/api';
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

        const count:number = wrapper.readInt();
        let index = 0;

        while(index < count)
        {
            this._options.push(new NewUserExperienceGift(wrapper));
            index++;
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
