import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class _Str_5753
{
    private _Str_16211: number;
    private _breeds: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._Str_16211 = wrapper.readInt();
        this._breeds    = [];

        let totalCount = wrapper.readInt();

        while(totalCount > 0)
        {
            this._breeds.push(wrapper.readInt());

            totalCount--;
        }
    }

    public dispose():void
    {
        this._Str_16211 = -1;
        this._breeds    = [];
    }

    public get _Str_12554(): number
    {
        return this._Str_16211;
    }

    public get breeds(): number[]
    {
        return this._breeds;
    }
}