import { Application, IApplicationOptions } from '@pixi/app';
import { SCALE_MODES } from '@pixi/constants';
import { settings } from '@pixi/settings';
import { Ticker } from '@pixi/ticker';
import { ConfigurationEvent } from '../core/configuration/ConfigurationEvent';
import { EventDispatcher } from '../core/events/EventDispatcher';
import { IEventDispatcher } from '../core/events/IEventDispatcher';
import { ILinkEventTracker } from '../core/events/ILinkEventTracker';
import { IWorkerEventTracker } from '../core/events/IWorkerEventTracker';
import { NitroEvent } from '../core/events/NitroEvent';
import { INitroCore } from '../core/INitroCore';
import { NitroCore } from '../core/NitroCore';
import { NitroTimer } from '../core/utils/NitroTimer';
import { IRoomManager } from '../room/IRoomManager';
import { RoomManager } from '../room/RoomManager';
import { AvatarRenderManager } from './avatar/AvatarRenderManager';
import { IAvatarRenderManager } from './avatar/IAvatarRenderManager';
import { IRoomCameraWidgetManager } from './camera/IRoomCameraWidgetManager';
import { RoomCameraWidgetManager } from './camera/RoomCameraWidgetManager';
import { INitroCommunicationManager } from './communication/INitroCommunicationManager';
import { NitroCommunicationManager } from './communication/NitroCommunicationManager';
import { LegacyExternalInterface } from './externalInterface/LegacyExternalInterface';
import { GameMessageHandler } from './game/GameMessageHandler';
import { INitro } from './INitro';
import { INitroLocalizationManager } from './localization/INitroLocalizationManager';
import { NitroLocalizationManager } from './localization/NitroLocalizationManager';
import './Plugins';
import { RoomEngineEvent } from './room/events/RoomEngineEvent';
import { IRoomEngine } from './room/IRoomEngine';
import { RoomEngine } from './room/RoomEngine';
import { IRoomSessionManager } from './session/IRoomSessionManager';
import { ISessionDataManager } from './session/ISessionDataManager';
import { RoomSessionManager } from './session/RoomSessionManager';
import { SessionDataManager } from './session/SessionDataManager';
import { ISoundManager } from './sound/ISoundManager';
import { SoundManager } from './sound/SoundManager';
import { HabboWebTools } from './utils/HabboWebTools';

LegacyExternalInterface.available;

settings.SCALE_MODE = (!(window.devicePixelRatio % 1)) ? SCALE_MODES.NEAREST : SCALE_MODES.LINEAR;
settings.ROUND_PIXELS = true;

export class Nitro extends Application implements INitro
{
    public static WEBGL_CONTEXT_LOST: string = 'NE_WEBGL_CONTEXT_LOST';
    public static WEBGL_UNAVAILABLE: string = 'NE_WEBGL_UNAVAILABLE';
    public static READY: string = 'NE_READY!';

    private static INSTANCE: INitro = null;

    private _nitroTimer: NitroTimer;
    private _worker: Worker;
    private _core: INitroCore;
    private _events: IEventDispatcher;
    private _communication: INitroCommunicationManager;
    private _localization: INitroLocalizationManager;
    private _avatar: IAvatarRenderManager;
    private _roomEngine: IRoomEngine;
    private _sessionDataManager: ISessionDataManager;
    private _roomSessionManager: IRoomSessionManager;
    private _roomManager: IRoomManager;
    private _cameraManager: IRoomCameraWidgetManager;
    private _soundManager: ISoundManager;
    private _linkTrackers: ILinkEventTracker[];
    private _workerTrackers: IWorkerEventTracker[];

    private _isReady: boolean;
    private _isDisposed: boolean;

