import { Nitro } from '../../Nitro';
import { Motion } from './Motion';

export class Motions
{
    private static _Str_5358: Motion[]                          = [];
    private static _Str_3932: Motion[]                          = [];
    private static _Str_10731: Motion[]                         = [];
    private static _Str_5307: ReturnType<typeof setInterval>    = null;
    private static _Str_7507: boolean                           = false;

    public static get TIMER_TIME(): number
    {
        return (1000 / Nitro.instance.ticker.FPS);
    }

    public static _Str_4598(k: Motion): Motion
    {
        if(((Motions._Str_3932.indexOf(k) === -1) && (Motions._Str_5358.indexOf(k) === -1)))
        {
            if(Motions._Str_7507)
            {
                Motions._Str_5358.push(k);
            }
            else
            {
                Motions._Str_3932.push(k);

                k.start();
            }

            Motions._Str_12757();
        }

        return k;
    }

    public static _Str_15790(k:Motion): void
    {
        let _local_2: number = Motions._Str_3932.indexOf(k);

        if(_local_2 > -1)
        {
            if(Motions._Str_7507)
            {
                _local_2 = Motions._Str_10731.indexOf(k);

                if(_local_2 == -1) Motions._Str_10731.push(k);
            }
            else
            {
                Motions._Str_3932.splice(_local_2, 1);

                if(k.running) k.stop();

                if(!Motions._Str_3932.length) Motions._Str_7465();
            }
        }
        else
        {
            _local_2 = Motions._Str_5358.indexOf(k);

            if(_local_2 > -1) Motions._Str_5358.splice(_local_2, 1);
        }
    }

    public static _Str_19320(k: string):Motion
    {
        for(const _local_2 of Motions._Str_3932)
        {
            if(_local_2.tag == k) return _local_2;
        }

        for(const _local_2 of Motions._Str_5358)
        {
            if(_local_2.tag == k) return _local_2;
        }

        return null;
    }

    public static _Str_9810(k: HTMLElement):Motion
    {
        for(const _local_2 of Motions._Str_3932)
        {
            if(_local_2.target == k) return _local_2;
        }

        for(const _local_2 of Motions._Str_5358)
        {
            if(_local_2.target == k) return _local_2;
        }

        return null;
    }

    public static _Str_26365(k: string, _arg_2: HTMLElement):Motion
    {
        for(const _local_3 of Motions._Str_3932)
        {
            if(((_local_3.tag == k) && (_local_3.target == _arg_2))) return _local_3;
        }

        for(const _local_3 of Motions._Str_5358)
        {
            if(((_local_3.tag == k) && (_local_3.target == _arg_2))) return _local_3;
        }

        return null;
    }

    public static get _Str_1349(): boolean
    {
        return !!Motions._Str_5307;
    }

    public static get _Str_26314(): boolean
    {
        return Motions._Str_7507;
    }

    private static _Str_21055(): void
    {
        Motions._Str_7507 = true;

        const _local_2: number = Nitro.instance.time;

        let _local_3: Motion = null;

        // eslint-disable-next-line no-cond-assign
        while(_local_3 = Motions._Str_5358.pop()) Motions._Str_3932.push(_local_3);

        // eslint-disable-next-line no-cond-assign
        while(_local_3 = Motions._Str_10731.pop())
        {
            Motions._Str_3932.splice(Motions._Str_3932.indexOf(_local_3), 1);

            if(_local_3.running) _local_3.stop();
        }

        for(_local_3 of Motions._Str_3932)
        {
            if(_local_3.running)
            {
                _local_3.tick(_local_2);

                if(_local_3.complete)
                {
                    Motions._Str_15790(_local_3);
                }
            }
            else
            {
                Motions._Str_15790(_local_3);
            }
        }

        if(!Motions._Str_3932.length) Motions._Str_7465();

        Motions._Str_7507 = false;
    }

    private static _Str_12757(): void
    {
        if(!Motions._Str_5307)
        {
            Motions._Str_5307 = setInterval(Motions._Str_21055, Motions.TIMER_TIME);
        }
    }

    private static _Str_7465(): void
    {
        if(Motions._Str_5307)
        {
            clearInterval(Motions._Str_5307);

            Motions._Str_5307 = null;
        }
    }


    public _Str_25883(k: HTMLElement): number
    {
        let _local_2 = 0;

        for(const _local_3 of Motions._Str_3932)
        {
            if(_local_3.target === k) _local_2++;
        }

        return _local_2;
    }
}
