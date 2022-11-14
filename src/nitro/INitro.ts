import { Application } from '@pixi/app';
import { IAvatarRenderManager, IEventDispatcher, ILinkEventTracker, INitroCommunicationManager, INitroCore, INitroLocalizationManager, IRoomCameraWidgetManager, IRoomEngine, IRoomManager, IRoomSessionManager, ISessionDataManager, ISoundManager } from '../api';

export interface INitro
{
    init(): void;
    dispose(): void;
    getConfiguration<T>(key: string, value?: T): T;
    getLocalization(key: string): string;
    getLocalizationWithParameter(key: string, parameter: string, replacement: string): string;
    getLocalizationWithParameters(key: string, parameters: string[], replacements: string[]): string;
    addLinkEventTracker(tracker: ILinkEventTracker): void;
    removeLinkEventTracker(tracker: ILinkEventTracker): void;
    createLinkEvent(link: string): void;
    application: Application;
    core: INitroCore;
    events: IEventDispatcher;
    localization: INitroLocalizationManager;
    communication: INitroCommunicationManager;
    avatar: IAvatarRenderManager;
    roomEngine: IRoomEngine;
    sessionDataManager: ISessionDataManager;
    roomSessionManager: IRoomSessionManager;
    roomManager: IRoomManager;
    cameraManager: IRoomCameraWidgetManager;
    soundManager: ISoundManager;
    width: number;
    height: number;
    isReady: boolean;
    isDisposed: boolean;
}
