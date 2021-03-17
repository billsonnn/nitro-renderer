import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureYoutubeVisualization extends FurnitureDynamicThumbnailVisualization
{
    protected static THUMBNAIL_URL: string = 'THUMBNAIL_URL';

    protected getThumbnailURL(): string
    {
        if(!this.object) return null;

        return null;

        // const data = this.object.model.getValue<any>(RoomObjectVariable.FURNITURE_DATA);
        // const url   = this.object.model.getValue<string>(RoomObjectVariable.SESSION_URL_PREFIX);

        // if(!data || !url) return null;

        // return (url + FurnitureYoutubeVisualization.THUMBNAIL);
    }
}
