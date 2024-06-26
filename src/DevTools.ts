import { GetRoomEngine, RoomEngine } from '@nitrots/room';
import { GetRenderer, GetTexturePool } from '@nitrots/utils';
import { Texture, TextureGCSystem, TextureSource } from 'pixi.js';
export { };

declare global
{
	interface Window
	{
		NitroDevTools?:
		{
            roomEngine(): RoomEngine;
			textureCache(): TextureSource<any>[];
			texturePool(): { [index: string]: { [index: string]: Texture[] } };
			textureGC(): TextureGCSystem;
		};
	}
}

window.NitroDevTools = {
    roomEngine: () => GetRoomEngine(),
    textureCache: () => GetRenderer().texture.managedTextures,
    texturePool: () => GetTexturePool().textures,
    textureGC: () => GetRenderer().textureGC
};
