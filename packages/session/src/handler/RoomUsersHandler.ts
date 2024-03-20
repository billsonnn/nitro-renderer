import { IConnection, IRoomHandlerListener, IRoomUserData } from '@nitrots/api';
import { BotErrorEvent, ConfirmBreedingRequestEvent, ConfirmBreedingResultEvent, DoorbellMessageEvent, FavoriteMembershipUpdateMessageEvent, NestBreedingSuccessEvent, NewFriendRequestEvent, PetBreedingMessageEvent, PetBreedingResultEvent, PetFigureUpdateEvent, PetInfoEvent, PetLevelUpdateMessageEvent, PetPlacingErrorEvent, PetStatusUpdateEvent, RoomUnitDanceEvent, RoomUnitEvent, RoomUnitInfoEvent, RoomUnitRemoveEvent, UserCurrentBadgesEvent, UserNameChangeMessageEvent } from '@nitrots/communication';
import { GetEventDispatcher, RoomSessionConfirmPetBreedingEvent, RoomSessionConfirmPetBreedingResultEvent, RoomSessionDanceEvent, RoomSessionDoorbellEvent, RoomSessionErrorMessageEvent, RoomSessionFavoriteGroupUpdateEvent, RoomSessionFriendRequestEvent, RoomSessionNestBreedingSuccessEvent, RoomSessionPetBreedingEvent, RoomSessionPetBreedingResultEvent, RoomSessionPetFigureUpdateEvent, RoomSessionPetInfoUpdateEvent, RoomSessionPetLevelUpdateEvent, RoomSessionPetStatusUpdateEvent, RoomSessionUserBadgesEvent, RoomSessionUserDataUpdateEvent, RoomSessionUserFigureUpdateEvent } from '@nitrots/events';
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
        connection.addMessageEvent(new PetBreedingMessageEvent(this.onPetBreedingMessageEvent.bind(this)));
        connection.addMessageEvent(new PetLevelUpdateMessageEvent(this.onPetLevelUpdateMessageEvent.bind(this)));
        connection.addMessageEvent(new ConfirmBreedingResultEvent(this.onConfirmBreedingResultEvent.bind(this)));
        connection.addMessageEvent(new NestBreedingSuccessEvent(this.onNestBreedingSuccessEvent.bind(this)));
        connection.addMessageEvent(new ConfirmBreedingRequestEvent(this.onConfirmBreedingRequestEvent.bind(this)));
        connection.addMessageEvent(new PetFigureUpdateEvent(this.onPetFigureUpdateEvent.bind(this)));
        connection.addMessageEvent(new PetBreedingResultEvent(this.onPetBreedingResultEvent.bind(this)));
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

        const usersToAdd: IRoomUserData[] = [];

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

        GetEventDispatcher().dispatchEvent(new RoomSessionUserDataUpdateEvent(session, usersToAdd));
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

        GetEventDispatcher().dispatchEvent(new RoomSessionUserFigureUpdateEvent(session, parser.unitId, parser.figure, parser.gender, parser.motto, parser.achievementScore));

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

        GetEventDispatcher().dispatchEvent(new RoomSessionDanceEvent(session, parser.unitId, parser.danceId));
    }

    private onUserCurrentBadgesEvent(event: UserCurrentBadgesEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.setUserBadges(parser.userId, parser.badges);

        GetEventDispatcher().dispatchEvent(new RoomSessionUserBadgesEvent(session, parser.userId, parser.badges));
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

        GetEventDispatcher().dispatchEvent(new RoomSessionDoorbellEvent(RoomSessionDoorbellEvent.DOORBELL, session, username));
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

        GetEventDispatcher().dispatchEvent(new RoomSessionFriendRequestEvent(session, request.requestId, request.requesterUserId, request.requesterName));
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

        GetEventDispatcher().dispatchEvent(new RoomSessionPetInfoUpdateEvent(session, petData));
    }

    private onPetStatusUpdateEvent(event: PetStatusUpdateEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.updatePetBreedingStatus(parser.roomIndex, parser.canBreed, parser.canHarvest, parser.canRevive, parser.hasBreedingPermission);

        GetEventDispatcher().dispatchEvent(new RoomSessionPetStatusUpdateEvent(session, parser.petId, parser.canBreed, parser.canHarvest, parser.canRevive, parser.hasBreedingPermission));
    }

    private onPetBreedingMessageEvent(event: PetBreedingMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        GetEventDispatcher().dispatchEvent(new RoomSessionPetBreedingEvent(session, parser.state, parser.ownPetId, parser.otherPetId));
    }

    private onPetLevelUpdateMessageEvent(event: PetLevelUpdateMessageEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.userDataManager.updatePetLevel(parser.roomIndex, parser.level);

        GetEventDispatcher().dispatchEvent(new RoomSessionPetLevelUpdateEvent(session, parser.petId, parser.level));
    }

    private onConfirmBreedingResultEvent(event: ConfirmBreedingResultEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        GetEventDispatcher().dispatchEvent(new RoomSessionConfirmPetBreedingResultEvent(session, parser.breedingNestStuffId, parser.result));
    }

    private onNestBreedingSuccessEvent(event: NestBreedingSuccessEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        GetEventDispatcher().dispatchEvent(new RoomSessionNestBreedingSuccessEvent(session, parser.petId, parser.rarityCategory));
    }

    private onConfirmBreedingRequestEvent(event: ConfirmBreedingRequestEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        GetEventDispatcher().dispatchEvent(new RoomSessionConfirmPetBreedingEvent(session, parser.nestId, parser.pet1, parser.pet2, parser.rarityCategories, parser.resultPetType));
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

        GetEventDispatcher().dispatchEvent(new RoomSessionPetFigureUpdateEvent(session, parser.petId, figure));
    }

    private onPetBreedingResultEvent(event: PetBreedingResultEvent): void
    {
        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        GetEventDispatcher().dispatchEvent(new RoomSessionPetBreedingResultEvent(session, parser.resultData, parser.otherResultData));
    }

    private onPetPlacingError(event: PetPlacingErrorEvent): void
    {
        if(!event) return;

        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        let type: string = '';

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

        GetEventDispatcher().dispatchEvent(new RoomSessionErrorMessageEvent(type, session));
    }

    private onBotError(event: BotErrorEvent): void
    {
        if(!event) return;

        if(!this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        let type: string = '';

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

        GetEventDispatcher().dispatchEvent(new RoomSessionErrorMessageEvent(type, session));
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

        GetEventDispatcher().dispatchEvent(new RoomSessionFavoriteGroupUpdateEvent(session, parser.roomIndex, parser.groupId, parser.status, parser.groupName));
    }
}
