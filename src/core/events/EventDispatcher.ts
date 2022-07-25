import { Nitro } from '../../nitro/Nitro';
import { Disposable } from '../common/disposable/Disposable';
import { IDisposable } from '../common/disposable/IDisposable';
import { INitroLogger } from '../common/logger/INitroLogger';
import { NitroLogger } from '../common/logger/NitroLogger';
import { IEventDispatcher } from './IEventDispatcher';
import { NitroEvent } from './NitroEvent';

export class EventDispatcher extends Disposable implements IEventDispatcher, IDisposable
{
    private _logger: INitroLogger;
    private _listeners: Map<string, Function[]>;

    constructor()
    {
        super();

        this._logger = new NitroLogger(this.constructor.name);
        this._listeners = new Map();
    }

    protected onDispose(): void
    {
        this.removeAllListeners();

        super.onDispose();
    }

    public addEventListener(type: string, callback: Function): void
    {
        if(!type || !callback) return;

        const existing = this._listeners.get(type);

        if(!existing)
        {
            this._listeners.set(type, [callback]);

            return;
        }

        existing.push(callback);
    }

    public removeEventListener(type: string, callback: any): void
    {
        if(!type || !callback) return;

        const existing = this._listeners.get(type);

        if(!existing || !existing.length) return;

        for(const [i, cb] of existing.entries())
        {
            if(!cb || (cb !== callback)) continue;

            existing.splice(i, 1);

            if(!existing.length) this._listeners.delete(type);

            return;
        }
    }

    public dispatchEvent(event: NitroEvent): boolean
    {
        if(!event) return false;

        if(Nitro.instance.getConfiguration<boolean>('system.dispatcher.log')) this._logger.log('Dispatched Event', event.type);

        this.processEvent(event);

        return true;
    }

    private processEvent(event: NitroEvent): void
    {
        const existing = this._listeners.get(event.type);

        if(!existing || !existing.length) return;

        const callbacks = [];

        for(const callback of existing)
        {
            if(!callback) continue;

            callbacks.push(callback);
        }

        while(callbacks.length)
        {
            const callback = callbacks.shift();

            try
            {
                callback(event);
            }

            catch (err)
            {
                this._logger.error(err.stack);

                return;
            }
        }
    }

    public removeAllListeners(): void
    {
        this._listeners.clear();
    }

    public get logger(): INitroLogger
    {
        return this._logger;
    }
}
