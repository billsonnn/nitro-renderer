import { RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '../../../../../api';
import { RoomObjectFurnitureActionEvent, RoomObjectStateChangedEvent, RoomObjectWidgetRequestEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureJukeboxLogic extends FurnitureMultiStateLogic
{
    private _disposeEventsAllowed: boolean = false;
    private _isInitialized: boolean = false;
    private _currentState: number = -1;

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectFurnitureActionEvent.JUKEBOX_START,
            RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP,
            RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE,
            RoomObjectFurnitureActionEvent.JUKEBOX_INIT,
            RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    protected onDispose(): void
    {
        this.requestDispose();

        super.onDispose();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) !== 1) return;

        if(!this._isInitialized) this.requestInit();

        this.object.model.setValue<string>(RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM, RoomWidgetEnumItemExtradataParameter.JUKEBOX);

        if(message instanceof ObjectDataUpdateMessage)
        {
            const state = this.object.getState(0);

            if(state !== this._currentState)
            {
                this._currentState = state;

                if(state === 1) this.requestPlayList();
                else if(state === 0) this.requestStopPlaying();
            }
        }
    }

    private requestInit(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this._disposeEventsAllowed = true;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_INIT, this.object));

        this._isInitialized = true;
    }

    private requestPlayList(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this._disposeEventsAllowed = true;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_START, this.object));
    }

    private requestStopPlaying(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP, this.object));
    }

    private requestDispose(): void
    {
        if(!this._disposeEventsAllowed || !this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE, this.object));
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR, this.object));
        this.eventDispatcher.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, -1));
    }
}
