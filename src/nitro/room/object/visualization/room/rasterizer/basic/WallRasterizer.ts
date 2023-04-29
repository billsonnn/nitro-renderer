import { RenderTexture } from '@pixi/core';
import { IAssetPlane, IVector3D } from '../../../../../../../api';
import { PlaneTextureCache } from '../../../../../../../pixi-proxy';
import { PlaneBitmapData } from '../../utils';
import { PlaneRasterizer } from './PlaneRasterizer';
import { WallPlane } from './WallPlane';

export class WallRasterizer extends PlaneRasterizer
{
    protected initializePlanes(): void
    {
        if(!this.data) return;

        const walls = this.data.planes;

        if(walls && walls.length) this.parseWalls(walls);
    }

    private parseWalls(k: IAssetPlane[]): void
    {
        if(!k) return;

        for(const wallIndex in k)
        {
            const wall = k[wallIndex];

            if(!wall) continue;

            const id = wall.id;
            const visualization = wall.visualizations;
            const plane = new WallPlane();

            this.parseVisualizations(plane, visualization);

            if(!this.addPlane(id, plane)) plane.dispose();
        }
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this.getPlane(id) as WallPlane;

        if(!plane) plane = this.getPlane(PlaneRasterizer.DEFAULT) as WallPlane;

        if(!plane) return null;

        if(canvas) textureCache.clearAndFillRenderTexture(canvas);

        let graphic = plane.render(planeId, textureCache, canvas, width, height, scale, normal, useTexture);

        if(graphic && (graphic !== canvas))
        {
            graphic = new RenderTexture(graphic.baseTexture);

            if(!graphic) return null;
        }

        return new PlaneBitmapData(graphic, -1);
    }

    public getTextureIdentifier(k: number, normal: IVector3D): string
    {
        if(normal)
        {
            return `${k}_${normal.x}_${normal.y}_${normal.z}`;
        }

        return super.getTextureIdentifier(k, normal);
    }
}
