import { Graphics } from 'pixi.js';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { PlaneBitmapData } from '../../utils/PlaneBitmapData';
import { FloorPlane } from './FloorPlane';
import { PlaneRasterizer } from './PlaneRasterizer';

export class FloorRasterizer extends PlaneRasterizer
{
    protected initializePlanes(): void
    {
        if(!this.data) return;

        const floors = this.data.floors;

        if(floors && floors.length) this._Str_24495(floors);
    }

    private _Str_24495(k: any): void
    {
        if(!k) return;

        for(const floorIndex in k)
        {
            const floor = k[floorIndex];

            if(!floor) continue;

            const id            = floor.id;
            const visualization = floor.visualizations;
            const plane         = new FloorPlane();

            this._Str_9137(plane, visualization);

            if(!this._Str_3453(id, plane)) plane.dispose();
        }
    }

    public render(canvas: Graphics, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this._Str_3491(id) as FloorPlane;

        if(!plane) plane = this._Str_3491(PlaneRasterizer.DEFAULT) as FloorPlane;

        if(!plane) return null;

        if(canvas)
        {
            canvas
                .beginFill(0xFFFFFF)
                .drawRect(0, 0, canvas.width, canvas.height)
                .endFill();
        }

        let graphic = plane.render(canvas, width, height, scale, normal, useTexture, offsetX, offsetY);

        if(graphic && (graphic !== canvas))
        {
            graphic = graphic.clone();

            if(!graphic) return null;
        }

        return new PlaneBitmapData(graphic, -1);
    }
}