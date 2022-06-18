import { IConnection } from '../../../core/communication/connections/IConnection';
import { PetFigureUpdateEvent } from '../../communication';
import { NewFriendRequestEvent } from '../../communication/messages/incoming/friendlist/NewFriendRequestEvent';
import { DoorbellMessageEvent } from '../../communication/messages/incoming/navigator/DoorbellMessageEvent';
import { BotErrorEvent } from '../../communication/messages/incoming/notifications/BotErrorEvent';
import { PetPlacingErrorEvent } from '../../communication/messages/incoming/notifications/PetPlacingErrorEvent';
import { FavoriteMembershipUpdateMessageEvent } from '../../communication/messages/incoming/room/engine/FavoriteMembershipUpdateMessageEvent';
import { PetInfoEvent } from '../../communication/messages/incoming/room/pet/PetInfoEvent';
import { PetStatusUpdateEvent } from '../../communication/messages/incoming/room/pet/PetStatusUpdateEvent';
import { RoomUnitDanceEvent } from '../../communication/messages/incoming/room/unit/RoomUnitDanceEvent';
import { RoomUnitEvent } from '../../communication/messages/incoming/room/unit/RoomUnitEvent';
import { RoomUnitInfoEvent } from '../../communication/messages/incoming/room/unit/RoomUnitInfoEvent';
import { RoomUnitRemoveEvent } from '../../communication/messages/incoming/room/unit/RoomUnitRemoveEvent';
import { UserCurrentBadgesEvent } from '../../communication/messages/incoming/user/data/UserCurrentBadgesEvent';
import { UserNameChangeMessageEvent } from '../../communication/messages/incoming/user/data/UserNameChangeMessageEvent';
import { RoomSessionPetFigureUpdateEvent, RoomSessionPetStatusUpdateEvent, RoomSessionUserFigureUpdateEvent } from '../events';
import { RoomSessionDanceEvent } from '../events/RoomSessionDanceEvent';
import { RoomSessionDoorbellEvent } from '../events/RoomSessionDoorbellEvent';
import { RoomSessionErrorMessageEvent } from '../events/RoomSessionErrorMessageEvent';
import { RoomSessionFavoriteGroupUpdateEvent } from '../events/RoomSessionFavoriteGroupUpdateEvent';
import { RoomSessionFriendRequestEvent } from '../events/RoomSessionFriendRequestEvent';
import { RoomSessionPetInfoUpdateEvent } from '../events/RoomSessionPetInfoUpdateEvent';
import { RoomSessionUserBadgesEvent } from '../events/RoomSessionUserBadgesEvent';
import { RoomSessionUserDataUpdateEvent } from '../events/RoomSessionUserDataUpdateEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { RoomPetData } from '../RoomPetData';
import { RoomUserData } from '../RoomUserData';
import { BaseHandler } from './BaseHandler';

