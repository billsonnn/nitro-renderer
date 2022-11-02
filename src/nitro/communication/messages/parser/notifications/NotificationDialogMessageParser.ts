import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class NotificationDialogMessageParser implements IMessageParser
{
    private _type: string;
    private _parameters: Map<string, string>;

    public flush(): boolean
    {
        this._type = null;
        this._parameters = new Map();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type = wrapper.readString();

        let totalParameters = wrapper.readInt();

        while(totalParameters > 0)
        {
            this._parameters.set(wrapper.readString(), wrapper.readString());

            totalParameters--;
        }

        return true;
    }

    public get type(): string
    {
        return this._type;
    }

    public get parameters(): Map<string, string>
    {
        return this._parameters;
    }
}
