import { Application } from 'pixi.js';
import 'pixi.js/accessibility';
import 'pixi.js/app';
import 'pixi.js/events';
import 'pixi.js/filters';
import 'pixi.js/graphics';
import 'pixi.js/mesh';
import 'pixi.js/rendering';
import 'pixi.js/sprite-nine-slice';
import 'pixi.js/sprite-tiling';
import 'pixi.js/spritesheet';
import 'pixi.js/text';
import 'pixi.js/text-bitmap';
import 'pixi.js/text-html';
import { AssetManager, IAvatarRenderManager, ICommunicationManager, IConfigurationManager, IEventDispatcher, ILinkEventTracker, ILocalizationManager, IRoomCameraWidgetManager, IRoomEngine, ISessionDataManager, ISoundManager, NitroConfiguration, NitroLogger } from '../api';
import { GetPixi, GetTicker } from '../common';
import { EventDispatcher } from '../events';
import { INitro } from './INitro';
import { NitroVersion } from './NitroVersion';
import { AvatarRenderManager } from './avatar';
import { RoomCameraWidgetManager } from './camera';
import { CommunicationManager } from './communication';
import { ConfigurationManager } from './configuration';
import { LegacyExternalInterface } from './externalInterface';
import { GameMessageHandler } from './game';
import { LocalizationManager } from './localization';
import { LandscapeRasterizer, RoomEngine } from './room';
import { SessionDataManager } from './session';
import { SoundManager } from './sound';
import { HabboWebTools } from './utils/HabboWebTools';

LegacyExternalInterface.available;

/* BaseTexture.defaultOptions.scaleMode = (!(window.devicePixelRatio % 1)) ? SCALE_MODES.NEAREST : SCALE_MODES.LINEAR;
TextureGCSystem.defaultMaxIdle = 120;

settings.ROUND_PIXELS = true; */

export class Nitro implements INitro
{
    public static WEBGL_CONTEXT_LOST: string = 'NE_WEBGL_CONTEXT_LOST';
    public static WEBGL_UNAVAILABLE: string = 'NE_WEBGL_UNAVAILABLE';
    public static READY: string = 'NE_READY!';

    private static INSTANCE: INitro = null;

    private _application: Application;
    private _configuration: IConfigurationManager = new ConfigurationManager();
    private _events: IEventDispatcher = new EventDispatcher();
    private _communication: ICommunicationManager = new CommunicationManager();
    private _localization: ILocalizationManager = new LocalizationManager(this._communication);
    private _avatar: IAvatarRenderManager = new AvatarRenderManager();
    private _sessionDataManager: ISessionDataManager = new SessionDataManager(this._communication);
    private _roomEngine: IRoomEngine = new RoomEngine(this._communication, this._sessionDataManager);
    private _cameraManager: IRoomCameraWidgetManager = new RoomCameraWidgetManager();
    private _soundManager: ISoundManager = new SoundManager();
    private _linkTrackers: ILinkEventTracker[] = [];

    constructor()
    {
        if(!Nitro.INSTANCE) Nitro.INSTANCE = this;
    }

    public static async bootstrap(): Promise<Nitro>
    {
        NitroVersion.sayHello();

        try
        {
            await GetPixi().init({
                autoStart: false,
                autoDensity: false,
                width: window.innerWidth,
                height: window.innerHeight,
                resizeTo: window,
                sharedTicker: true
            });

            const nitro = new this();

            await nitro._configuration.init();

            nitro.setDefaultConfiguration();

            await Promise.all([
                nitro._localization.init(),
                AssetManager._INSTANCE.downloadAssets(NitroConfiguration.getValue<string[]>('preload.assets.urls')?.map(url => NitroConfiguration.interpolate(url))),
                nitro._communication.init(),
                nitro._avatar.init(),
                nitro._soundManager.init(),
                nitro._sessionDataManager.init()
            ]);

            await nitro._roomEngine.init();

            new GameMessageHandler(nitro._communication.connection);

            if(LegacyExternalInterface.available) LegacyExternalInterface.call('legacyTrack', 'authentication', 'authok', []);

            HabboWebTools.sendHeartBeat();

            setInterval(() => HabboWebTools.sendHeartBeat(), 10000);

            return nitro;
        }

        catch (err)
        {
            throw new Error(err);
        }
    }

    private setDefaultConfiguration(): void
    {
        GetTicker().maxFPS = NitroConfiguration.getValue<number>('system.fps.max', 24);

        NitroLogger.LOG_DEBUG = NitroConfiguration.getValue<boolean>('system.log.debug', true);
        NitroLogger.LOG_WARN = NitroConfiguration.getValue<boolean>('system.log.warn', false);
        NitroLogger.LOG_ERROR = NitroConfiguration.getValue<boolean>('system.log.error', false);
        NitroLogger.LOG_EVENTS = NitroConfiguration.getValue<boolean>('system.log.events', false);
        NitroLogger.LOG_PACKETS = NitroConfiguration.getValue<boolean>('system.log.packets', false);

        LandscapeRasterizer.LANDSCAPES_ENABLED = NitroConfiguration.getValue<boolean>('room.landscapes.enabled', true);
    }

    public getConfiguration<T>(key: string, value: T = null): T
    {
        return NitroConfiguration.getValue<T>(key, value);
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

    public get application(): Application
    {
        return this._application;
    }

    public get configuration(): IConfigurationManager
    {
        return this._configuration;
    }

    public get events(): IEventDispatcher
    {
        return this._events;
    }

    public get localization(): ILocalizationManager
    {
        return this._localization;
    }

    public get communication(): ICommunicationManager
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
        return this._application.renderer.width;
    }

    public get height(): number
    {
        return this._application.renderer.height;
    }

    public static get instance(): INitro
    {
        return this.INSTANCE || null;
    }
}
