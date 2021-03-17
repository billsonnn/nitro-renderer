export class Randomizer
{
    public static _Str_21045: number    = 1;
    public static _Str_20078: number    = 16777216;

    private static _Str_3699:Randomizer = null;

    private _Str_16737: number = 1;
    private _Str_16979: number = 16777216;
    private _Str_25697: number = 69069;
    private _Str_23320: number = 5;

    public static _Str_17384(k: number = 1): void
    {
        if(!Randomizer._Str_3699) Randomizer._Str_3699 = new Randomizer();

        Randomizer._Str_3699._Str_15634 = k;
    }

    public static _Str_26085(k: number = 16777216): void
    {
        if(!Randomizer._Str_3699) Randomizer._Str_3699 = new Randomizer();

        Randomizer._Str_3699._Str_25321 = k;
    }

    public static _Str_1612(k: number, _arg_2: number, _arg_3: number): number[]
    {
        if(!Randomizer._Str_3699) Randomizer._Str_3699 = new Randomizer();

        return Randomizer._Str_3699._Str_24535(k, _arg_2, _arg_3);
    }

    public static _Str_23572(k: number, _arg_2: number): number[]
    {
        if(!Randomizer._Str_3699) Randomizer._Str_3699 = new Randomizer();

        return Randomizer._Str_3699._Str_24231(k, _arg_2);
    }

    public set _Str_15634(k: number)
    {
        this._Str_16737 = k;
    }

    public set _Str_25321(k: number)
    {
        if(k < 1) k = 1;

        this._Str_16979 = k;
    }

    public dispose(): void
    {
    }

    public _Str_24535(k: number, _arg_2: number, _arg_3: number): number[]
    {
        const _local_4: number[] = [];

        let _local_5 = 0;

        while(_local_5 < k)
        {
            _local_4.push(this._Str_19361(_arg_2, (_arg_3 - _arg_2)));
            _local_5++;
        }

        return _local_4;
    }

    public _Str_24231(k: number, _arg_2: number): number[]
    {
        if(((k > _arg_2) || (_arg_2 > 1000))) return null;

        const _local_3: number[] = [];

        let _local_4 = 0;

        while(_local_4 <= _arg_2)
        {
            _local_3.push(_local_4);
            _local_4++;
        }

        const _local_5: number[] = [];

        let _local_6 = 0;

        while(_local_6 < k)
        {
            const _local_7 = this._Str_19361(0, (_local_3.length - 1));

            _local_5.push(_local_3[_local_7]);
            _local_3.splice(_local_7, 1);

            _local_6++;
        }

        return _local_5;
    }

    private _Str_24980(): number
    {
        let k: number = ((this._Str_25697 * this._Str_16737) + this._Str_23320);

        if(k < 0) k = -(k);

        k = (k % this._Str_16979);

        this._Str_16737 = k;

        return k;
    }

    private _Str_19361(k: number, _arg_2: number): number
    {
        let _local_3: number = this._Str_24980();

        if(_arg_2 < 1) return k;

        _local_3 = (k + ((_local_3 / this._Str_16979) * _arg_2));

        return _local_3;
    }
}