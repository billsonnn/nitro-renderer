import * as PIXI from 'pixi.js';
window.PIXI = PIXI;

export class CanvasTileRenderer
{
    renderer: PIXI.Renderer;
    tileAnim = [0, 0];
    dontUseTransform = false;

    constructor(renderer: PIXI.Renderer)
    {
        this.renderer = renderer;
        this.tileAnim = [0, 0];
    }
}
const cr = (window.PIXI as any).CanvasRenderer;
if(cr)
{
    console.warn('REGISTER');
    cr.registerPlugin('tilemap', CanvasTileRenderer);
}
