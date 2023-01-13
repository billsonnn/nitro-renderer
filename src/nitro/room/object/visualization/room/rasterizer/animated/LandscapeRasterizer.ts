import { RenderTexture } from '@pixi/core';
import { IAssetPlane, IAssetPlaneVisualizationAnimatedLayer, IAssetPlaneVisualizationLayer, IVector3D } from '../../../../../../../api';
import { PlaneTextureCache } from '../../../../../../../pixi-proxy';
import { PlaneBitmapData, Randomizer } from '../../utils';
import { PlaneMaterial, PlaneRasterizer, PlaneVisualizationLayer } from '../basic';
import { LandscapePlane } from './LandscapePlane';

export class LandscapeRasterizer extends PlaneRasterizer
{
    public static LANDSCAPES_ENABLED: boolean = true;
    public static LANDSCAPE_DEFAULT_COLOR: number = 8828617;

    private static UPDATE_INTERVAL: number = 500;

    private _landscapeWidth: number = 0;
    private _landscapeHeight: number = 0;
    private _cachedBitmap: RenderTexture = null;

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

        const landscapes = this.data.planes;

        if(landscapes && landscapes.length) this.parseLandscapes(landscapes);
    }

    private parseLandscapes(k: IAssetPlane[]): void
    {
        if(!k) return;

        const randomNumber = Math.trunc((Math.random() * 654321));

        for(const landscapeIndex in k)
        {
            const landscape = k[landscapeIndex];

            if(!landscape) continue;

            const id = landscape.id;
            const visualizations = landscape.animatedVisualization;

            const plane = new LandscapePlane();

            for(const visualization of visualizations)
            {
                if(!visualization) continue;

                const size = visualization.size;

                let horizontalAngle = LandscapePlane.HORIZONTAL_ANGLE_DEFAULT;
                let verticalAngle = LandscapePlane.VERTICAL_ANGLE_DEFAULT;

                if(visualization.horizontalAngle !== undefined) horizontalAngle = visualization.horizontalAngle;
                if(visualization.verticalAngle !== undefined) verticalAngle = visualization.verticalAngle;

                const totalLayers = (visualization.allLayers.length ?? 0);

                const planeVisualization = plane.createPlaneVisualization(size, (totalLayers || 0), this.getGeometry(size, horizontalAngle, verticalAngle));

                if(planeVisualization)
                {
                    Randomizer.setSeed(randomNumber);

                    let layerId = 0;

                    while(layerId < totalLayers)
                    {
                        const layer = visualization.allLayers[layerId];

                        if(layer)
                        {
                            if((layer as IAssetPlaneVisualizationAnimatedLayer).items === undefined)
                            {
                                const basicLayer = (layer as IAssetPlaneVisualizationLayer);

                                let material: PlaneMaterial = null;
                                let align: number = PlaneVisualizationLayer.ALIGN_DEFAULT;
                                let color: number = LandscapePlane.DEFAULT_COLOR;
                                let offset: number = PlaneVisualizationLayer.DEFAULT_OFFSET;

                                if(basicLayer.materialId) material = this.getMaterial(basicLayer.materialId);

                                if(basicLayer.color) color = basicLayer.color;

                                if(basicLayer.offset) offset = basicLayer.offset;

                                if(basicLayer.align)
                                {
                                    if(basicLayer.align === 'bottom')
                                    {
                                        align = PlaneVisualizationLayer.ALIGN_BOTTOM;
                                    }

                                    else if(basicLayer.align === 'top') align = PlaneVisualizationLayer.ALIGN_TOP;
                                }

                                planeVisualization.setLayer(layerId, material, color, align, offset);
                            }
                            else
                            {
                                const animatedLayer = (layer as IAssetPlaneVisualizationAnimatedLayer);

                                const items = animatedLayer.items;
                                const animationItems: {}[] = [];

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
                                            const speedX = item.speedX;
                                            const speedY = item.speedY;

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

                                planeVisualization.setAnimationLayer(layerId, animationItems, this.assetCollection);
                            }

                            layerId++;
                        }
                    }
                }
            }

            if(!this.addPlane(id, plane)) plane.dispose();
        }
    }

    private getCoordinateValue(x: string, randomX: string): number
    {
        let _local_3 = 0;

        if((x.length > 0))
        {
            if(x.charAt((x.length - 1)) === '%')
            {
                x = x.substr(0, (x.length - 1));

                _local_3 = (parseFloat(x) / 100);
            }
        }

        if((randomX.length > 0))
        {
            const _local_4 = 10000;
            const _local_5 = Randomizer.getValues(1, 0, _local_4);
            const _local_6 = (_local_5[0] / _local_4);

            if(randomX.charAt((randomX.length - 1)) === '%')
            {
                randomX = randomX.substr(0, (randomX.length - 1));

                _local_3 = (_local_3 + ((_local_6 * parseFloat(randomX)) / 100));
            }
        }

        return _local_3;
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        let plane = this.getPlane(id) as LandscapePlane;

        if(!plane) plane = this.getPlane(LandscapeRasterizer.DEFAULT) as LandscapePlane;

        if(!plane) return null;

        if(canvas) textureCache.clearRenderTexture(canvas);

        let graphic = plane.render(planeId,textureCache, canvas, width, height, scale, normal, useTexture, offsetX, offsetY, maxX, maxY, timeSinceStartMs);

        if(graphic && (graphic !== canvas))
        {
            graphic = new RenderTexture(graphic.baseTexture);

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
