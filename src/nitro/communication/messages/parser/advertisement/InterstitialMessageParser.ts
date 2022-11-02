import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class InterstitialMessageParser implements IMessageParser
{
    private _canShowInterstitial: boolean;

    public flush(): boolean
    {
        this._canShowInterstitial = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._canShowInterstitial = wrapper.readBoolean();

        return true;
    }

    public get canShowInterstitial(): boolean
    {
        return this._canShowInterstitial;
    }
}
