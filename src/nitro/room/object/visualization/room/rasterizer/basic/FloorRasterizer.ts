import { RenderTexture } from '@pixi/core';
import { IAssetPlane, IVector3D } from '../../../../../../../api';
import { PlaneTextureCache } from '../../../../../../../pixi-proxy';
import { PlaneBitmapData } from '../../utils';
import { FloorPlane } from './FloorPlane';
import { PlaneRasterizer } from './PlaneRasterizer';

export class FloorRasterizer extends PlaneRasterizer
{
    protected initializePlanes(): void
    {
        if(!this.data) return;

        const floors = this.data.planes;

        if(floors && floors.length) this.parseFloors(floors);
    }

    private parseFloors(k: IAssetPlane[]): void
    {
        if(!k) return;

        for(const floorIndex in k)
        {
            const floor = k[floorIndex];

            if(!floor) continue;

            const id = floor.id;
            const visualization = floor.visualizations;
            const plane = new FloorPlane();

            this.parseVisualizations(plane, visualization);

            if(!this.addPlane(id, plane)) plane.dispose();
        }
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this.getPlane(id) as FloorPlane;

        if(!plane) plane = this.getPlane(PlaneRasterizer.DEFAULT) as FloorPlane;

        if(!plane) return null;

        if(canvas) textureCache.clearAndFillRenderTexture(canvas);

        let graphic = plane.render(planeId, textureCache, canvas, width, height, scale, normal, useTexture, offsetX, offsetY);

        if(graphic && (graphic !== canvas))
        {
            graphic = new RenderTexture(graphic.baseTexture);

            if(!graphic) return null;
        }

        return new PlaneBitmapData(graphic, -1);
    }
}
