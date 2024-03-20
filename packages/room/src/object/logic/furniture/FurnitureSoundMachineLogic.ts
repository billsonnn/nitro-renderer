import { RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '@nitrots/api';
import { RoomObjectFurnitureActionEvent } from '@nitrots/events';
import { ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureSoundMachineLogic extends FurnitureMultiStateLogic
{
    private _disposeEventsAllowed: boolean = false;
    private _isInitialized: boolean = false;
    private _currentState: number = -1;

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_START,
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP,
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE,
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public dispose(): void
    {
        this.requestDispose();

        super.dispose();
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

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT, this.object));

        this._isInitialized = true;
    }

    private requestPlayList(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this._disposeEventsAllowed = true;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_START, this.object));
    }

    private requestStopPlaying(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP, this.object));
    }

    private requestDispose(): void
    {
        if(!this._disposeEventsAllowed || !this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE, this.object));
    }
}
