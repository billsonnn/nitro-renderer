import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GroupBuyDataParser implements IMessageParser
{
    private _groupCost: number;
    private _availableRooms: Map<number, string>;

    flush(): boolean
    {
        this._groupCost = 0;
        this._availableRooms = new Map();

        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupCost = wrapper.readInt();
        let availableRoomsCount = wrapper.readInt();

        while(availableRoomsCount > 0)
        {
            const roomId = wrapper.readInt();
            const roomName = wrapper.readString();
            wrapper.readBoolean();

            this._availableRooms.set(roomId, roomName);

            availableRoomsCount--;
        }
        return true;
    }

    public get groupCost(): number
    {
        return this._groupCost;
    }

    public get availableRooms(): Map<number, string>
    {
        return this._availableRooms;
    }
}
