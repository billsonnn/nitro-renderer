import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureYoutubeVisualization extends FurnitureDynamicThumbnailVisualization
{
    protected static THUMBNAIL_URL: string = 'THUMBNAIL_URL';

    protected getThumbnailURL(): string
    {
        if(!this.object) return null;

        const url = this.object.model.getValue<string>(RoomObjectVariable.SESSION_URL_PREFIX);

        return (url + FurnitureYoutubeVisualization.THUMBNAIL);
    }
}
