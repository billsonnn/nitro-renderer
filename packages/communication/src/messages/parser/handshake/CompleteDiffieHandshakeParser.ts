import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CompleteDiffieHandshakeParser implements IMessageParser
{
    private _encryptedPublicKey: string = null;
    private _serverClientEncryption: boolean = false;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._encryptedPublicKey = wrapper.readString();

        if(wrapper.bytesAvailable)
        {
            this._serverClientEncryption = wrapper.readBoolean();
        }

        return true;
    }

    public get encryptedPublicKey(): string
    {
        return this._encryptedPublicKey;
    }

    public get serverClientEncryption(): boolean
    {
        return this._serverClientEncryption;
    }
}
