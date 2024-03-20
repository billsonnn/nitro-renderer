import { Motion } from './Motion';

export class Combo extends Motion
{
    private _runningMotions: Motion[];
    private _removedMotions: Motion[];

    constructor(...motions: Motion[])
    {
        super((motions && motions.length) ? motions[0].target : null);

        this._runningMotions = [];
        this._removedMotions = [];

        for(const motion of motions) this._runningMotions.push(motion);
    }

    public start(): void
    {
        super.start();

        for(const motion of this._runningMotions) motion.start();
    }

    public tick(k: number): void
    {
        super.tick(k);

        let motion: Motion = null;

        while(((motion = this._removedMotions.pop()) !== null))
        {
            this._runningMotions.splice(this._removedMotions.indexOf(motion), 1);

            if(motion.running) motion.stop();
        }

        for(const motion of this._runningMotions)
        {
            if(motion.running) motion.tick(k);

            if(motion.complete) this._removedMotions.push(motion);
        }

        if(this._runningMotions.length > 0)
        {
            for(const motion of this._runningMotions)
            {
                this._target = motion.target;

                if(this._target) break;
            }

            this._complete = false;
        }
        else
        {
            this._complete = true;
        }
    }
}