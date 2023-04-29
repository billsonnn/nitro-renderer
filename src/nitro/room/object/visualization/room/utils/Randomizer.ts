import { ToInt32 } from '../../../../../utils';

export class Randomizer
{
    public static DEFAULT_SEED: number = 1;
    public static DEFAULT_MODULUS: number = 16777216;

    private static _randomizer:Randomizer = null;

    private _seed: number = 1;
    private _modulus: number = 16777216;
    private _multiplier: number = 69069;
    private _increment: number = 5;

    public static setSeed(k: number = 1): void
    {
        if(!Randomizer._randomizer) Randomizer._randomizer = new Randomizer();

        Randomizer._randomizer.seed = k;
    }

    public static setModulus(k: number = 16777216): void
    {
        if(!Randomizer._randomizer) Randomizer._randomizer = new Randomizer();

        Randomizer._randomizer.modulus = k;
    }

    public static getValues(k: number, _arg_2: number, _arg_3: number): number[]
    {
        if(!Randomizer._randomizer) Randomizer._randomizer = new Randomizer();

        return Randomizer._randomizer.getRandomValues(k, _arg_2, _arg_3);
    }

    public static getArray(k: number, _arg_2: number): number[]
    {
        if(!Randomizer._randomizer) Randomizer._randomizer = new Randomizer();

        return Randomizer._randomizer.getRandomArray(k, _arg_2);
    }

    public set seed(k: number)
    {
        this._seed = k;
    }

    public set modulus(k: number)
    {
        if(k < 1) k = 1;

        this._modulus = k;
    }

    public dispose(): void
    {
    }

    public getRandomValues(k: number, _arg_2: number, _arg_3: number): number[]
    {
        const _local_4: number[] = [];

        let _local_5 = 0;

        while(_local_5 < k)
        {
            _local_4.push(this.iterateScaled(_arg_2, (_arg_3 - _arg_2)));
            _local_5++;
        }

        return _local_4;
    }

    public getRandomArray(k: number, _arg_2: number): number[]
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
            const _local_7 = this.iterateScaled(0, (_local_3.length - 1));

            _local_5.push(_local_3[_local_7]);
            _local_3.splice(_local_7, 1);

            _local_6++;
        }

        return _local_5;
    }

    private iterate(): number
    {
        let k: number = ToInt32(Math.trunc(this._multiplier * this._seed) + this._increment);

        if(k < 0) k = -(k);

        k = (k % this._modulus);

        this._seed = k;

        return k;
    }

    private iterateScaled(k: number, _arg_2: number): number
    {
        let _local_3: number = this.iterate();

        if(_arg_2 < 1) return k;

        _local_3 = Math.trunc(k + ((_local_3 / this._modulus) * _arg_2));

        return _local_3;
    }
}
