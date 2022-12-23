import { IMessageComposer } from '../../../../../api';
import { NewUserExperienceGetGiftsSelection } from './NewUserExperienceGetGiftsSelection';

export class NewUserExperienceGetGiftsComposer implements IMessageComposer<ConstructorParameters<typeof NewUserExperienceGetGiftsComposer>>
{
    private _data: any;

    constructor(...data: NewUserExperienceGetGiftsSelection[])
    {
        this._data = [data.length * 3];
        data.forEach(entry =>
        {
            this._data.push(entry.dayIndex);
            this._data.push(entry.stepIndex);
            this._data.push(entry.giftIndex);
        });
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