export class RoomUsersHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomUnitEvent(this.onRoomUnitEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitInfoEvent(this.onRoomUnitInfoEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitRemoveEvent(this.onRoomUnitRemoveEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitDanceEvent(this.onRoomUnitDanceEvent.bind(this)));
        connection.addMessageEvent(new UserCurrentBadgesEvent(this.onUserCurrentBadgesEvent.bind(this)));
        connection.addMessageEvent(new DoorbellMessageEvent(this.onRoomDoorbellEvent.bind(this)));
        connection.addMessageEvent(new UserNameChangeMessageEvent(this.onUserNameChangeMessageEvent.bind(this)));
        connection.addMessageEvent(new NewFriendRequestEvent(this.onNewFriendRequestEvent.bind(this)));
        connection.addMessageEvent(new PetInfoEvent(this.onPetInfoEvent.bind(this)));
        connection.addMessageEvent(new PetStatusUpdateEvent(this.onPetStatusUpdateEvent.bind(this)));
        connection.addMessageEvent(new PetFigureUpdateEvent(this.onPetFigureUpdateEvent.bind(this)));
        connection.addMessageEvent(new PetPlacingErrorEvent(this.onPetPlacingError.bind(this)));
        connection.addMessageEvent(new BotErrorEvent(this.onBotError.bind(this)));
        connection.addMessageEvent(new FavoriteMembershipUpdateMessageEvent(this.onFavoriteMembershipUpdateMessageEvent.bind(this)));
    }

    private onRoomUnitEvent(event: RoomUnitEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const users = event.getParser().users;

        const usersToAdd: RoomUserData[] = [];

        if(users && users.length)
        {
            for(const user of users)
            {
                if(!user) continue;

                const userData = new RoomUserData(user.roomIndex);

                userData.name = user.name;
                userData.custom = user.custom;
                userData.activityPoints = user.activityPoints;
                userData.figure = user.figure;
                userData.type = user.userType;
                userData.webID = user.webID;
                userData.groupId = user.groupID;
                userData.groupName = user.groupName;
                userData.groupStatus = user.groupStatus;
                userData.sex = user.sex;
                userData.ownerId = user.ownerId;
                userData.ownerName = user.ownerName;
                userData.rarityLevel = user.rarityLevel;
                userData.hasSaddle = user.hasSaddle;
                userData.isRiding = user.isRiding;
                userData.canBreed = user.canBreed;
                userData.canHarvest = user.canHarvest;
                userData.canRevive = user.canRevive;
                userData.hasBreedingPermission = user.hasBreedingPermission;
                userData.petLevel = user.petLevel;
                userData.botSkills = user.botSkills;
                userData.isModerator = user.isModerator;

                if(!session.userDataManager.getUserData(user.roomIndex)) usersToAdd.push(userData);

                session.userDataManager.updateUserData(userData);
            }
        }

        this.listener.events.dispatchEvent(new RoomSessionUserDataUpdateEvent(session, usersToAdd));
    }

    private onRoomUnitInfoEvent(event: RoomUnitInfoEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        session.userDataManager.updateFigure(parser.unitId, parser.figure, parser.gender, false, false);
        session.userDataManager.updateMotto(parser.unitId, parser.motto);
        session.userDataManager.updateAchievementScore(parser.unitId, parser.achievementScore);

        this.listener.events.dispatchEvent(new RoomSessionUserFigureUpdateEvent(session, parser.unitId, parser.figure, parser.gender, parser.motto, parser.achievementScore));

    }

    private onRoomUnitRemoveEvent(event: RoomUnitRemoveEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.removeUserData(event.getParser().unitId);
    }

    private onRoomUnitDanceEvent(event: RoomUnitDanceEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        this.listener.events.dispatchEvent(new RoomSessionDanceEvent(session, parser.unitId, parser.danceId));
    }

    private onUserCurrentBadgesEvent(event: UserCurrentBadgesEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.setUserBadges(parser.userId, parser.badges);

        this.listener.events.dispatchEvent(new RoomSessionUserBadgesEvent(session, parser.userId, parser.badges));
    }

    private onRoomDoorbellEvent(event: DoorbellMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const username = parser.userName;

        if(!username || !username.length) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        this.listener.events.dispatchEvent(new RoomSessionDoorbellEvent(RoomSessionDoorbellEvent.DOORBELL, session, username));
    }

    private onUserNameChangeMessageEvent(event: UserNameChangeMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.updateName(parser.id, parser.newName);
    }

    private onNewFriendRequestEvent(event: NewFriendRequestEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const request = parser.request;

        this.listener.events.dispatchEvent(new RoomSessionFriendRequestEvent(session, request.requestId, request.requesterUserId, request.requesterName));
    }

    private onPetInfoEvent(event: PetInfoEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const petData = new RoomPetData();

        petData.id = parser.id;
        petData.level = parser.level;
        petData.maximumLevel = parser.maximumLevel;
        petData.experience = parser.experience;
        petData.levelExperienceGoal = parser.levelExperienceGoal;
        petData.energy = parser.energy;
        petData.maximumEnergy = parser.maximumEnergy;
        petData.happyness = parser.happyness;
        petData.maximumHappyness = parser.maximumHappyness;
        petData.ownerId = parser.ownerId;
        petData.ownerName = parser.ownerName;
        petData.respect = parser.respect;
        petData.age = parser.age;
        petData.unknownRarity = parser.unknownRarity;
        petData.saddle = parser.saddle;
        petData.rider = parser.rider;
        petData.breedable = parser.breedable;
        petData.fullyGrown = parser.fullyGrown;
        petData.rarityLevel = parser.rarityLevel;
        petData.dead = parser.dead;
        petData.skillTresholds = parser.skillTresholds;
        petData.publiclyRideable = parser.publiclyRideable;
        petData.maximumTimeToLive = parser.maximumTimeToLive;
        petData.remainingTimeToLive = parser.remainingTimeToLive;
        petData.remainingGrowTime = parser.remainingGrowTime;
        petData.publiclyBreedable = parser.publiclyBreedable;

        this.listener.events.dispatchEvent(new RoomSessionPetInfoUpdateEvent(session, petData));
    }

    private onPetStatusUpdateEvent(event: PetStatusUpdateEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.updatePetBreedingStatus(parser.roomIndex, parser.canBreed, parser.canHarvest, parser.canRevive, parser.hasBreedingPermission);

        this.listener.events.dispatchEvent(new RoomSessionPetStatusUpdateEvent(session, parser.petId, parser.canBreed, parser.canHarvest, parser.canRevive, parser.hasBreedingPermission));
    }

    private onPetFigureUpdateEvent(event: PetFigureUpdateEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const figure = parser.figureData.figuredata;

        session.userDataManager.updateFigure(parser.roomIndex, figure, '', parser.hasSaddle, parser.isRiding);

        this.listener.events.dispatchEvent(new RoomSessionPetFigureUpdateEvent(session, parser.petId, figure));
    }

    private onPetPlacingError(event: PetPlacingErrorEvent): void
    {
        if(!event) return;

        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        let type: string = null;

        switch(parser.errorCode)
        {
            case 0:
                type = RoomSessionErrorMessageEvent.RSEME_PETS_FORBIDDEN_IN_HOTEL;
                break;
            case 1:
                type = RoomSessionErrorMessageEvent.RSEME_PETS_FORBIDDEN_IN_FLAT;
                break;
            case 2:
                type = RoomSessionErrorMessageEvent.RSEME_MAX_PETS;
                break;
            case 3:
                type = RoomSessionErrorMessageEvent.RSEME_NO_FREE_TILES_FOR_PET;
                break;
            case 4:
                type = RoomSessionErrorMessageEvent.RSEME_SELECTED_TILE_NOT_FREE_FOR_PET;
                break;
            case 5:
                type = RoomSessionErrorMessageEvent.RSEME_MAX_NUMBER_OF_OWN_PETS;
                break;
        }

        if(!type || type.length == 0) return;

        this.listener.events.dispatchEvent(new RoomSessionErrorMessageEvent(type, session));
    }

    private onBotError(event: BotErrorEvent): void
    {
        if(!event) return;

        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        let type: string = null;

        switch(parser.errorCode)
        {
            case 0:
                type = RoomSessionErrorMessageEvent.RSEME_BOTS_FORBIDDEN_IN_HOTEL;
                break;
            case 1:
                type = RoomSessionErrorMessageEvent.RSEME_BOTS_FORBIDDEN_IN_FLAT;
                break;
            case 2:
                type = RoomSessionErrorMessageEvent.RSEME_BOT_LIMIT_REACHED;
                break;
            case 3:
                type = RoomSessionErrorMessageEvent.RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT;
                break;
            case 4:
                type = RoomSessionErrorMessageEvent.RSEME_BOT_NAME_NOT_ACCEPTED;
                break;
        }

        if(!type || type.length == 0) return;

        this.listener.events.dispatchEvent(new RoomSessionErrorMessageEvent(type, session));
    }

    private onFavoriteMembershipUpdateMessageEvent(event: FavoriteMembershipUpdateMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();
        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const userData = session.userDataManager.getUserDataByIndex(parser.roomIndex);

        if(!userData) return;

        userData.groupId = parser.groupId;
        userData.groupName = parser.groupName;

        this.listener.events.dispatchEvent(new RoomSessionFavoriteGroupUpdateEvent(session, parser.roomIndex, parser.groupId, parser.status, parser.groupName));
    }
}
