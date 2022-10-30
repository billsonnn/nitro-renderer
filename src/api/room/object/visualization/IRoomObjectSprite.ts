import { Filter, Resource, Texture } from '@pixi/core';
import { Container } from '@pixi/display';

export interface IRoomObjectSprite
{
    id: number;
    name: string;
    type: string;
    spriteType: number;
    texture: Texture<Resource>;
    container: Container;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    flipH: boolean;
    flipV: boolean;
    direction: number;
    alpha: number;
    blendMode: number;
    color: number;
    relativeDepth: number;
    varyingDepth: boolean;
    libraryAssetName: string;
    clickHandling: boolean;
    visible: boolean;
    tag: string;
    posture: string;
    alphaTolerance: number;
    filters: Filter[];
    updateCounter: number;
    updateContainer: boolean;
}
