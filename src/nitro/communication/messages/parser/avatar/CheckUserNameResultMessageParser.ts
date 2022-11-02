import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class CheckUserNameResultMessageParser implements IMessageParser
{
    private _resultCode: number;
    private _name: string;
    private _nameSuggestions: string[];

    public flush(): boolean
    {
        this._resultCode = -1;
        this._name = '';
        this._nameSuggestions = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._resultCode = wrapper.readInt();
        this._name = wrapper.readString();

        let totalSuggestions = wrapper.readInt();

        while(totalSuggestions > 0)
        {
            this._nameSuggestions.push(wrapper.readString());

            totalSuggestions--;
        }

        return true;
    }

    public get resultCode(): number
    {
        return this._resultCode;
    }

    public get name(): string
    {
        return this._name;
    }

    public get nameSuggestions(): string[]
    {
        return this._nameSuggestions;
    }
}
