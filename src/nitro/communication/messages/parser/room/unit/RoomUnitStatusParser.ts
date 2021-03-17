import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { RoomUnitStatusAction } from './RoomUnitStatusAction';
import { RoomUnitStatusMessage } from './RoomUnitStatusMessage';

export class RoomUnitStatusParser implements IMessageParser
{
    private _statuses: RoomUnitStatusMessage[];

    public flush(): boolean
    {
        this._statuses  = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalUnits = wrapper.readInt();

        while(totalUnits > 0)
        {
            const status = this.parseStatus(wrapper);

            if(!status)
            {
                totalUnits--;

                continue;
            }

            this._statuses.push(status);

            totalUnits--;
        }

        return true;
    }

    public parseStatus(wrapper: IMessageDataWrapper): RoomUnitStatusMessage
    {
        if(!wrapper) return null;

        const unitId        = wrapper.readInt();
        const x               = wrapper.readInt();
        const y               = wrapper.readInt();
        const z               = parseFloat(wrapper.readString());
        const headDirection = ((wrapper.readInt() % 8) * 45);
        const direction     = ((wrapper.readInt() % 8) * 45);
        const actions       = wrapper.readString();

        let targetX     = 0;
        let targetY     = 0;
        let targetZ     = 0;
        let height      = 0;
        let canStandUp  = false;
        let didMove     = false;
        const isSlide     = false;

        if(actions)
        {
            const actionParts = actions.split('/');

            const totalActions = actionParts.length;

            const statusActions: RoomUnitStatusAction[] = [];

            if(totalActions)
            {
                for(let i = 0; i < totalActions; i++)
                {
                    const action = actionParts[i];

                    if(!action) continue;

                    const [ key, value, extra ] = action.split(' ');

                    if(!key || !value) continue;

                    switch(key)
                    {
                        case 'mv':
                            [ targetX, targetY, targetZ ] = value.split(',').map(a => parseFloat(a));

                            didMove = true;

                            break;
                        case 'sit': {
                            const sitHeight = parseFloat(value);

                            if(extra !== undefined) canStandUp = value === '1';

                            height = sitHeight;

                            break;
                        }
                        case 'lay': {
                            const layHeight = parseFloat(value);

                            height = layHeight;

                            break;
                        }
                    }

                    statusActions.push(new RoomUnitStatusAction(key, value));
                }
            }

            this._statuses.push(new RoomUnitStatusMessage(unitId, x, y, z, height, headDirection, direction, targetX, targetY, targetZ, didMove, canStandUp, statusActions));
        }
    }

    public get statuses(): RoomUnitStatusMessage[]
    {
        return this._statuses;
    }
}