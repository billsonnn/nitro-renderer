import { FurnitureType, IFurnitureData, INitroLocalizationManager, NitroLogger } from '../../../api';
import { EventDispatcher } from '../../../core';
import { NitroEvent } from '../../../events';
import { FurnitureData } from './FurnitureData';

export class FurnitureDataLoader extends EventDispatcher
{
    public static FURNITURE_DATA_READY: string = 'FDP_FURNITURE_DATA_READY';
    public static FURNITURE_DATA_ERROR: string = 'FDP_FURNITURE_DATA_ERROR';

    private _floorItems: Map<number, IFurnitureData>;
    private _wallItems: Map<number, IFurnitureData>;
    private _localization: INitroLocalizationManager;

    constructor(floorItems: Map<number, IFurnitureData>, wallItems: Map<number, IFurnitureData>, localization: INitroLocalizationManager)
    {
        super();

        this._floorItems = floorItems;
        this._wallItems = wallItems;
        this._localization = localization;
    }

    public loadFurnitureData(url: string): void
    {
        if(!url) return;

        fetch(url)
            .then(response => response.json())
            .then(data => this.onFurnitureDataLoaded(data))
            .catch(err => this.onFurnitureDataError(err));
    }

    private onFurnitureDataLoaded(data: { [index: string]: any }): void
    {
        if(!data) return;

        if((typeof data.roomitemtypes == 'undefined') || (typeof data.wallitemtypes == 'undefined')) NitroLogger.warn('Could not find `roomitemtypes` or `wallitemtypes` in furnidata.');

        if(data.roomitemtypes) this.parseFloorItems(data.roomitemtypes);

        if(data.wallitemtypes) this.parseWallItems(data.wallitemtypes);

        this.dispatchEvent(new NitroEvent(FurnitureDataLoader.FURNITURE_DATA_READY));
    }

    private onFurnitureDataError(error: Error): void
    {
        if(!error) return;

        NitroLogger.error(error);

        this.dispatchEvent(new NitroEvent(FurnitureDataLoader.FURNITURE_DATA_ERROR));
    }

    private parseFloorItems(data: any): void
    {
        if(!data || !data.furnitype) return;

        for(const furniture of data.furnitype)
        {
            if(!furniture) continue;

            const colors: number[] = [];

            if(furniture.partcolors)
            {
                for(const color of furniture.partcolors.color)
                {
                    let colorCode = (color as string);

                    if(colorCode.charAt(0) === '#')
                    {
                        colorCode = colorCode.replace('#', '');

                        colors.push(parseInt(colorCode, 16));
                    }
                    else
                    {
                        colors.push((parseInt(colorCode, 16)));
                    }
                }
            }

            const classSplit = (furniture.classname as string).split('*');
            const className = classSplit[0];
            const colorIndex = ((classSplit.length > 1) ? parseInt(classSplit[1]) : 0);
            const hasColorIndex = (classSplit.length > 1);

            const furnitureData = new FurnitureData(FurnitureType.FLOOR, furniture.id, furniture.classname, className, furniture.category, furniture.name, furniture.description, furniture.revision, furniture.xdim, furniture.ydim, 0, colors, hasColorIndex, colorIndex, furniture.adurl, furniture.offerid, furniture.buyout, furniture.rentofferid, furniture.rentbuyout, furniture.bc, furniture.customparams, furniture.specialtype, furniture.canstandon, furniture.cansiton, furniture.canlayon, furniture.excludeddynamic, furniture.furniline, furniture.environment, furniture.rare);

            this._floorItems.set(furnitureData.id, furnitureData);

            this.updateLocalizations(furnitureData);
        }
    }

    private parseWallItems(data: any): void
    {
        if(!data || !data.furnitype) return;

        for(const furniture of data.furnitype)
        {
            if(!furniture) continue;

            const furnitureData = new FurnitureData(FurnitureType.WALL, furniture.id, furniture.classname, furniture.classname, furniture.category, furniture.name, furniture.description, furniture.revision, 0, 0, 0, null, false, 0, furniture.adurl, furniture.offerid, furniture.buyout, furniture.rentofferid, furniture.rentbuyout, furniture.bc, null, furniture.specialtype, false, false, false, furniture.excludeddynamic, furniture.furniline, furniture.environment, furniture.rare);

            this._wallItems.set(furnitureData.id, furnitureData);

            this.updateLocalizations(furnitureData);
        }
    }

    private updateLocalizations(furniture: FurnitureData): void
    {
        if(!this._localization) return;

        switch(furniture.type)
        {
            case FurnitureType.FLOOR:
                this._localization.setValue(('roomItem.name.' + furniture.id), furniture.name);
                this._localization.setValue(('roomItem.desc.' + furniture.id), furniture.description);
                return;
            case FurnitureType.WALL:
                this._localization.setValue(('wallItem.name.' + furniture.id), furniture.name);
                this._localization.setValue(('wallItem.desc.' + furniture.id), furniture.description);
                return;
        }
    }
}
