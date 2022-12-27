import '@pixi/canvas-display';
import { BatchRenderer, extensions } from '@pixi/core';
import { Extract } from '@pixi/extract';
import '@pixi/graphics-extras';
import { InteractionManager } from '@pixi/interaction';
import { AppLoaderPlugin } from '@pixi/loaders';
import '@pixi/math-extras';
import '@pixi/mixin-cache-as-bitmap';
import '@pixi/mixin-get-child-by-name';
import '@pixi/mixin-get-global-position';
import '@pixi/polyfill';
import { TilingSpriteRenderer } from '@pixi/sprite-tiling';
import { SpritesheetLoader } from '@pixi/spritesheet';
import { TickerPlugin } from '@pixi/ticker';

extensions.add(
    BatchRenderer,
    Extract,
    TilingSpriteRenderer,
    InteractionManager,
    SpritesheetLoader,
    AppLoaderPlugin,
    TickerPlugin);
