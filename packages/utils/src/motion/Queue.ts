import { Motion } from './Motion';

export class Queue extends Motion
{
    private _motion: Motion;
    private _queue: Motion[];

    constructor(...motions: Motion[])
    {
        super((motions ? motions[0].target : null));

        this._queue = [];

        for(const motion of motions) this._queue.push(motion);

        this._motion = motions[0];
        this._complete = !this._motion;
    }

    public get running(): boolean
    {
        return ((this._running && this._motion) ? this._motion.running : false);
    }

    public start(): void
    {
        super.start();

        this._motion.start();
    }

    public update(k: number): void
    {
        super.update(k);

        if(this._motion.running) this._motion.update(k);
    }

    public stop(): void
    {
        super.stop();

        this._motion.stop();
    }

    public tick(k: number): void
    {
        super.tick(k);

        this._motion.tick(k);

        if(this._motion.complete)
        {
            this._motion.stop();

            const index = this._queue.indexOf(this._motion);

            if(index < (this._queue.length - 1))
            {
                this._motion = this._queue[(index + 1)];
                this._target = this._motion.target;

                this._motion.start();
            }
            else
            {
                this._complete = true;
            }
        }
    }
}