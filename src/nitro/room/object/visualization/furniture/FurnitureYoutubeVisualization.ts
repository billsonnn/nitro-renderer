import { RoomObjectVariable } from '../../../../../api';
import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureYoutubeVisualization extends FurnitureDynamicThumbnailVisualization
{
    protected static THUMBNAIL_URL: string = 'THUMBNAIL_URL';

    protected getThumbnailURL(): string
    {
        if(!this.object) return null;

        const furnitureData = this.object.model.getValue<{ [index: string]: string }>(RoomObjectVariable.FURNITURE_DATA);

        if(furnitureData) return (furnitureData[FurnitureYoutubeVisualization.THUMBNAIL_URL] || null);

        return null;
    }
}
