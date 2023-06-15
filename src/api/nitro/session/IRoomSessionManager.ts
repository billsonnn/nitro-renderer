import { INitroCommunicationManager, INitroManager, IRoomSession } from '@/api'

export interface IRoomSessionManager extends INitroManager {
  communication: INitroCommunicationManager;
  viewerSession: IRoomSession;

  getSession(id: number): IRoomSession;

  createSession(roomId: number, password?: string): boolean;

  startSession(session: IRoomSession): boolean;

  removeSession(id: number, openLandingView?: boolean): void;
}
