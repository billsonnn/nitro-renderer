import { Assets } from 'pixi.js';
import { AssetManager } from './AssetManager';

Assets.init();

const assetManager = new AssetManager();

export const GetAssetManager = () => assetManager;
