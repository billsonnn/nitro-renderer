import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class MysteryBoxKeysParser implements IMessageParser
{
    private _boxColor: string;
    private _keyColor: string;

    public flush(): boolean
    {
        this._boxColor = null;
        this._keyColor = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._boxColor = wrapper.readString();
        this._keyColor = wrapper.readString();

        return true;
    }

    public get boxColor(): string
    {
        return this._boxColor;
    }

    public get keyColor(): string
    {
        return this._keyColor;
    }
}
