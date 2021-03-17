import { IConnection } from '../../core/communication/connections/IConnection';
import { LoadGameUrlEvent } from '../communication/messages/incoming/game/LoadGameUrlEvent';
import { LegacyExternalInterface } from '../externalInterface/LegacyExternalInterface';

export class GameMessageHandler
{
    constructor(connection: IConnection)
    {
        connection.addMessageEvent(new LoadGameUrlEvent(this.onLoadGameUrl.bind(this)));
    }

    private onLoadGameUrl(event: LoadGameUrlEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        LegacyExternalInterface.callGame('showGame', parser.url);
    }
}