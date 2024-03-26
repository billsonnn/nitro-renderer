import { GetRoomEngine, RoomEngine } from '@nitrots/room';
import { GetRenderer } from '@nitrots/utils';
import { TextureSource } from 'pixi.js';
export { };

declare global
{
	interface Window
	{
		NitroDevTools?:
		{
            getRoomEngine(): RoomEngine;
			showTextureCache(): TextureSource<any>[];
		};
	}
}

window.NitroDevTools = {
    getRoomEngine: () => GetRoomEngine(),
    showTextureCache: () => GetRenderer().texture.managedTextures,
};
