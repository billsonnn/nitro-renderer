import { GetTickerFPS, GetTickerTime } from '../../../pixi-proxy';
import { Motion } from './Motion';

export class Motions
{
    private static _QUEUED_MOTIONS: Motion[] = [];
    private static _RUNNING_MOTIONS: Motion[] = [];
    private static _REMOVED_MOTIONS: Motion[] = [];
    private static _TIMER: ReturnType<typeof setInterval> = null;
    private static _IS_UPDATING: boolean = false;

    public static get TIMER_TIME(): number
    {
        return (1000 / GetTickerFPS());
    }

    public static runMotion(k: Motion): Motion
    {
        if(((Motions._RUNNING_MOTIONS.indexOf(k) === -1) && (Motions._QUEUED_MOTIONS.indexOf(k) === -1)))
        {
            if(Motions._IS_UPDATING)
            {
                Motions._QUEUED_MOTIONS.push(k);
            }
            else
            {
                Motions._RUNNING_MOTIONS.push(k);

                k.start();
            }

            Motions.startTimer();
        }

        return k;
    }

    public static removeMotion(k: Motion): void
    {
        let _local_2: number = Motions._RUNNING_MOTIONS.indexOf(k);

        if(_local_2 > -1)
        {
            if(Motions._IS_UPDATING)
            {
                _local_2 = Motions._REMOVED_MOTIONS.indexOf(k);

                if(_local_2 == -1) Motions._REMOVED_MOTIONS.push(k);
            }
            else
            {
                Motions._RUNNING_MOTIONS.splice(_local_2, 1);

                if(k.running) k.stop();

                if(!Motions._RUNNING_MOTIONS.length) Motions.stopTimer();
            }
        }
        else
        {
            _local_2 = Motions._QUEUED_MOTIONS.indexOf(k);

            if(_local_2 > -1) Motions._QUEUED_MOTIONS.splice(_local_2, 1);
        }
    }

    public static getMotionByTag(k: string): Motion
    {
        for(const _local_2 of Motions._RUNNING_MOTIONS)
        {
            if(_local_2.tag == k) return _local_2;
        }

        for(const _local_2 of Motions._QUEUED_MOTIONS)
        {
            if(_local_2.tag == k) return _local_2;
        }

        return null;
    }

    public static getMotionByTarget(k: HTMLElement): Motion
    {
        for(const _local_2 of Motions._RUNNING_MOTIONS)
        {
            if(_local_2.target == k) return _local_2;
        }

        for(const _local_2 of Motions._QUEUED_MOTIONS)
        {
            if(_local_2.target == k) return _local_2;
        }

        return null;
    }

    public static getMotionByTagAndTarget(k: string, _arg_2: HTMLElement): Motion
    {
        for(const _local_3 of Motions._RUNNING_MOTIONS)
        {
            if(((_local_3.tag == k) && (_local_3.target == _arg_2))) return _local_3;
        }

        for(const _local_3 of Motions._QUEUED_MOTIONS)
        {
            if(((_local_3.tag == k) && (_local_3.target == _arg_2))) return _local_3;
        }

        return null;
    }

    public static get isRunning(): boolean
    {
        return !!Motions._TIMER;
    }

    public static get isUpdating(): boolean
    {
        return Motions._IS_UPDATING;
    }

    private static onTick(): void
    {
        Motions._IS_UPDATING = true;

        const _local_2: number = GetTickerTime();

        let _local_3: Motion = null;

        // eslint-disable-next-line no-cond-assign
        while(_local_3 = Motions._QUEUED_MOTIONS.pop()) Motions._RUNNING_MOTIONS.push(_local_3);

        // eslint-disable-next-line no-cond-assign
        while(_local_3 = Motions._REMOVED_MOTIONS.pop())
        {
            Motions._RUNNING_MOTIONS.splice(Motions._RUNNING_MOTIONS.indexOf(_local_3), 1);

            if(_local_3.running) _local_3.stop();
        }

        for(_local_3 of Motions._RUNNING_MOTIONS)
        {
            if(_local_3.running)
            {
                _local_3.tick(_local_2);

                if(_local_3.complete)
                {
                    Motions.removeMotion(_local_3);
                }
            }
            else
            {
                Motions.removeMotion(_local_3);
            }
        }

        if(!Motions._RUNNING_MOTIONS.length) Motions.stopTimer();

        Motions._IS_UPDATING = false;
    }

    private static startTimer(): void
    {
        if(!Motions._TIMER)
        {
            Motions._TIMER = setInterval(Motions.onTick, Motions.TIMER_TIME);
        }
    }

    private static stopTimer(): void
    {
        if(Motions._TIMER)
        {
            clearInterval(Motions._TIMER);

            Motions._TIMER = null;
        }
    }


    public getNumRunningMotions(k: HTMLElement): number
    {
        let _local_2 = 0;

        for(const _local_3 of Motions._RUNNING_MOTIONS)
        {
            if(_local_3.target === k) _local_2++;
        }

        return _local_2;
    }
}
