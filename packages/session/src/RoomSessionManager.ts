import { IRoomHandlerListener, IRoomSession, IRoomSessionManager } from '@nitrots/api';
import { GetCommunication } from '@nitrots/communication';
import { GetEventDispatcher, RoomSessionEvent } from '@nitrots/events';
import { RoomSession } from './RoomSession';
import { BaseHandler, GenericErrorHandler, PetPackageHandler, PollHandler, RoomChatHandler, RoomDataHandler, RoomDimmerPresetsHandler, RoomPermissionsHandler, RoomPresentHandler, RoomSessionHandler, RoomUsersHandler, WordQuizHandler } from './handler';

export class RoomSessionManager implements IRoomSessionManager, IRoomHandlerListener
{
    private _handlers: BaseHandler[] = [];
    private _sessions: Map<string, IRoomSession> = new Map();
    private _pendingSession: IRoomSession = null;

    private _sessionStarting: boolean = false;
    private _viewerSession: IRoomSession = null;

    public async init(): Promise<void>
    {
        this.createHandlers();
        this.processPendingSession();
    }

    private createHandlers(): void
    {
        const connection = GetCommunication().connection;

        if(!connection) return;

        this._handlers.push(
            new RoomChatHandler(connection, this),
            new RoomDataHandler(connection, this),
            new RoomDimmerPresetsHandler(connection, this),
            new RoomPermissionsHandler(connection, this),
            new RoomSessionHandler(connection, this),
            new RoomUsersHandler(connection, this),
            new RoomPresentHandler(connection, this),
            new GenericErrorHandler(connection, this),
            new WordQuizHandler(connection, this),
            new PollHandler(connection, this),
            new PetPackageHandler(connection, this),
        );
    }

    private setHandlers(session: IRoomSession): void
    {
        if(!this._handlers || !this._handlers.length) return;

        for(const handler of this._handlers)
        {
            if(!handler) continue;

            handler.setRoomId(session.roomId);
        }
    }

    private processPendingSession(): void
    {
        if(!this._pendingSession) return;

        this.addSession(this._pendingSession);

        this._pendingSession = null;
    }

    public getSession(id: number): IRoomSession
    {
        const existing = this._sessions.get(this.getRoomId(id));

        if(!existing) return null;

        return existing;
    }

    public createSession(roomId: number, password: string = null): boolean
    {
        const session = new RoomSession();

        session.roomId = roomId;
        session.password = password;

        return this.addSession(session);
    }

    private addSession(roomSession: IRoomSession): boolean
    {
        this._sessionStarting = true;

        if(this._sessions.get(this.getRoomId(roomSession.roomId))) this.removeSession(roomSession.roomId, false);

        this._sessions.set(this.getRoomId(roomSession.roomId), roomSession);

        GetEventDispatcher().dispatchEvent(new RoomSessionEvent(RoomSessionEvent.CREATED, roomSession));

        this._viewerSession = roomSession;

        this.startSession(this._viewerSession);

        return true;
    }

    public startSession(session: IRoomSession): boolean
    {
        if(session.state === RoomSessionEvent.STARTED) return false;

        this._sessionStarting = false;

        if(!session.start())
        {
            this.removeSession(session.roomId);

            return false;
        }

        GetEventDispatcher().dispatchEvent(new RoomSessionEvent(RoomSessionEvent.STARTED, session));

        this.setHandlers(session);

        return true;
    }

    public removeSession(id: number, openLandingView: boolean = true): void
    {
        const session = this.getSession(id);

        if(!session) return;

        this._sessions.delete(this.getRoomId(id));

        GetEventDispatcher().dispatchEvent(new RoomSessionEvent(RoomSessionEvent.ENDED, session, openLandingView));
    }

    public sessionUpdate(id: number, type: string): void
    {
        const session = this.getSession(id);

        if(!session) return;

        switch(type)
        {
            case RoomSessionHandler.RS_CONNECTED:
                return;
            case RoomSessionHandler.RS_READY:
                return;
            case RoomSessionHandler.RS_DISCONNECTED:
                this.removeSession(id);
                return;
        }
    }

    public sessionReinitialize(fromRoomId: number, toRoomId: number): void
    {
        const existing = this.getSession(fromRoomId);

        if(!existing) return;

        this._sessions.delete(this.getRoomId(fromRoomId));

        existing.reset(toRoomId);

        this._sessions.set(this.getRoomId(toRoomId), existing);

        this.setHandlers(existing);
    }

    private getRoomId(id: number): string
    {
        return 'hard_coded_room_id';
    }

    public get viewerSession(): IRoomSession
    {
        return this._viewerSession;
    }
}
