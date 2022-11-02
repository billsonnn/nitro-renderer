import { Application } from '@pixi/app';
import { Ticker } from '@pixi/ticker';
import { IEventDispatcher, ILinkEventTracker, INitroCommunicationManager, INitroCore, IRoomCameraWidgetManager, IRoomManager, IRoomSessionManager, ISessionDataManager, IWorkerEventTracker } from '../api';
import { IAvatarRenderManager } from './avatar/IAvatarRenderManager';
import { INitroLocalizationManager } from './localization/INitroLocalizationManager';
import { IRoomEngine } from './room/IRoomEngine';
import { ISoundManager } from './sound/ISoundManager';

export interface INitro
{
    init(): void;
    dispose(): void;
    getConfiguration<T>(key: string, value?: T): T;
    getLocalization(key: string): string;
    getLocalizationWithParameter(key: string, parameter: string, replacement: string): string;
    getLocalizationWithParameters(key: string, parameters: string[], replacements: string[]): string;
    addWorkerEventTracker(tracker: IWorkerEventTracker): void;
    removeWorkerEventTracker(tracker: IWorkerEventTracker): void;
    createWorkerEvent(message: { [index: string]: any }): void;
    sendWorkerEvent(message: { [index: string]: any }): void;
    addLinkEventTracker(tracker: ILinkEventTracker): void;
    removeLinkEventTracker(tracker: ILinkEventTracker): void;
    createLinkEvent(link: string): void;
    setWorker(val: Worker): void;
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
    ticker: Ticker;
    time: number;
    isReady: boolean;
    isDisposed: boolean;
}
