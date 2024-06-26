import { IEventDispatcher, INitroEvent } from '@nitrots/api';
import { NitroLogger } from '@nitrots/utils';

export class EventDispatcher implements IEventDispatcher
{
    private _listeners: Map<string, Function[]> = new Map();

    public dispose(): void
    {
        this.removeAllListeners();
    }

    public addEventListener<T extends INitroEvent>(type: string, callback: (event: T) => void): void
    {
        if(!type || !callback) return;

        const existing = this._listeners.get(type);

        if(!existing)
        {
            this._listeners.set(type, [callback]);

            return;
        }

        NitroLogger.events('Added Event Listener', type);

        existing.push(callback);
    }

    public removeEventListener(type: string, callback: Function): void
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

    public dispatchEvent<T extends INitroEvent>(event: T): boolean
    {
        if(!event) return false;

        NitroLogger.events('Dispatched Event', event.type);

        this.processEvent(event);

        return true;
    }

    private processEvent<T extends INitroEvent>(event: T): void
    {
        const existing = this._listeners.get(event.type);

        if(!existing || !existing.length) return;

        const callbacks: Function[] = [];

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
                NitroLogger.error(err.stack);

                return;
            }
        }
    }

    public removeAllListeners(): void
    {
        this._listeners.clear();
    }
}
