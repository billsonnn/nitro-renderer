import { INitroCommunicationManager, IRoomEngine, IRoomHandlerListener, IRoomSession, IRoomSessionManager } from '../../api';
import { NitroManager } from '../../core';
import { RoomEngineEvent, RoomSessionEvent } from '../../events';
import { BaseHandler, GenericErrorHandler, PetPackageHandler, PollHandler, RoomChatHandler, RoomDataHandler, RoomDimmerPresetsHandler, RoomPermissionsHandler, RoomPresentHandler, RoomSessionHandler, RoomUsersHandler, WordQuizHandler } from './handler';
import { RoomSession } from './RoomSession';

export class RoomSessionManager extends NitroManager implements IRoomSessionManager, IRoomHandlerListener
{
    private _communication: INitroCommunicationManager;
    private _roomEngine: IRoomEngine;

    private _handlers: BaseHandler[];
    private _sessions: Map<string, IRoomSession>;
    private _pendingSession: IRoomSession;

    private _sessionStarting: boolean;
    private _viewerSession: IRoomSession;

    constructor(communication: INitroCommunicationManager, roomEngine: IRoomEngine)
    {
        super();

        this._communication = communication;
        this._roomEngine = roomEngine;

        this._handlers = [];
        this._sessions = new Map();
        this._pendingSession = null;

        this._sessionStarting = false;
        this._viewerSession = null;

        this.onRoomEngineEvent = this.onRoomEngineEvent.bind(this);
    }

    protected onInit(): void
    {
        this.createHandlers();

        this.processPendingSession();

        this._roomEngine.events.addEventListener(RoomEngineEvent.ENGINE_INITIALIZED, this.onRoomEngineEvent);
    }

    protected onDispose(): void
    {
        this._roomEngine.events.removeEventListener(RoomEngineEvent.ENGINE_INITIALIZED, this.onRoomEngineEvent);

        super.onDispose();
    }

    private createHandlers(): void
    {
        const connection = this._communication && this._communication.connection;

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

    public onRoomEngineEvent(event: RoomEngineEvent): void
    {
        this.processPendingSession();
    }

    private processPendingSession(): void
    {
        if(!this._pendingSession || !this._roomEngine.ready) return;

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
        if(!this._roomEngine.ready)
        {
            this._pendingSession = roomSession;

            return false;
        }

        this._sessionStarting = true;

        if(this._sessions.get(this.getRoomId(roomSession.roomId)))
        {
            this.removeSession(roomSession.roomId, false);
        }

        roomSession.setConnection(this._communication.connection);

        this._sessions.set(this.getRoomId(roomSession.roomId), roomSession);

        this.events.dispatchEvent(new RoomSessionEvent(RoomSessionEvent.CREATED, roomSession));

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

        this.events.dispatchEvent(new RoomSessionEvent(RoomSessionEvent.STARTED, session));

        this.setHandlers(session);

        return true;
    }

    public removeSession(id: number, openLandingView: boolean = true): void
    {
        const session = this.getSession(id);

        if(!session) return;

        this._sessions.delete(this.getRoomId(id));

        this.events.dispatchEvent(new RoomSessionEvent(RoomSessionEvent.ENDED, session, openLandingView));

        session.dispose();
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

    public get communication(): INitroCommunicationManager
    {
        return this._communication;
    }

    public get roomEngine(): IRoomEngine
    {
        return this._roomEngine;
    }

    public get viewerSession(): IRoomSession
    {
        return this._viewerSession;
    }
}
