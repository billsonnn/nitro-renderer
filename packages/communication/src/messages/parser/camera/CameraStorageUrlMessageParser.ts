import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CameraStorageUrlMessageParser implements IMessageParser
{
    private _url: string;

    public flush(): boolean
    {
        this._url = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._url = wrapper.readString();

        return true;
    }

    public get url(): string
    {
        return this._url;
    }
}
