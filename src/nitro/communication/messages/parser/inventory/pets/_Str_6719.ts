import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { _Str_3763 } from '../../../incoming/room/pet/_Str_3763';
import { _Str_5753 } from '../../../incoming/room/pet/_Str_5753';

export class _Str_6719 implements IMessageParser
{
    private _Str_5743: number;
    private _pet1: _Str_3763;
    private _pet2: _Str_3763;
    private _Str_4447: _Str_5753[];
    private _Str_21973: number;

    public flush(): boolean
    {
        this._Str_5743 = 0;

        if(this._pet1)
        {
            this._pet1.dispose();
            this._pet1 = null;
        }

        if(this._pet2)
        {
            this._pet2.dispose();
            this._pet2 = null;
        }

        for(const k of this._Str_4447) k && k.dispose();

        this._Str_4447 = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_5743  = wrapper.readInt();
        this._pet1      = new _Str_3763(wrapper);
        this._pet2      = new _Str_3763(wrapper);

        let totalCount = wrapper.readInt();

        while(totalCount > 0)
        {
            this._Str_4447.push(new _Str_5753(wrapper));

            totalCount--;
        }

        this._Str_21973 = wrapper.readInt();

        return true;
    }

    public get _Str_12369(): number
    {
        return this._Str_5743;
    }

    public get pet1():_Str_3763
    {
        return this._pet1;
    }

    public get pet2():_Str_3763
    {
        return this._pet2;
    }

    public get _Str_10346(): _Str_5753[]
    {
        return this._Str_4447;
    }

    public get _Str_24905(): number
    {
        return this._Str_21973;
    }
}