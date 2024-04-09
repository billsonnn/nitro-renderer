import { AutoDetectOptions, Renderer, autoDetectRenderer } from 'pixi.js';

let renderer: Renderer = null;

export const PrepareRenderer = async (options: Partial<AutoDetectOptions>): Promise<Renderer> =>
{
    renderer = await autoDetectRenderer(options);

    renderer.events?.destroy();

    return renderer;
};

export const GetRenderer = () => renderer;
