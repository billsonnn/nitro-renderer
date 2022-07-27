import { NitroLogger } from '../../core/common/logger/NitroLogger';
import { EventDispatcher } from '../../core/events/EventDispatcher';
import { IEventDispatcher } from '../../core/events/IEventDispatcher';
import { IRoomObjectEventHandler } from '../../room/object/logic/IRoomObjectEventHandler';
import { IRoomObjectLogicFactory } from '../../room/object/logic/IRoomObjectLogicFactory';
import { RoomObjectLogicBase } from '../../room/object/logic/RoomObjectLogicBase';
import { FurnitureEcotronBoxLogic, FurnitureEffectBoxLogic, FurnitureGroupForumTerminalLogic, FurnitureHabboWheelLogic, FurnitureHweenLovelockLogic, FurnitureInternalLinkLogic, FurnitureJukeboxLogic, FurnitureLoveLockLogic, FurnitureMonsterplantSeedLogic, FurnitureMysteryBoxLogic, FurnitureMysteryTrophyLogic, FurniturePlaceholderLogic, FurniturePlanetSystemLogic, FurnitureRandomStateLogic, FurnitureRandomTeleportLogic, FurnitureRentableSpaceLogic, FurnitureSongDiskLogic, FurnitureSoundMachineLogic, FurnitureWelcomeGiftLogic } from './object';
import { AvatarLogic } from './object/logic/avatar/AvatarLogic';
import { FurnitureAchievementResolutionLogic } from './object/logic/furniture/FurnitureAchievementResolutionLogic';
import { FurnitureBadgeDisplayLogic } from './object/logic/furniture/FurnitureBadgeDisplayLogic';
import { FurnitureChangeStateWhenStepOnLogic } from './object/logic/furniture/FurnitureChangeStateWhenStepOnLogic';
import { FurnitureClothingChangeLogic } from './object/logic/furniture/FurnitureClothingChangeLogic';
import { FurnitureCounterClockLogic } from './object/logic/furniture/FurnitureCounterClockLogic';
import { FurnitureCrackableLogic } from './object/logic/furniture/FurnitureCrackableLogic';
import { FurnitureCraftingGizmoLogic } from './object/logic/furniture/FurnitureCraftingGizmoLogic';
import { FurnitureCreditLogic } from './object/logic/furniture/FurnitureCreditLogic';
import { FurnitureCuckooClockLogic } from './object/logic/furniture/FurnitureCuckooClockLogic';
import { FurnitureCustomStackHeightLogic } from './object/logic/furniture/FurnitureCustomStackHeightLogic';
import { FurnitureDiceLogic } from './object/logic/furniture/FurnitureDiceLogic';
import { FurnitureEditableInternalLinkLogic } from './object/logic/furniture/FurnitureEditableInternalLinkLogic';
import { FurnitureEditableRoomLinkLogic } from './object/logic/furniture/FurnitureEditableRoomLinkLogic';
import { FurnitureExternalImageLogic } from './object/logic/furniture/FurnitureExternalImageLogic';
import { FurnitureFireworksLogic } from './object/logic/furniture/FurnitureFireworksLogic';
import { FurnitureFloorHoleLogic } from './object/logic/furniture/FurnitureFloorHoleLogic';
import { FurnitureGuildCustomizedLogic } from './object/logic/furniture/FurnitureGuildCustomizedLogic';
import { FurnitureHighScoreLogic } from './object/logic/furniture/FurnitureHighScoreLogic';
import { FurnitureHockeyScoreLogic } from './object/logic/furniture/FurnitureHockeyScoreLogic';
import { FurnitureIceStormLogic } from './object/logic/furniture/FurnitureIceStormLogic';
import { FurnitureLogic } from './object/logic/furniture/FurnitureLogic';
import { FurnitureMannequinLogic } from './object/logic/furniture/FurnitureMannequinLogic';
import { FurnitureMultiHeightLogic } from './object/logic/furniture/FurnitureMultiHeightLogic';
import { FurnitureMultiStateLogic } from './object/logic/furniture/FurnitureMultiStateLogic';
import { FurnitureOneWayDoorLogic } from './object/logic/furniture/FurnitureOneWayDoorLogic';
import { FurniturePetCustomizationLogic } from './object/logic/furniture/FurniturePetCustomizationLogic';
import { FurniturePresentLogic } from './object/logic/furniture/FurniturePresentLogic';
import { FurniturePurchaseableClothingLogic } from './object/logic/furniture/FurniturePurchaseableClothingLogic';
import { FurniturePushableLogic } from './object/logic/furniture/FurniturePushableLogic';
import { FurnitureRoomBackgroundColorLogic } from './object/logic/furniture/FurnitureRoomBackgroundColorLogic';
import { FurnitureRoomBackgroundLogic } from './object/logic/furniture/FurnitureRoomBackgroundLogic';
import { FurnitureRoomBillboardLogic } from './object/logic/furniture/FurnitureRoomBillboardLogic';
import { FurnitureRoomDimmerLogic } from './object/logic/furniture/FurnitureRoomDimmerLogic';
import { FurnitureScoreLogic } from './object/logic/furniture/FurnitureScoreLogic';
import { FurnitureSoundBlockLogic } from './object/logic/furniture/FurnitureSoundBlockLogic';
import { FurnitureStickieLogic } from './object/logic/furniture/FurnitureStickieLogic';
import { FurnitureTrophyLogic } from './object/logic/furniture/FurnitureTrophyLogic';
import { FurnitureVoteCounterLogic } from './object/logic/furniture/FurnitureVoteCounterLogic';
import { FurnitureVoteMajorityLogic } from './object/logic/furniture/FurnitureVoteMajorityLogic';
import { FurnitureWindowLogic } from './object/logic/furniture/FurnitureWindowLogic';
import { FurnitureYoutubeLogic } from './object/logic/furniture/FurnitureYoutubeLogic';
import { PetLogic } from './object/logic/pet/PetLogic';
import { RoomLogic } from './object/logic/room/RoomLogic';
import { SelectionArrowLogic } from './object/logic/room/SelectionArrowLogic';
import { TileCursorLogic } from './object/logic/room/TileCursorLogic';
import { RoomObjectLogicType } from './object/RoomObjectLogicType';

