import { Motion } from './Motion';

export class Dispose extends Motion
{
    constructor(k: HTMLElement)
    {
        super(k);
    }

    public tick(k: number): void
    {
        super.tick(k);

        if(this.target)
        {
            this.target.remove();

            this.target = null;
        }
    }
}