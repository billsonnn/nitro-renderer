import { Rectangle } from 'pixi.js';
import { IConnection } from '../../core/communication/connections/IConnection';
import { IEventDispatcher } from '../../core/events/IEventDispatcher';
import { IRoomObject } from '../../room/object/IRoomObject';
import { IAvatarRenderManager } from '../avatar/IAvatarRenderManager';
import { IRoomEngine } from '../room/IRoomEngine';
import { IRoomSession } from '../session/IRoomSession';
import { IRoomSessionManager } from '../session/IRoomSessionManager';
import { ISessionDataManager } from '../session/ISessionDataManager';
import { RoomWidgetUpdateEvent } from './widget/events/RoomWidgetUpdateEvent';
import { RoomWidgetMessage } from './widget/messages/RoomWidgetMessage';

export interface IRoomWidgetHandlerContainer
{
    getFirstCanvasId(): number;
    getRoomViewRect(): Rectangle;
    checkFurniManipulationRights(roomId: number, objectId: number, category: number): boolean;
    isOwnerOfFurniture(roomObject: IRoomObject): boolean;
    processWidgetMessage(message: RoomWidgetMessage): RoomWidgetUpdateEvent;
    events: IEventDispatcher;
    connection: IConnection;
    roomEngine: IRoomEngine;
    avatarRenderManager: IAvatarRenderManager;
    roomSession: IRoomSession;
    roomSessionManager: IRoomSessionManager;
    sessionDataManager: ISessionDataManager;
}
