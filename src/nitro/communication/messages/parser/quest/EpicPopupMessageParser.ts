import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class EpicPopupMessageParser implements IMessageParser
{
    private _imageUri: string;

    public flush(): boolean
    {
        this._imageUri = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._imageUri = wrapper.readString();
        return true;
    }

    public get imageUri(): string
    {
        return this._imageUri;
    }
}
