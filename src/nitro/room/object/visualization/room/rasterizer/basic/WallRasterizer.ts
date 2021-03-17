import { Graphics } from 'pixi.js';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { PlaneBitmapData } from '../../utils/PlaneBitmapData';
import { PlaneRasterizer } from './PlaneRasterizer';
import { WallPlane } from './WallPlane';

export class WallRasterizer extends PlaneRasterizer
{
    protected initializePlanes(): void
    {
        if(!this.data) return;

        const walls = this.data.walls;

        if(walls && walls.length) this._Str_24495(walls);
    }

    private _Str_24495(k: any): void
    {
        if(!k) return;

        for(const wallIndex in k)
        {
            const wall = k[wallIndex];

            if(!wall) continue;

            const id            = wall.id;
            const visualization = wall.visualizations;
            const plane         = new WallPlane();

            this._Str_9137(plane, visualization);

            if(!this._Str_3453(id, plane)) plane.dispose();
        }
    }

    public render(canvas: Graphics, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this._Str_3491(id) as WallPlane;

        if(!plane) plane = this._Str_3491(PlaneRasterizer.DEFAULT) as WallPlane;

        if(!plane) return null;

        if(canvas)
        {
            const rectangle = canvas.getBounds();

            canvas.clear();

            canvas.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        }

        let graphic = plane.render(canvas, width, height, scale, normal, useTexture);

        if(graphic && (graphic !== canvas))
        {
            graphic = graphic.clone();

            if(!graphic) return null;
        }

        return new PlaneBitmapData(graphic, -1);
    }

    public getTextureIdentifier(k: number, _arg_2: IVector3D): string
    {
        if(_arg_2)
        {
            return `${ k }_${ _arg_2.x }_${ _arg_2.y }_${ _arg_2.z }`;
        }

        return super.getTextureIdentifier(k, _arg_2);
    }
}