export class RoomObjectLogicFactory implements IRoomObjectLogicFactory
{
    private _events: IEventDispatcher;

    private _cachedEvents: Map<string, boolean>;
    private _registeredEvents: Map<string, boolean>;
    private _functions: Function[];

    constructor()
    {
        this._events = new EventDispatcher();

        this._cachedEvents = new Map();
        this._registeredEvents = new Map();
        this._functions = [];
    }

    public getLogic(type: string): IRoomObjectEventHandler
    {
        const logic = this.getLogicType(type);

        if(!logic) return null;

        const instance = (new logic() as IRoomObjectEventHandler);

        if(!instance) return null;

        instance.eventDispatcher = this._events;

        if(!this._cachedEvents.get(type))
        {
            this._cachedEvents.set(type, true);

            const eventTypes = instance.getEventTypes();

            for(const eventType of eventTypes)
            {
                if(!eventType) continue;

                this.registerEventType(eventType);
            }
        }

        return instance;
    }

    private registerEventType(type: string): void
    {
        if(this._registeredEvents.get(type)) return;

        this._registeredEvents.set(type, true);

        for(const func of this._functions)
        {
            if(!func) continue;

            this._events.addEventListener(type, func);
        }
    }

    public registerEventFunction(func: Function): void
    {
        if(!func) return;

        if(this._functions.indexOf(func) >= 0) return;

        this._functions.push(func);

        for(const eventType of this._registeredEvents.keys())
        {
            if(!eventType) continue;

            this._events.addEventListener(eventType, func);
        }
    }

    public removeEventFunction(func: Function): void
    {
        if(!func) return;

        const index = this._functions.indexOf(func);

        if(index === -1) return;

        this._functions.splice(index, 1);

        for(const event of this._registeredEvents.keys())
        {
            if(!event) continue;

            this._events.removeEventListener(event, func);
        }
    }

