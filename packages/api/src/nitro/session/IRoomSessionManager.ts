import { IRoomSession } from './IRoomSession';

export interface IRoomSessionManager
{
    init(): Promise<void>;
    getSession(id: number): IRoomSession;
    createSession(roomId: number, password?: string): boolean;
    startSession(session: IRoomSession): boolean;
    removeSession(id: number, openLandingView?: boolean): void;
    viewerSession: IRoomSession;
}
