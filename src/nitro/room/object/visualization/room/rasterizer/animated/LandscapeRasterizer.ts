import { Graphics } from '@pixi/graphics';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Nitro } from '../../../../../../Nitro';
import { PlaneBitmapData } from '../../utils/PlaneBitmapData';
import { Randomizer } from '../../utils/Randomizer';
import { PlaneMaterial } from '../basic/PlaneMaterial';
import { PlaneRasterizer } from '../basic/PlaneRasterizer';
import { PlaneVisualizationLayer } from '../basic/PlaneVisualizationLayer';
import { LandscapePlane } from './LandscapePlane';

export class LandscapeRasterizer extends PlaneRasterizer
{
    private static UPDATE_INTERVAL: number = 500;

    private _landscapeWidth: number = 0;
    private _landscapeHeight: number = 0;

    public initializeDimensions(k: number, _arg_2: number): boolean
    {
        if(k < 0) k = 0;

        if(_arg_2 < 0) _arg_2 = 0;

        this._landscapeWidth = k;
        this._landscapeHeight = _arg_2;

        return true;
    }

    protected initializePlanes(): void
    {
        if(!this.data) return;

        const landscapes = this.data.landscapes;

        if(landscapes && landscapes.length) this.parseLandscapes(landscapes);
    }

    private parseLandscapes(k: any): void
    {
        if(!k) return;

        const randomNumber = Math.trunc((Math.random() * 654321));

        for(const landscapeIndex in k)
        {
            const landscape = k[landscapeIndex];

            if(!landscape) continue;

            const id = landscape.id;
            const visualizations = landscape.animatedVisualizations;

            const plane = new LandscapePlane();

            for(const visualization of visualizations)
            {
                if(!visualization) continue;

                const size = visualization.size;

                let horizontalAngle = LandscapePlane.HORIZONTAL_ANGLE_DEFAULT;
                let verticalAngle = LandscapePlane.VERTICAL_ANGLE_DEFAULT;

                if(visualization.horizontalAngle) horizontalAngle = visualization.horizontalAngle;
                if(visualization.verticalAngle) verticalAngle = visualization.verticalAngle;

                const basicLayers = visualization.layers;
                const animatedLayers = visualization.animationLayers;
                const totalBasicLayers = ((basicLayers && basicLayers.length) || 0);
                const totalAnimatedLayers = ((animatedLayers && animatedLayers.length) || 0);
                const totalLayers = (totalBasicLayers + totalAnimatedLayers);

                const planeVisualization = plane.createPlaneVisualization(size, (totalLayers || 0), this.getGeometry(size, horizontalAngle, verticalAngle));

                if(planeVisualization)
                {
                    Randomizer.setSeed(randomNumber);

                    let layerId = 0;

                    if(totalBasicLayers)
                    {
                        while(layerId < basicLayers.length)
                        {
                            const layer = basicLayers[layerId];

                            if(layer)
                            {
                                let material: PlaneMaterial = null;
                                let align: number = PlaneVisualizationLayer.ALIGN_DEFAULT;
                                let color: number = LandscapePlane.DEFAULT_COLOR;
                                let offset: number = PlaneVisualizationLayer.DEFAULT_OFFSET;

                                if(layer.materialId) material = this.getMaterial(layer.materialId);

                                if(layer.color) color = layer.color;

                                if(layer.offset) offset = layer.offset;

                                if(layer.align)
                                {
                                    if(layer.align === 'bottom')
                                    {
                                        align = PlaneVisualizationLayer.ALIGN_BOTTOM;
                                    }

                                    else if(layer.align === 'top') align = PlaneVisualizationLayer.ALIGN_TOP;
                                }

                                planeVisualization.setLayer(layerId, material, color, align, offset);
                            }

                            layerId++;
                        }
                    }

                    layerId = 0;

                    if(totalAnimatedLayers)
                    {
                        const animationItems: {}[] = [];

                        while(layerId < animatedLayers.length)
                        {
                            const layer = animatedLayers[layerId];

                            if(layer)
                            {
                                const items = layer.animationItems;

                                if(items && items.length)
                                {
                                    for(const item of items)
                                    {
                                        if(item)
                                        {
                                            const id = item.id;
                                            const assetId = item.assetId;
                                            const x = this.getCoordinateValue(item.x || '', item.randomX || '');
                                            const y = this.getCoordinateValue(item.y || '', item.randomY || '');
                                            const speedX = item.speedX ? item.speedX / Nitro.instance.getConfiguration<number>('system.animation.fps') : 0;
                                            const speedY = item.speedY ? item.speedY / Nitro.instance.getConfiguration<number>('system.animation.fps') : 0;

                                            animationItems.push({
                                                asset: assetId,
                                                x,
                                                y,
                                                speedX,
                                                speedY
                                            });
                                        }
                                    }
                                }
                            }

                            layerId++;
                        }

                        planeVisualization.setAnimationLayer(layerId, animationItems, this.assetCollection);
                    }
                }
            }

            if(!this.addPlane(id, plane)) plane.dispose();
        }
    }

    private getCoordinateValue(k: string, _arg_2: string): number
    {
        let _local_3 = 0;

        if((k.length > 0))
        {
            if(k.charAt((k.length - 1)) === '%')
            {
                k = k.substr(0, (k.length - 1));

                _local_3 = (parseFloat(k) / 100);
            }
        }

        if((_arg_2.length > 0))
        {
            const _local_4 = 10000;
            const _local_5 = Randomizer.getValues(1, 0, _local_4);
            const _local_6 = (_local_5[0] / _local_4);

            if(_arg_2.charAt((_arg_2.length - 1)) === '%')
            {
                _arg_2 = _arg_2.substr(0, (_arg_2.length - 1));

                _local_3 = (_local_3 + ((_local_6 * parseFloat(_arg_2)) / 100));
            }
        }

        return _local_3;
    }

    public render(canvas: Graphics, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this.getPlane(id) as LandscapePlane;

        if(!plane) plane = this.getPlane(LandscapeRasterizer.DEFAULT) as LandscapePlane;

        if(!plane) return null;

        if(canvas)
        {
            canvas.clear();
        }

        let graphic = plane.render(canvas, width, height, scale, normal, useTexture, offsetX, offsetY, maxX, maxY, timeSinceStartMs);

        if(graphic && (graphic !== canvas))
        {
            graphic = graphic.clone();

            if(!graphic) return null;
        }

        let planeBitmapData: PlaneBitmapData = null;

        if(!plane.isStatic(scale) && (LandscapeRasterizer.UPDATE_INTERVAL > 0))
        {
            planeBitmapData = new PlaneBitmapData(graphic, ((Math.round((timeSinceStartMs / LandscapeRasterizer.UPDATE_INTERVAL)) * LandscapeRasterizer.UPDATE_INTERVAL) + LandscapeRasterizer.UPDATE_INTERVAL));
        }
        else
        {
            planeBitmapData = new PlaneBitmapData(graphic, -1);
        }

        return planeBitmapData;
    }

    public getTextureIdentifier(k: number, _arg_2: IVector3D): string
    {
        if(_arg_2)
        {
            if(_arg_2.x < 0) return (k + '_0');

            return (k + '_1');
        }

        return super.getTextureIdentifier(k, _arg_2);
    }
}
