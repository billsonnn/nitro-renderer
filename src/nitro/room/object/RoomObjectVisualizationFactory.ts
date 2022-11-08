import { IAssetData, IObjectVisualizationData, IRoomObjectGraphicVisualization, IRoomObjectVisualizationFactory, NitroLogger, RoomObjectVisualizationType } from '../../../api';
import { RoomObjectSpriteVisualization } from '../../../room';
import { Nitro } from '../../Nitro';
import { AvatarVisualization, AvatarVisualizationData, FurnitureAnimatedVisualization, FurnitureAnimatedVisualizationData, FurnitureBadgeDisplayVisualization, FurnitureBBVisualization, FurnitureBottleVisualization, FurnitureBuilderPlaceholderVisualization, FurnitureCounterClockVisualization, FurnitureCuboidVisualization, FurnitureExternalImageVisualization, FurnitureFireworksVisualization, FurnitureGiftWrappedFireworksVisualization, FurnitureGiftWrappedVisualization, FurnitureGuildCustomizedVisualization, FurnitureGuildIsometricBadgeVisualization, FurnitureHabboWheelVisualization, FurnitureIsometricBBVisualization, FurnitureMannequinVisualization, FurnitureMannequinVisualizationData, FurniturePartyBeamerVisualization, FurniturePlanetSystemVisualization, FurniturePosterVisualization, FurnitureQueueTileVisualization, FurnitureResettingAnimatedVisualization, FurnitureRoomBackgroundVisualization, FurnitureScoreBoardVisualization, FurnitureSoundBlockVisualization, FurnitureStickieVisualization, FurnitureValRandomizerVisualization, FurnitureVisualization, FurnitureVisualizationData, FurnitureVoteCounterVisualization, FurnitureVoteMajorityVisualization, FurnitureWaterAreaVisualization, FurnitureYoutubeVisualization, PetVisualization, PetVisualizationData, RoomVisualization, RoomVisualizationData, TileCursorVisualization } from './visualization';

export class RoomObjectVisualizationFactory implements IRoomObjectVisualizationFactory
{
    private static CACHING_ENABLED: boolean = true;

    private _visualizationDatas: Map<string, IObjectVisualizationData>;

    constructor()
    {
        this._visualizationDatas = new Map();
    }

    public getVisualization(type: string): IRoomObjectGraphicVisualization
    {
        const visualization = this.getVisualizationType(type);

        if(!visualization) return null;

        return new visualization();
    }

    public getVisualizationType(type: string): typeof RoomObjectSpriteVisualization
    {
        if(!type) return null;

        let visualization: typeof RoomObjectSpriteVisualization = null;

        switch(type)
        {
            case RoomObjectVisualizationType.ROOM:
                visualization = RoomVisualization;
                break;
            case RoomObjectVisualizationType.TILE_CURSOR:
                visualization = TileCursorVisualization;
                break;
            case RoomObjectVisualizationType.USER:
            case RoomObjectVisualizationType.BOT:
            case RoomObjectVisualizationType.RENTABLE_BOT:
                visualization = AvatarVisualization;
                break;
            case RoomObjectVisualizationType.PET_ANIMATED:
                visualization = PetVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_STATIC:
                visualization = FurnitureVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_ANIMATED:
                visualization = FurnitureAnimatedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_RESETTING_ANIMATED:
                visualization = FurnitureResettingAnimatedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BADGE_DISPLAY:
                visualization = FurnitureBadgeDisplayVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BG:
                visualization = FurnitureRoomBackgroundVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BB:
                visualization = FurnitureBBVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_ISOMETRIC_BB:
                visualization = FurnitureIsometricBBVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BOTTLE:
                visualization = FurnitureBottleVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BUILDER_PLACEHOLDER:
                visualization = FurnitureBuilderPlaceholderVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_COUNTER_CLOCK:
                visualization = FurnitureCounterClockVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_CUBOID:
                visualization = FurnitureCuboidVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_EXTERNAL_IMAGE:
                visualization = FurnitureExternalImageVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_FIREWORKS:
                visualization = FurnitureFireworksVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED_FIREWORKS:
                visualization = FurnitureGiftWrappedFireworksVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED:
                visualization = FurnitureGiftWrappedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GUILD_CUSTOMIZED:
                visualization = FurnitureGuildCustomizedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GUILD_ISOMETRIC_BADGE:
                visualization = FurnitureGuildIsometricBadgeVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_HABBOWHEEL:
                visualization = FurnitureHabboWheelVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_MANNEQUIN:
                visualization = FurnitureMannequinVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_PARTY_BEAMER:
                visualization = FurniturePartyBeamerVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_PLANET_SYSTEM:
                visualization = FurniturePlanetSystemVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_POSTER:
                visualization = FurniturePosterVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_QUEUE_TILE:
                visualization = FurnitureQueueTileVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_SCORE_BOARD:
                visualization = FurnitureScoreBoardVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_SOUNDBLOCK:
                visualization = FurnitureSoundBlockVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_STICKIE:
                visualization = FurnitureStickieVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_VAL_RANDOMIZER:
                visualization = FurnitureValRandomizerVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_VOTE_COUNTER:
                visualization = FurnitureVoteCounterVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_VOTE_MAJORITY:
                visualization = FurnitureVoteMajorityVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_WATER_AREA:
                visualization = FurnitureWaterAreaVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_YOUTUBE:
                visualization = FurnitureYoutubeVisualization;
                break;
        }

        if(!visualization)
        {
            NitroLogger.log('Unknown Visualization', type);

            return null;
        }

        return visualization;
    }

