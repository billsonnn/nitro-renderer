import { isWebGLSupported } from '@pixi/utils';
export class WebGL
{
    public static isWebGLAvailable(): boolean
    {
        return isWebGLSupported();
    }
}
