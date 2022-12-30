import { IConnection, IRoomHandlerListener } from '../../../api';
import { RoomSessionPetPackageEvent } from '../../../events';
import { OpenPetPackageRequestedMessageEvent, OpenPetPackageResultMessageEvent } from '../../communication';
import { BaseHandler } from './BaseHandler';

export class PetPackageHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new OpenPetPackageRequestedMessageEvent(this.onOpenPetPackageRequested.bind(this)));
        connection.addMessageEvent(new OpenPetPackageResultMessageEvent(this.onOpenPetPackageResult.bind(this)));
    }

    private onOpenPetPackageRequested(event: OpenPetPackageRequestedMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        this.listener.events.dispatchEvent(new RoomSessionPetPackageEvent(RoomSessionPetPackageEvent.RSOPPE_OPEN_PET_PACKAGE_REQUESTED, session, parser.objectId, parser.figureData, 0, null));
    }

    private onOpenPetPackageResult(event: OpenPetPackageResultMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        this.listener.events.dispatchEvent(new RoomSessionPetPackageEvent(RoomSessionPetPackageEvent.RSOPPE_OPEN_PET_PACKAGE_RESULT, session, parser.objectId, null, parser.nameValidationStatus, parser.nameValidationInfo));
    }
}
