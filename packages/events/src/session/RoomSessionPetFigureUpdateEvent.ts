import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetFigureUpdateEvent extends RoomSessionEvent
{
    public static PET_FIGURE_UPDATE: string = 'RSPFUE_PET_FIGURE_UPDATE';

    private _petId: number;
    private _figure: string;

    constructor(roomSession: IRoomSession, id: number, figure: string)
    {
        super(RoomSessionPetFigureUpdateEvent.PET_FIGURE_UPDATE, roomSession);

        this._petId = id;
        this._figure = figure;
    }

    public get id(): number
    {
        return this._petId;
    }

    public get figure(): string
    {
        return this._figure;
    }
}
