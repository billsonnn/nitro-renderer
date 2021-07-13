import { CanvasRenderer } from '@pixi/canvas-renderer';
import { IRendererPlugin } from '@pixi/core';

export class CanvasTileRenderer implements IRendererPlugin
{
    renderer: CanvasRenderer;
    tileAnim = [0, 0];
    dontUseTransform = false;

    constructor(renderer: CanvasRenderer, options: any = null)
    {
        this.renderer = renderer;
        this.tileAnim = [0, 0];
    }

    public destroy(): void
    {

    }
}

CanvasRenderer.registerPlugin('tilemap', CanvasTileRenderer);