    public getLogicType(type: string): typeof RoomObjectLogicBase
    {
        if(!type) return null;

        let logic: typeof RoomObjectLogicBase = null;

        switch(type)
        {
            case RoomObjectLogicType.ROOM:
                logic = RoomLogic;
                break;
            case RoomObjectLogicType.TILE_CURSOR:
                logic = TileCursorLogic;
                break;
            case RoomObjectLogicType.SELECTION_ARROW:
                logic = SelectionArrowLogic;
                break;
            case RoomObjectLogicType.USER:
            case RoomObjectLogicType.BOT:
            case RoomObjectLogicType.RENTABLE_BOT:
                logic = AvatarLogic;
                break;
            case RoomObjectLogicType.PET:
                logic = PetLogic;
                break;
            case RoomObjectLogicType.FURNITURE_BASIC:
                logic = FurnitureLogic;
                break;
            case RoomObjectLogicType.FURNITURE_BADGE_DISPLAY:
                logic = FurnitureBadgeDisplayLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CHANGE_STATE_WHEN_STEP_ON:
                logic = FurnitureChangeStateWhenStepOnLogic;
                break;
            case RoomObjectLogicType.FURNITURE_COUNTER_CLOCK:
                logic = FurnitureCounterClockLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CRACKABLE:
                logic = FurnitureCrackableLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CREDIT:
                logic = FurnitureCreditLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CUSTOM_STACK_HEIGHT:
                logic = FurnitureCustomStackHeightLogic;
                break;
            case RoomObjectLogicType.FURNITURE_DICE:
                logic = FurnitureDiceLogic;
                break;
            case RoomObjectLogicType.FURNITURE_EDITABLE_INTERNAL_LINK:
                logic = FurnitureEditableInternalLinkLogic;
                break;
            case RoomObjectLogicType.FURNITURE_EDITABLE_ROOM_LINK:
                logic = FurnitureEditableRoomLinkLogic;
                break;
            case RoomObjectLogicType.FURNITURE_EXTERNAL_IMAGE_WALLITEM:
                logic = FurnitureExternalImageLogic;
                break;
            case RoomObjectLogicType.FURNITURE_FIREWORKS:
                logic = FurnitureFireworksLogic;
                break;
            case RoomObjectLogicType.FURNITURE_FLOOR_HOLE:
                logic = FurnitureFloorHoleLogic;
                break;
            case RoomObjectLogicType.FURNITURE_GUILD_CUSTOMIZED:
                logic = FurnitureGuildCustomizedLogic;
                break;
            case RoomObjectLogicType.FURNITURE_HIGH_SCORE:
                logic = FurnitureHighScoreLogic;
                break;
            case RoomObjectLogicType.FURNITURE_HOCKEY_SCORE:
                logic = FurnitureHockeyScoreLogic;
                break;
            case RoomObjectLogicType.FURNITURE_ES:
                logic = FurnitureIceStormLogic;
                break;
            case RoomObjectLogicType.FURNITURE_MANNEQUIN:
                logic = FurnitureMannequinLogic;
                break;
            case RoomObjectLogicType.FURNITURE_MULTIHEIGHT:
                logic = FurnitureMultiHeightLogic;
                break;
            case RoomObjectLogicType.FURNITURE_MULTISTATE:
                logic = FurnitureMultiStateLogic;
                break;
            case RoomObjectLogicType.FURNITURE_ONE_WAY_DOOR:
                logic = FurnitureOneWayDoorLogic;
                break;
            case RoomObjectLogicType.FURNITURE_PET_CUSTOMIZATION:
                logic = FurniturePetCustomizationLogic;
                break;
            case RoomObjectLogicType.FURNITURE_PRESENT:
                logic = FurniturePresentLogic;
                break;
            case RoomObjectLogicType.FURNITURE_PURCHASABLE_CLOTHING:
                logic = FurniturePurchaseableClothingLogic;
                break;
            case RoomObjectLogicType.FURNITURE_PUSHABLE:
                logic = FurniturePushableLogic;
                break;
            case RoomObjectLogicType.FURNITURE_BACKGROUND_COLOR:
                logic = FurnitureRoomBackgroundColorLogic;
                break;
            case RoomObjectLogicType.FURNITURE_BG:
                logic = FurnitureRoomBackgroundLogic;
                break;
            case RoomObjectLogicType.FURNITURE_BB:
                logic = FurnitureRoomBillboardLogic;
                break;
            case RoomObjectLogicType.FURNITURE_ROOMDIMMER:
                logic = FurnitureRoomDimmerLogic;
                break;
            case RoomObjectLogicType.FURNITURE_SCORE:
                logic = FurnitureScoreLogic;
                break;
            case RoomObjectLogicType.FURNITURE_SOUNDBLOCK:
                logic = FurnitureSoundBlockLogic;
                break;
            case RoomObjectLogicType.FURNITURE_STICKIE:
                logic = FurnitureStickieLogic;
                break;
            case RoomObjectLogicType.FURNITURE_TROPHY:
                logic = FurnitureTrophyLogic;
                break;
            case RoomObjectLogicType.FURNITURE_VOTE_COUNTER:
                logic = FurnitureVoteCounterLogic;
                break;
            case RoomObjectLogicType.FURNITURE_VOTE_MAJORITY:
                logic = FurnitureVoteMajorityLogic;
                break;
            case RoomObjectLogicType.FURNITURE_WINDOW:
                logic = FurnitureWindowLogic;
                break;
            case RoomObjectLogicType.FURNITURE_LOVELOCK:
                logic = FurnitureLoveLockLogic;
                break;
            case RoomObjectLogicType.FURNITURE_YOUTUBE:
                logic = FurnitureYoutubeLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CRAFTING_GIZMO:
                logic = FurnitureCraftingGizmoLogic;
                break;
            case RoomObjectLogicType.FURNITURE_RENTABLE_SPACE:
                logic = FurnitureRentableSpaceLogic;
                break;
            case RoomObjectLogicType.FURNITURE_EFFECTBOX:
                logic = FurnitureEffectBoxLogic;
                break;
            case RoomObjectLogicType.FURNITURE_MONSTERPLANT_SEED:
                logic = FurnitureMonsterplantSeedLogic;
                break;
            case RoomObjectLogicType.FURNITURE_MYSTERYBOX:
                logic = FurnitureMysteryBoxLogic;
                break;
            case RoomObjectLogicType.FURNITURE_MYSTERYTROPHY:
                logic = FurnitureMysteryTrophyLogic;
                break;
            case RoomObjectLogicType.FURNITURE_RANDOM_TELEPORT:
                logic = FurnitureRandomTeleportLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CLOTHING_CHANGE:
                logic = FurnitureClothingChangeLogic;
                break;
            case RoomObjectLogicType.FURNITURE_CUCKOO_CLOCK:
                logic = FurnitureCuckooClockLogic;
                break;
            case RoomObjectLogicType.FURNITURE_ECOTRON_BOX:
                logic = FurnitureEcotronBoxLogic;
                break;
            case RoomObjectLogicType.FURNITURE_GROUP_FORUM_TERMINAL:
                logic = FurnitureGroupForumTerminalLogic;
                break;
            case RoomObjectLogicType.FURNITURE_HWEEN_LOVELOCK:
                logic = FurnitureHweenLovelockLogic;
                break;
            case RoomObjectLogicType.FURNITURE_INTERNAL_LINK:
                logic = FurnitureInternalLinkLogic;
                break;
            case RoomObjectLogicType.FURNITURE_JUKEBOX:
                logic = FurnitureJukeboxLogic;
                break;
            case RoomObjectLogicType.FURNITURE_PLACEHOLDER:
                logic = FurniturePlaceholderLogic;
                break;
            case RoomObjectLogicType.FURNITURE_PLANET_SYSTEM:
                logic = FurniturePlanetSystemLogic;
                break;
            case RoomObjectLogicType.FURNITURE_RANDOMSTATE:
                logic = FurnitureRandomStateLogic;
                break;
            case RoomObjectLogicType.FURNITURE_SONG_DISK:
                logic = FurnitureSongDiskLogic;
                break;
            case RoomObjectLogicType.FURNITURE_SOUND_MACHINE:
                logic = FurnitureSoundMachineLogic;
                break;
            case RoomObjectLogicType.FURNITURE_WELCOME_GIFT:
                logic = FurnitureWelcomeGiftLogic;
                break;
            case RoomObjectLogicType.FURNITURE_ACHIEVEMENT_RESOLUTION:
                logic = FurnitureAchievementResolutionLogic;
                break;
            case RoomObjectLogicType.FURNITURE_HABBOWHEEL:
                logic = FurnitureHabboWheelLogic;
                break;
            default:
                logic = FurnitureLogic;
                break;
        }

        if(!logic)
        {
            NitroLogger.warn('Unknown Logic', type);

            return null;
        }

        return logic;
    }

    public get events(): IEventDispatcher
    {
        return this._events;
    }
}
