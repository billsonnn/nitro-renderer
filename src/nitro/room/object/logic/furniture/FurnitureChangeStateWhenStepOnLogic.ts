import { IAssetData, RoomObjectVariable } from '../../../../../api';
import { RoomToObjectOwnAvatarMoveEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureChangeStateWhenStepOnLogic extends FurnitureLogic
{
    constructor()
    {
        super();

        this.onRoomToObjectOwnAvatarMoveEvent = this.onRoomToObjectOwnAvatarMoveEvent.bind(this);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(this.eventDispatcher) this.eventDispatcher.addEventListener(RoomToObjectOwnAvatarMoveEvent.ROAME_MOVE_TO, this.onRoomToObjectOwnAvatarMoveEvent);
    }

    public tearDown(): void
    {
        if(this.eventDispatcher) this.eventDispatcher.removeEventListener(RoomToObjectOwnAvatarMoveEvent.ROAME_MOVE_TO, this.onRoomToObjectOwnAvatarMoveEvent);

        super.tearDown();
    }

    private onRoomToObjectOwnAvatarMoveEvent(event: RoomToObjectOwnAvatarMoveEvent): void
    {
        if(!event || !this.object) return;

        const location = this.object.getLocation();
        const targetLocation = event.targetLocation;

        if(!targetLocation) return;

        let sizeX = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
        let sizeY = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);

        const direction = (((Math.floor(this.object.getDirection().x) + 45) % 360) / 90);

        if((direction === 1) || (direction === 3)) [sizeX, sizeY] = [sizeY, sizeX];

        if(((targetLocation.x >= location.x) && (targetLocation.x < (location.x + sizeX))) && ((targetLocation.y >= location.y) && (targetLocation.y < (location.y + sizeY))))
        {
            this.object.setState(1, 0);
        }
        else
        {
            this.object.setState(0, 0);
        }
    }
}
