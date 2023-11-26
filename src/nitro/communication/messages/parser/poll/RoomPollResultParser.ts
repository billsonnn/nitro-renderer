import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RoomPollResultParser implements IMessageParser
{
    private _question: string;
    private _choices: string[];
    private _results: any[];
    private _timer: number;

    flush(): boolean
    {
        this._question = null;
        this._choices = [];
        this._results = [];
        this._timer = -1;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._question = wrapper.readString();

        this._choices = [];
        this._results = [];

        let totalChoices = wrapper.readInt();

        while(totalChoices > 0)
        {
            this._choices.push(wrapper.readString());
            this._results.push(wrapper.readInt());

            totalChoices--;
        }
        this._timer = wrapper.readInt();

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

    public get results(): any[]
    {
        return this._results;
    }

    public get timer(): number
    {
        return this._timer;
    }
}
