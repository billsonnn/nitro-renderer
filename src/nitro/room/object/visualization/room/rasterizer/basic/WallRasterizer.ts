import { Graphics } from '@pixi/graphics';
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

        if(walls && walls.length) this.parseWalls(walls);
    }

    private parseWalls(k: any): void
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

    public render(canvas: Graphics, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this.getPlane(id) as WallPlane;

        if(!plane) plane = this.getPlane(PlaneRasterizer.DEFAULT) as WallPlane;

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

    public getTextureIdentifier(k: number, normal: IVector3D): string
    {
        if(normal)
        {
            return `${ k }_${ normal.x }_${ normal.y }_${ normal.z }`;
        }

        return super.getTextureIdentifier(k, normal);
    }
}
