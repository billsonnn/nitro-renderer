import { Application } from '@pixi/app';
import { IAvatarRenderManager, ICommunicationManager, IConfigurationManager, IEventDispatcher, ILinkEventTracker, ILocalizationManager, IRoomCameraWidgetManager, IRoomEngine, ISessionDataManager, ISoundManager } from '../api';

export interface INitro
{
    init(): Promise<void>;
    getConfiguration<T>(key: string, value?: T): T;
    getLocalization(key: string): string;
    getLocalizationWithParameter(key: string, parameter: string, replacement: string): string;
    getLocalizationWithParameters(key: string, parameters: string[], replacements: string[]): string;
    addLinkEventTracker(tracker: ILinkEventTracker): void;
    removeLinkEventTracker(tracker: ILinkEventTracker): void;
    createLinkEvent(link: string): void;
    application: Application;
    configuration: IConfigurationManager;
    events: IEventDispatcher;
    localization: ILocalizationManager;
    communication: ICommunicationManager;
    avatar: IAvatarRenderManager;
    roomEngine: IRoomEngine;
    sessionDataManager: ISessionDataManager;
    cameraManager: IRoomCameraWidgetManager;
    soundManager: ISoundManager;
    width: number;
    height: number;
}
