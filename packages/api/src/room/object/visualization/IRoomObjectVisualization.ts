import { Rectangle, Texture } from 'pixi.js';
import { IRoomGeometry } from '../../IRoomGeometry';
import { IRoomObject } from '../IRoomObject';
import { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualization
{
    initialize(data: IObjectVisualizationData): boolean;
    dispose(): void;
    update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void;
    getBoundingRectangle(): Rectangle;
    getImage(): Texture;
    instanceId: number;
    object: IRoomObject;
    image: Texture;
    updateSpriteCounter: number;
}
