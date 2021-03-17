import { utils } from 'pixi.js';

export class WebGL
{
    public static isWebGLAvailable(): boolean
    {
        return utils.isWebGLSupported();
    }
}