    public getVisualizationData(type: string, visualization: string, asset: IAssetData): IObjectVisualizationData
    {
        const existing = this._visualizationDatas.get(type);

        if(existing) return existing;

        let visualizationData: IObjectVisualizationData = null;

        switch(visualization)
        {
            case RoomObjectVisualizationType.FURNITURE_STATIC:
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED:
            case RoomObjectVisualizationType.FURNITURE_BB:
            case RoomObjectVisualizationType.FURNITURE_ISOMETRIC_BB:
            case RoomObjectVisualizationType.FURNITURE_BG:
            case RoomObjectVisualizationType.FURNITURE_STICKIE:
            case RoomObjectVisualizationType.FURNITURE_BUILDER_PLACEHOLDER:
                visualizationData = new FurnitureVisualizationData();
                break;
            case RoomObjectVisualizationType.FURNITURE_ANIMATED:
            case RoomObjectVisualizationType.FURNITURE_RESETTING_ANIMATED:
            case RoomObjectVisualizationType.FURNITURE_POSTER:
            case RoomObjectVisualizationType.FURNITURE_HABBOWHEEL:
            case RoomObjectVisualizationType.FURNITURE_VAL_RANDOMIZER:
            case RoomObjectVisualizationType.FURNITURE_BOTTLE:
            case RoomObjectVisualizationType.FURNITURE_PLANET_SYSTEM:
            case RoomObjectVisualizationType.FURNITURE_QUEUE_TILE:
            case RoomObjectVisualizationType.FURNITURE_PARTY_BEAMER:
            case RoomObjectVisualizationType.FURNITURE_COUNTER_CLOCK:
            case RoomObjectVisualizationType.FURNITURE_WATER_AREA:
            case RoomObjectVisualizationType.FURNITURE_SCORE_BOARD:
            case RoomObjectVisualizationType.FURNITURE_FIREWORKS:
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED_FIREWORKS:
            case RoomObjectVisualizationType.FURNITURE_GUILD_CUSTOMIZED:
            case RoomObjectVisualizationType.FURNITURE_GUILD_ISOMETRIC_BADGE:
            case RoomObjectVisualizationType.FURNITURE_VOTE_COUNTER:
            case RoomObjectVisualizationType.FURNITURE_VOTE_MAJORITY:
            case RoomObjectVisualizationType.FURNITURE_SOUNDBLOCK:
            case RoomObjectVisualizationType.FURNITURE_BADGE_DISPLAY:
            case RoomObjectVisualizationType.FURNITURE_EXTERNAL_IMAGE:
            case RoomObjectVisualizationType.FURNITURE_YOUTUBE:
            case RoomObjectVisualizationType.TILE_CURSOR:
                visualizationData = new FurnitureAnimatedVisualizationData();
                break;
            case RoomObjectVisualizationType.FURNITURE_MANNEQUIN:
                visualizationData = new FurnitureMannequinVisualizationData();
                break;
            case RoomObjectVisualizationType.ROOM:
                visualizationData = new RoomVisualizationData();
                break;
            case RoomObjectVisualizationType.USER:
            case RoomObjectVisualizationType.BOT:
            case RoomObjectVisualizationType.RENTABLE_BOT:
                visualizationData = new AvatarVisualizationData();
                break;
            case RoomObjectVisualizationType.PET_ANIMATED:
                visualizationData = new PetVisualizationData();
                break;
        }

        if(!visualizationData) return null;

        if(!visualizationData.initialize(asset))
        {
            visualizationData.dispose();

            return null;
        }

        if((visualizationData instanceof AvatarVisualizationData) || (visualizationData instanceof FurnitureMannequinVisualizationData))
        {
            visualizationData.avatarManager = Nitro.instance.avatar;
        }

        if(RoomObjectVisualizationFactory.CACHING_ENABLED) this._visualizationDatas.set(type, visualizationData);

        return visualizationData;
    }
}