    constructor(core: INitroCore, options?: IApplicationOptions)
    {
        super(options);

        if(!Nitro.INSTANCE) Nitro.INSTANCE = this;

        this._nitroTimer = new NitroTimer();
        this._worker = null;
        this._core = core;
        this._events = new EventDispatcher();
        this._communication = new NitroCommunicationManager(core.communication);
        this._localization = new NitroLocalizationManager(this._communication);
        this._avatar = new AvatarRenderManager();
        this._roomEngine = new RoomEngine(this._communication);
        this._sessionDataManager = new SessionDataManager(this._communication);
        this._roomSessionManager = new RoomSessionManager(this._communication, this._roomEngine);
        this._roomManager = new RoomManager(this._roomEngine, this._roomEngine.visualizationFactory, this._roomEngine.logicFactory);
        this._cameraManager = new RoomCameraWidgetManager();
        this._soundManager = new SoundManager();
        this._linkTrackers = [];
        this._workerTrackers = [];

        this._isReady = false;
        this._isDisposed = false;

        this._core.configuration.events.addEventListener(ConfigurationEvent.LOADED, this.onConfigurationLoadedEvent.bind(this));
        this._roomEngine.events.addEventListener(RoomEngineEvent.ENGINE_INITIALIZED, this.onRoomEngineReady.bind(this));

        if(this._worker) this._worker.onmessage = this.createWorkerEvent.bind(this);
    }

    public static bootstrap(): void
    {
        if(Nitro.INSTANCE)
        {
            Nitro.INSTANCE.dispose();

            Nitro.INSTANCE = null;
        }

        const canvas = document.createElement('canvas');

        const instance = new this(new NitroCore(), {
            autoDensity: false,
            resolution: window.devicePixelRatio,
            width: window.innerWidth,
            height: window.innerHeight,
            view: canvas
        });

        canvas.addEventListener('webglcontextlost', () => instance.events.dispatchEvent(new NitroEvent(Nitro.WEBGL_CONTEXT_LOST)));
    }

    public init(): void
    {
        if(this._isReady || this._isDisposed) return;

        if(this._avatar) this._avatar.init();

        if(this._soundManager) this._soundManager.init();

        if(this._roomEngine)
        {
            this._roomEngine.sessionDataManager = this._sessionDataManager;
            this._roomEngine.roomSessionManager = this._roomSessionManager;
            this._roomEngine.roomManager = this._roomManager;

            if(this._sessionDataManager) this._sessionDataManager.init();
            if(this._roomSessionManager) this._roomSessionManager.init();

            this._roomEngine.init();
        }

        if(!this._communication.connection)
        {
            throw new Error('No connection found');
        }

        new GameMessageHandler(this._communication.connection);

        this._isReady = true;
    }

    public dispose(): void
    {
        if(this._isDisposed) return;

        if(this._roomManager)
        {
            this._roomManager.dispose();

            this._roomManager = null;
        }

        if(this._roomSessionManager)
        {
            this._roomSessionManager.dispose();

            this._roomSessionManager = null;
        }

        if(this._sessionDataManager)
        {
            this._sessionDataManager.dispose();

            this._sessionDataManager = null;
        }

        if(this._roomEngine)
        {
            this._roomEngine.dispose();

            this._roomEngine = null;
        }

        if(this._avatar)
        {
            this._avatar.dispose();

            this._avatar = null;
        }

        if(this._soundManager)
        {
            this._soundManager.dispose();

            this._soundManager = null;
        }

        if(this._communication)
        {
            this._communication.dispose();

            this._communication = null;
        }

        super.destroy();

        this._isDisposed = true;
        this._isReady = false;
    }

    private onConfigurationLoadedEvent(event: ConfigurationEvent): void
    {
        const animationFPS = this.getConfiguration<number>('system.animation.fps', 24);
        const limitsFPS = this.getConfiguration<boolean>('system.limits.fps', true);

        if(limitsFPS) Nitro.instance.ticker.maxFPS = animationFPS;
    }

    private onRoomEngineReady(event: RoomEngineEvent): void
    {
        this.startSendingHeartBeat();
    }

    public getConfiguration<T>(key: string, value: T = null): T
    {
        return this._core.configuration.getValue<T>(key, value);
    }

