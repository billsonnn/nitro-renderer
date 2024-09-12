import { GetRoomEngine, RoomEngine } from '@nitrots/room';
export { };

declare global
{
	interface Window
	{
		NitroDevTools?:
		{
            roomEngine: RoomEngine;
		};
	}
}

window.NitroDevTools = {
    roomEngine: GetRoomEngine()
};
