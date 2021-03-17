import { IEventDispatcher } from '../../../core/events/IEventDispatcher';
import { IRoomWidgetHandler } from '../IRoomWidgetHandler';
import { IRoomWidget } from './IRoomWidget';
import { IRoomWidgetMessageListener } from './IRoomWidgetMessageListener';

export class ConversionTrackingWidget implements IRoomWidget
{
    private _widgetHandler: IRoomWidgetHandler;
    private _messageListener: IRoomWidgetMessageListener;
    private _events: IEventDispatcher;
    private _disposed: boolean;

    constructor()
    {
        this._widgetHandler     = null;
        this._messageListener   = null;
        this._events            = null;
        this._disposed          = false;
    }

    public initialize(k: number = 0): void
    {

    }

    public dispose(): void
    {
        if(this.disposed) return;

        this._messageListener = null;

        if(this._events && !this._events.disposed)
        {
            this.unregisterUpdateEvents(this._events);
        }

        if(this._widgetHandler)
        {
            this._widgetHandler.dispose();

            this._widgetHandler = null;
        }

        this._events   = null;
        this._disposed  = true;
    }

    public registerUpdateEvents(eventDispatcher: IEventDispatcher): void
    {
        this._events = eventDispatcher;
    }

    public unregisterUpdateEvents(eventDispatcher: IEventDispatcher): void
    {
        this._events = null;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get widgetHandler(): IRoomWidgetHandler
    {
        return this._widgetHandler;
    }

    public set widgetHandler(handler: IRoomWidgetHandler)
    {
        this._widgetHandler = handler;

        //@ts-ignore
        if(!this._widgetHandler.widget) this._widgetHandler.widget = this;
    }

    public get messageListener(): IRoomWidgetMessageListener
    {
        return this._messageListener;
    }

    public set messageListener(listener: IRoomWidgetMessageListener)
    {
        this._messageListener = listener;
    }
}