    public getLocalization(key: string): string
    {
        return this._localization.getValue(key);
    }

    public getLocalizationWithParameter(key: string, parameter: string, replacement: string): string
    {
        return this._localization.getValueWithParameter(key, parameter, replacement);
    }

    public getLocalizationWithParameters(key: string, parameters: string[], replacements: string[]): string
    {
        return this._localization.getValueWithParameters(key, parameters, replacements);
    }

    public addWorkerEventTracker(tracker: IWorkerEventTracker): void
    {
        if(this._workerTrackers.indexOf(tracker) >= 0) return;

        this._workerTrackers.push(tracker);
    }

    public removeWorkerEventTracker(tracker: IWorkerEventTracker): void
    {
        const index = this._workerTrackers.indexOf(tracker);

        if(index === -1) return;

        this._workerTrackers.splice(index, 1);
    }

    public createWorkerEvent(message: MessageEvent): void
    {
        if(!message) return;

        const data: { [index: string]: any } = message.data;

        for(const tracker of this._workerTrackers)
        {
            if(!tracker) continue;

            tracker.workerMessageReceived(data);
        }
    }

    public sendWorkerEvent(message: { [index: string]: any }): void
    {
        if(!message || !this._worker) return;

        this._worker.postMessage(message);
    }

    public addLinkEventTracker(tracker: ILinkEventTracker): void
    {
        if(this._linkTrackers.indexOf(tracker) >= 0) return;

        this._linkTrackers.push(tracker);
    }

    public removeLinkEventTracker(tracker: ILinkEventTracker): void
    {
        const index = this._linkTrackers.indexOf(tracker);

        if(index === -1) return;

        this._linkTrackers.splice(index, 1);
    }

    public createLinkEvent(link: string): void
    {
        if(!link || (link === '')) return;

        for(const tracker of this._linkTrackers)
        {
            if(!tracker) continue;

            const prefix = tracker.eventUrlPrefix;

            if(prefix.length > 0)
            {
                if(link.substr(0, prefix.length) === prefix) tracker.linkReceived(link);
            }
            else
            {
                tracker.linkReceived(link);
            }
        }
    }

    private startSendingHeartBeat(): void
    {
        this.sendHeartBeat();

        setInterval(this.sendHeartBeat, 10000);
    }

    private sendHeartBeat(): void
    {
        HabboWebTools.sendHeartBeat();
    }

    public setWorker(val: Worker): void
    {
        this._worker = val;
        this._worker.onmessage = this.createWorkerEvent.bind(this);
    }

    public get nitroTimer(): NitroTimer
    {
        return this._nitroTimer;
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get events(): IEventDispatcher
    {
        return this._events;
    }

    public get localization(): INitroLocalizationManager
    {
        return this._localization;
    }

    public get communication(): INitroCommunicationManager
    {
        return this._communication;
    }

    public get avatar(): IAvatarRenderManager
    {
        return this._avatar;
    }

    public get roomEngine(): IRoomEngine
    {
        return this._roomEngine;
    }

    public get sessionDataManager(): ISessionDataManager
    {
        return this._sessionDataManager;
    }

    public get roomSessionManager(): IRoomSessionManager
    {
        return this._roomSessionManager;
    }

    public get roomManager(): IRoomManager
    {
        return this._roomManager;
    }

    public get cameraManager(): IRoomCameraWidgetManager
    {
        return this._cameraManager;
    }

    public get soundManager(): ISoundManager
    {
        return this._soundManager;
    }

    public get width(): number
    {
        return this.renderer.width;
    }

    public get height(): number
    {
        return this.renderer.height;
    }

    public get ticker(): Ticker
    {
        return Ticker.shared;
    }

    public get time(): number
    {
        return this.ticker.lastTime;
    }

    public get isReady(): boolean
    {
        return this._isReady;
    }

    public get isDisposed(): boolean
    {
        return this._isDisposed;
    }

    public static get instance(): INitro
    {
        return this.INSTANCE || null;
    }
}
