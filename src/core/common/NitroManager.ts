import { IEventDispatcher, INitroLogger, INitroManager } from '../../api';
import { EventDispatcher } from '../events/EventDispatcher';
import { Disposable } from './Disposable';
import { NitroLogger } from './NitroLogger';

export class NitroManager extends Disposable implements INitroManager
{
    private _logger: INitroLogger;

    private _events: IEventDispatcher;

    private _isLoaded: boolean;
    private _isLoading: boolean;

    constructor(logger: INitroLogger = null)
    {
        super();

        this._logger = logger instanceof NitroLogger ? logger : new NitroLogger(this.constructor.name);

        this._events = new EventDispatcher();

        this._isLoaded = false;
        this._isLoading = false;
    }

    public init(): void
    {
        if (this._isLoaded || this._isLoading || this.isDisposing) return;

        this._isLoading = true;

        this.onInit();

        this._isLoaded = true;
        this._isLoading = false;
    }

    protected onInit(): void
    {
        return;
    }

    protected onDispose(): void
    {
        if (this._events) this._events.dispose();

        super.onDispose();
    }

    public reload(): void
    {
        this.dispose();
        this.init();
    }

    public get logger(): INitroLogger
    {
        return this._logger;
    }

    public get events(): IEventDispatcher
    {
        return this._events;
    }

    public get isLoaded(): boolean
    {
        return this._isLoaded;
    }

    public get isLoading(): boolean
    {
        return this._isLoading;
    }
}
