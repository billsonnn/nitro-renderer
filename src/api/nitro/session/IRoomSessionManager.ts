import { INitroManager } from '../../common';
import { INitroCommunicationManager } from '../communication';
import { IRoomSession } from './IRoomSession';

export interface IRoomSessionManager extends INitroManager
{
    getSession(id: number): IRoomSession;
    createSession(roomId: number, password?: string): boolean;
    startSession(session: IRoomSession): boolean;
    removeSession(id: number, openLandingView?: boolean): void;
    communication: INitroCommunicationManager;
    viewerSession: IRoomSession;
}
