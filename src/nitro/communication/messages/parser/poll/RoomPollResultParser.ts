import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RoomPollResultParser implements IMessageParser
{
    private _question: string;
    private _choices: string[];
    private _SafeStr_7651: any[];
    private _SafeStr_7654: number;

    flush(): boolean
    {
        this._question = null;
        this._choices = [];
        this._SafeStr_7651 = [];
        this._SafeStr_7654 = -1;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._question = wrapper.readString();

        this._choices = [];
        this._SafeStr_7651 = [];

        let totalChoices = wrapper.readInt();

        while(totalChoices > 0)
        {
            this._choices.push(wrapper.readString());
            this._SafeStr_7651.push(wrapper.readInt());

            totalChoices--;
        }
        this._SafeStr_7654 = wrapper.readInt();

        return true;
    }

    public get question(): string
    {
        return this._question;
    }

    public get choices(): string[]
    {
        return this._choices;
    }

    public get SafeStr_7651(): any[]
    {
        return this._SafeStr_7651;
    }

    public get SafeStr_7654(): number
    {
        return this._SafeStr_7654;
    }
}
