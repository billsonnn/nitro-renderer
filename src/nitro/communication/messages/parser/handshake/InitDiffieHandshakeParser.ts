import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class InitDiffieHandshakeParser implements IMessageParser
{
    private _encryptedPrime: string;
    private _encryptedGenerator: string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._encryptedPrime = wrapper.readString();
        this._encryptedGenerator = wrapper.readString();

        return true;
    }

    public get encryptedPrime(): string
    {
        return this._encryptedPrime;
    }

    public get encryptedGenerator(): string
    {
        return this._encryptedGenerator;
    }
}
