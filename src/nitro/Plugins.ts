import { AccessibilityManager } from '@pixi/accessibility';
import { Application } from '@pixi/app';
import { CompressedTextureLoader, DDSLoader, KTXLoader } from '@pixi/compressed-textures';
import { BatchRenderer, Renderer } from '@pixi/core';
import { Extract } from '@pixi/extract';
import { InteractionManager } from '@pixi/interaction';
import { AppLoaderPlugin, Loader } from '@pixi/loaders';
import '@pixi/mixin-get-child-by-name';
import { ParticleRenderer } from '@pixi/particle-container';
import { Prepare } from '@pixi/prepare';
import { TilingSpriteRenderer } from '@pixi/sprite-tiling';
import { SpritesheetLoader } from '@pixi/spritesheet';
import { BitmapFontLoader } from '@pixi/text-bitmap';
import { TickerPlugin } from '@pixi/ticker';

Renderer.registerPlugin('accessibility', AccessibilityManager);
Renderer.registerPlugin('extract', Extract);
Renderer.registerPlugin('interaction', InteractionManager);
Renderer.registerPlugin('particle', ParticleRenderer);
Renderer.registerPlugin('prepare', Prepare);
Renderer.registerPlugin('batch', BatchRenderer);
Renderer.registerPlugin('tilingSprite', TilingSpriteRenderer);

Loader.registerPlugin(BitmapFontLoader);
Loader.registerPlugin(CompressedTextureLoader);
Loader.registerPlugin(DDSLoader);
Loader.registerPlugin(KTXLoader);
Loader.registerPlugin(SpritesheetLoader);

Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);
