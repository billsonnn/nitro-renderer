import { Application, IApplicationOptions } from '@pixi/app';

export class PixiApplicationProxy extends Application
{
    private static INSTANCE: Application = null;

    constructor(options?: IApplicationOptions)
    {
        super(options);

        if(!PixiApplicationProxy.INSTANCE) PixiApplicationProxy.INSTANCE = this;
    }

    public static get instance(): Application
    {
        return this.INSTANCE || null;
    }
}
