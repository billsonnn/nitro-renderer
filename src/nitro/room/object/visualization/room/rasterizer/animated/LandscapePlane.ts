import { RenderTexture } from '@pixi/core';
import { IVector3D, Vector3d } from '../../../../../../../api';
import { PlaneTextureCache } from '../../../../../../../pixi-proxy';
import { Plane } from '../basic';

export class LandscapePlane extends Plane
{
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    private _width: number = 0;
    private _height: number = 0;

    public isStatic(scale: number): boolean
    {
        const visualization = this.getPlaneVisualization(scale);

        if(visualization) return !visualization.hasAnimationLayers;

        return super.isStatic(scale);
    }

    public initializeDimensions(width: number, height: number): void
    {
        if(width < 0) width = 0;

        if(height < 0) height = 0;

        if((width !== this._width) || (height !== this._height))
        {
            this._width = width;
            this._height = height;
        }
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number, maxX: number, maxY: number, timeSinceStartMs: number): RenderTexture
    {
        const visualization = this.getPlaneVisualization(scale);

        if(!visualization || !visualization.geometry) return null;

        const _local_13 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_14 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 1));
        const _local_15 = visualization.geometry.getScreenPoint(new Vector3d(0, 1, 0));

        if(_local_13 && _local_14 && _local_15)
        {
            width = Math.round(Math.abs((((_local_13.x - _local_15.x) * width) / visualization.geometry.scale)));
            height = Math.round(Math.abs((((_local_13.y - _local_14.y) * height) / visualization.geometry.scale)));

            const renderOffsetX = Math.trunc(offsetX * Math.abs((_local_13.x - _local_15.x)));
            const renderOffsetY = Math.trunc(offsetY * Math.abs((_local_13.y - _local_14.y)));
            const renderMaxX = Math.trunc(maxX * Math.abs((_local_13.x - _local_15.x)));
            const renderMaxY = Math.trunc(maxY * Math.abs((_local_13.y - _local_14.y)));

            return visualization.render(planeId, textureCache, canvas, width, height, normal, useTexture, renderOffsetX, renderOffsetY, renderMaxX, renderMaxY, maxX, maxY, timeSinceStartMs);
        }

        return null;
    }
}
