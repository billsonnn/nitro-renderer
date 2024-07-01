import { AvatarGuideStatus, IConnection, IRoomCreator, IVector3D, LegacyDataType, ObjectRolling, PetType, RoomObjectType, RoomObjectUserType, RoomObjectVariable } from '@nitrots/api';
import { AreaHideMessageEvent, DiceValueMessageEvent, FloorHeightMapEvent, FurnitureAliasesComposer, FurnitureAliasesEvent, FurnitureDataEvent, FurnitureFloorAddEvent, FurnitureFloorDataParser, FurnitureFloorEvent, FurnitureFloorRemoveEvent, FurnitureFloorUpdateEvent, FurnitureWallAddEvent, FurnitureWallDataParser, FurnitureWallEvent, FurnitureWallRemoveEvent, FurnitureWallUpdateEvent, GetCommunication, GetRoomEntryDataMessageComposer, GuideSessionEndedMessageEvent, GuideSessionErrorMessageEvent, GuideSessionStartedMessageEvent, IgnoreResultEvent, ItemDataUpdateMessageEvent, ObjectsDataUpdateEvent, ObjectsRollingEvent, OneWayDoorStatusMessageEvent, PetExperienceEvent, PetFigureUpdateEvent, RoomEntryTileMessageEvent, RoomEntryTileMessageParser, RoomHeightMapEvent, RoomHeightMapUpdateEvent, RoomPaintEvent, RoomReadyMessageEvent, RoomUnitChatEvent, RoomUnitChatShoutEvent, RoomUnitChatWhisperEvent, RoomUnitDanceEvent, RoomUnitEffectEvent, RoomUnitEvent, RoomUnitExpressionEvent, RoomUnitHandItemEvent, RoomUnitIdleEvent, RoomUnitInfoEvent, RoomUnitNumberEvent, RoomUnitRemoveEvent, RoomUnitStatusEvent, RoomUnitTypingEvent, RoomVisualizationSettingsEvent, UserInfoEvent, YouArePlayingGameEvent } from '@nitrots/communication';
import { GetRoomSessionManager, GetSessionDataManager } from '@nitrots/session';
import { Vector3d } from '@nitrots/utils';
import { GetRoomEngine } from './GetRoomEngine';
import { RoomVariableEnum } from './RoomVariableEnum';
import { RoomPlaneParser } from './object/RoomPlaneParser';
import { FurnitureStackingHeightMap, LegacyWallGeometry } from './utils';

export class RoomMessageHandler
{
    private _connection: IConnection = null;
    private _roomEngine: IRoomCreator = null;
    private _planeParser = new RoomPlaneParser();
    private _latestEntryTileEvent: RoomEntryTileMessageEvent = null;

    private _currentRoomId: number = 0;
    private _ownUserId: number = 0;
    private _initialConnection: boolean = true;
    private _guideId: number = -1;
    private _requesterId: number = -1;

    public async init(): Promise<void>
    {
        this._connection = GetCommunication().connection;
        this._roomEngine = GetRoomEngine();

        this._connection.addMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        this._connection.addMessageEvent(new RoomReadyMessageEvent(this.onRoomReadyMessageEvent.bind(this)));
        this._connection.addMessageEvent(new RoomPaintEvent(this.onRoomPaintEvent.bind(this)));
        this._connection.addMessageEvent(new FloorHeightMapEvent(this.onRoomModelEvent.bind(this)));
        this._connection.addMessageEvent(new RoomHeightMapEvent(this.onRoomHeightMapEvent.bind(this)));
        this._connection.addMessageEvent(new RoomHeightMapUpdateEvent(this.onRoomHeightMapUpdateEvent.bind(this)));
        this._connection.addMessageEvent(new RoomVisualizationSettingsEvent(this.onRoomThicknessEvent.bind(this)));
        this._connection.addMessageEvent(new RoomEntryTileMessageEvent(this.onRoomDoorEvent.bind(this)));
        this._connection.addMessageEvent(new ObjectsRollingEvent(this.onRoomRollingEvent.bind(this)));
        this._connection.addMessageEvent(new ObjectsDataUpdateEvent(this.onObjectsDataUpdateEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureAliasesEvent(this.onFurnitureAliasesEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureFloorAddEvent(this.onFurnitureFloorAddEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureFloorEvent(this.onFurnitureFloorEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureFloorRemoveEvent(this.onFurnitureFloorRemoveEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureFloorUpdateEvent(this.onFurnitureFloorUpdateEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureWallAddEvent(this.onFurnitureWallAddEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureWallEvent(this.onFurnitureWallEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureWallRemoveEvent(this.onFurnitureWallRemoveEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureWallUpdateEvent(this.onFurnitureWallUpdateEvent.bind(this)));
        this._connection.addMessageEvent(new FurnitureDataEvent(this.onFurnitureDataEvent.bind(this)));
        this._connection.addMessageEvent(new ItemDataUpdateMessageEvent(this.onItemDataUpdateMessageEvent.bind(this)));
        this._connection.addMessageEvent(new OneWayDoorStatusMessageEvent(this.onOneWayDoorStatusMessageEvent.bind(this)));
        this._connection.addMessageEvent(new AreaHideMessageEvent(this.onAreaHideMessageEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitDanceEvent(this.onRoomUnitDanceEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitEffectEvent(this.onRoomUnitEffectEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitEvent(this.onRoomUnitEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitExpressionEvent(this.onRoomUnitExpressionEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitHandItemEvent(this.onRoomUnitHandItemEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitIdleEvent(this.onRoomUnitIdleEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitInfoEvent(this.onRoomUnitInfoEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitNumberEvent(this.onRoomUnitNumberEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitRemoveEvent(this.onRoomUnitRemoveEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitStatusEvent(this.onRoomUnitStatusEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitChatEvent(this.onRoomUnitChatEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitChatShoutEvent(this.onRoomUnitChatEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitChatWhisperEvent(this.onRoomUnitChatEvent.bind(this)));
        this._connection.addMessageEvent(new RoomUnitTypingEvent(this.onRoomUnitTypingEvent.bind(this)));
        this._connection.addMessageEvent(new PetFigureUpdateEvent(this.onPetFigureUpdateEvent.bind(this)));
        this._connection.addMessageEvent(new PetExperienceEvent(this.onPetExperienceEvent.bind(this)));
        this._connection.addMessageEvent(new YouArePlayingGameEvent(this.onYouArePlayingGameEvent.bind(this)));
        this._connection.addMessageEvent(new DiceValueMessageEvent(this.onDiceValueMessageEvent.bind(this)));
        this._connection.addMessageEvent(new IgnoreResultEvent(this.onIgnoreResultEvent.bind(this)));
        this._connection.addMessageEvent(new GuideSessionStartedMessageEvent(this.onGuideSessionStartedMessageEvent.bind(this)));
        this._connection.addMessageEvent(new GuideSessionEndedMessageEvent(this.onGuideSessionEndedMessageEvent.bind(this)));
        this._connection.addMessageEvent(new GuideSessionErrorMessageEvent(this.onGuideSessionErrorMessageEvent.bind(this)));
    }

    public setRoomId(id: number): void
    {
        if(this._currentRoomId !== 0)
        {
            if(this._roomEngine) this._roomEngine.destroyRoom(this._currentRoomId);
        }

        this._currentRoomId = id;
        this._latestEntryTileEvent = null;
    }

    public clearRoomId(): void
    {
        this._currentRoomId = 0;
        this._latestEntryTileEvent = null;
    }

    private onUserInfoEvent(event: UserInfoEvent): void
    {
        if(!(event instanceof UserInfoEvent) || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        this._ownUserId = parser.userInfo.userId;
    }

    private onRoomReadyMessageEvent(event: RoomReadyMessageEvent): void
    {
        const parser = event.getParser();

        if(this._currentRoomId !== parser.roomId)
        {
            this.setRoomId(parser.roomId);
        }

        if(this._roomEngine)
        {
            this._roomEngine.setRoomInstanceModelName(parser.roomId, parser.name);
        }

        if(this._initialConnection)
        {
            event.connection.send(new FurnitureAliasesComposer());

            this._initialConnection = false;

            return;
        }

        event.connection.send(new GetRoomEntryDataMessageComposer());
    }

    private onRoomPaintEvent(event: RoomPaintEvent): void
    {
        if(!(event instanceof RoomPaintEvent)) return;

        const parser = event.getParser();

        if(!parser) return;

        const floorType = parser.floorType;
        const wallType = parser.wallType;
        const landscapeType = parser.landscapeType;

        if(this._roomEngine)
        {
            this._roomEngine.updateRoomInstancePlaneType(this._currentRoomId, floorType, wallType, landscapeType);
        }
    }

    private onRoomModelEvent(event: FloorHeightMapEvent): void
    {
        if(!(event instanceof FloorHeightMapEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        const wallGeometry = this._roomEngine.getLegacyWallGeometry(this._currentRoomId);

        if(!wallGeometry) return;

        this._planeParser.reset();

        const width = parser.width;
        const height = parser.height;

        this._planeParser.initializeTileMap(width, height);

        let entryTile: RoomEntryTileMessageParser = null;

        if(this._latestEntryTileEvent) entryTile = this._latestEntryTileEvent.getParser();

        let doorX = -1;
        let doorY = -1;
        let doorZ = 0;
        let doorDirection = 0;

        let y = 0;

        while(y < height)
        {
            let x = 0;

            while(x < width)
            {
                const tileHeight = parser.getHeight(x, y);

                if(((((y > 0) && (y < (height - 1))) || ((x > 0) && (x < (width - 1)))) && (!(tileHeight == RoomPlaneParser.TILE_BLOCKED))) && ((entryTile == null) || ((x == entryTile.x) && (y == entryTile.y))))
                {
                    if(((parser.getHeight(x, (y - 1)) == RoomPlaneParser.TILE_BLOCKED) && (parser.getHeight((x - 1), y) == RoomPlaneParser.TILE_BLOCKED)) && (parser.getHeight(x, (y + 1)) == RoomPlaneParser.TILE_BLOCKED))
                    {
                        doorX = (x + 0.5);
                        doorY = y;
                        doorZ = tileHeight;
                        doorDirection = 90;
                    }

                    if(((parser.getHeight(x, (y - 1)) == RoomPlaneParser.TILE_BLOCKED) && (parser.getHeight((x - 1), y) == RoomPlaneParser.TILE_BLOCKED)) && (parser.getHeight((x + 1), y) == RoomPlaneParser.TILE_BLOCKED))
                    {
                        doorX = x;
                        doorY = (y + 0.5);
                        doorZ = tileHeight;
                        doorDirection = 180;
                    }
                }

                this._planeParser.setTileHeight(x, y, tileHeight);

                x++;
            }

            y++;
        }

        this._planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), doorZ);
        this._planeParser.initializeFromTileData(parser.wallHeight);
        this._planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), (doorZ + this._planeParser.wallHeight));

        wallGeometry.scale = LegacyWallGeometry.DEFAULT_SCALE;
        wallGeometry.initialize(width, height, this._planeParser.floorHeight);

        let heightIterator = (parser.height - 1);

        while(heightIterator >= 0)
        {
            let widthIterator = (parser.width - 1);

            while(widthIterator >= 0)
            {
                wallGeometry.setHeight(widthIterator, heightIterator, this._planeParser.getTileHeight(widthIterator, heightIterator));
                widthIterator--;
            }

            heightIterator--;
        }

        const roomMap = this._planeParser.getMapData();

        roomMap.doors.push({
            x: doorX,
            y: doorY,
            z: doorZ,
            dir: doorDirection
        });

        this._roomEngine.createRoomInstance(this._currentRoomId, roomMap);
    }

    private onRoomHeightMapEvent(event: RoomHeightMapEvent): void
    {
        if(!(event instanceof RoomHeightMapEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        const width = parser.width;
        const height = parser.height;
        const heightMap = new FurnitureStackingHeightMap(width, height);

        let y = 0;

        while(y < height)
        {
            let x = 0;

            while(x < width)
            {
                heightMap.setTileHeight(x, y, parser.getTileHeight(x, y));
                heightMap.setStackingBlocked(x, y, parser.getStackingBlocked(x, y));
                heightMap.setIsRoomTile(x, y, parser.isRoomTile(x, y));

                x++;
            }

            y++;
        }

        this._roomEngine.setFurnitureStackingHeightMap(this._currentRoomId, heightMap);
    }

    private onRoomHeightMapUpdateEvent(event: RoomHeightMapUpdateEvent): void
    {
        if(!(event instanceof RoomHeightMapUpdateEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        const heightMap = this._roomEngine.getFurnitureStackingHeightMap(this._currentRoomId);

        if(!heightMap) return;

        while(parser.next())
        {
            heightMap.setTileHeight(parser.x, parser.y, parser.tileHeight());
            heightMap.setStackingBlocked(parser.x, parser.y, parser.isStackingBlocked());
            heightMap.setIsRoomTile(parser.x, parser.y, parser.isRoomTile());
        }

        this._roomEngine.refreshTileObjectMap(this._currentRoomId, 'RoomMessageHandler.onRoomHeightMapUpdateEvent()');
    }

    private onRoomThicknessEvent(event: RoomVisualizationSettingsEvent): void
    {
        if(!(event instanceof RoomVisualizationSettingsEvent)) return;

        const parser = event.getParser();

        if(!parser) return;

        const visibleWall = !parser.hideWalls;
        const visibleFloor = true;
        const thicknessWall = parser.thicknessWall;
        const thicknessFloor = parser.thicknessFloor;

        if(this._roomEngine)
        {
            this._roomEngine.updateRoomInstancePlaneVisibility(this._currentRoomId, visibleWall, visibleFloor);
            this._roomEngine.updateRoomInstancePlaneThickness(this._currentRoomId, thicknessWall, thicknessFloor);
        }
    }

    private onRoomDoorEvent(event: RoomEntryTileMessageEvent): void
    {
        if(!(event instanceof RoomEntryTileMessageEvent)) return;

        this._latestEntryTileEvent = event;
    }

    private onRoomRollingEvent(event: ObjectsRollingEvent): void
    {
        if(!(event instanceof ObjectsRollingEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        this._roomEngine.updateRoomObjectFloor(this._currentRoomId, parser.rollerId, null, null, 1, null);
        this._roomEngine.updateRoomObjectFloor(this._currentRoomId, parser.rollerId, null, null, 2, null);

        const furnitureRolling = parser.itemsRolling;

        if(furnitureRolling && furnitureRolling.length)
        {
            for(const rollData of furnitureRolling)
            {
                if(!rollData) continue;

                this._roomEngine.rollRoomObjectFloor(this._currentRoomId, rollData.id, rollData.location, rollData.targetLocation);
            }
        }

        const unitRollData = parser.unitRolling;

        if(unitRollData)
        {
            this._roomEngine.updateRoomObjectUserLocation(this._currentRoomId, unitRollData.id, unitRollData.location, unitRollData.targetLocation);

            const object = this._roomEngine.getRoomObjectUser(this._currentRoomId, unitRollData.id);

            if(object && object.type !== RoomObjectUserType.MONSTER_PLANT)
            {
                let posture = 'std';

                switch(unitRollData.movementType)
                {
                    case ObjectRolling.MOVE:
                        posture = 'mv';
                        break;
                    case ObjectRolling.SLIDE:
                        posture = 'std';
                        break;
                }

                this._roomEngine.updateRoomObjectUserPosture(this._currentRoomId, unitRollData.id, posture);
            }
        }
    }

    private onObjectsDataUpdateEvent(event: ObjectsDataUpdateEvent): void
    {
        if(!(event instanceof ObjectsDataUpdateEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        for(const object of parser.objects)
        {
            this._roomEngine.updateRoomObjectFloor(this._currentRoomId, object.id, null, null, object.state, object.data);
        }
    }

    private onFurnitureAliasesEvent(event: FurnitureAliasesEvent): void
    {
        if(!(event instanceof FurnitureAliasesEvent) || !event.connection || !this._roomEngine) return;

        const alises = event.getParser().aliases;

        this._connection.send(new GetRoomEntryDataMessageComposer());
    }

    private onFurnitureFloorAddEvent(event: FurnitureFloorAddEvent): void
    {
        if(!(event instanceof FurnitureFloorAddEvent) || !event.connection || !this._roomEngine) return;

        const item = event.getParser().item;

        if(!item) return;

        this.addRoomObjectFurnitureFloor(this._currentRoomId, item);
    }

    private onFurnitureFloorEvent(event: FurnitureFloorEvent): void
    {
        if(!(event instanceof FurnitureFloorEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        const totalObjects = parser.items.length;

        let iterator = 0;

        while(iterator < totalObjects)
        {
            const object = parser.items[iterator];

            if(object) this.addRoomObjectFurnitureFloor(this._currentRoomId, object);

            iterator++;
        }
    }

    private onFurnitureFloorRemoveEvent(event: FurnitureFloorRemoveEvent): void
    {
        if(!(event instanceof FurnitureFloorRemoveEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        if(parser.delay > 0)
        {
            setTimeout(() =>
            {
                this._roomEngine.removeRoomObjectFloor(this._currentRoomId, parser.itemId, (parser.isExpired) ? -1 : parser.userId, true);
            }, parser.delay);
        }
        else
        {
            this._roomEngine.removeRoomObjectFloor(this._currentRoomId, parser.itemId, (parser.isExpired) ? -1 : parser.userId, true);
        }
    }

    private onFurnitureFloorUpdateEvent(event: FurnitureFloorUpdateEvent): void
    {
        if(!(event instanceof FurnitureFloorUpdateEvent) || !event.connection || !this._roomEngine) return;

        const item = event.getParser().item;

        if(!item) return;

        const location: IVector3D = new Vector3d(item.x, item.y, item.z);
        const direction: IVector3D = new Vector3d(item.direction);

        this._roomEngine.updateRoomObjectFloor(this._currentRoomId, item.itemId, location, direction, item.data.state, item.data, item.extra);
        this._roomEngine.updateRoomObjectFloorHeight(this._currentRoomId, item.itemId, item.stackHeight);
        this._roomEngine.updateRoomObjectFloorExpiration(this._currentRoomId, item.itemId, item.expires);
    }

    private onFurnitureWallAddEvent(event: FurnitureWallAddEvent): void
    {
        if(!(event instanceof FurnitureWallAddEvent) || !event.connection || !this._roomEngine) return;

        const data = event.getParser().item;

        if(!data) return;

        this.addRoomObjectFurnitureWall(this._currentRoomId, data);
    }

    private onFurnitureWallEvent(event: FurnitureWallEvent): void
    {
        if(!(event instanceof FurnitureWallEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        const totalObjects = parser.items.length;

        let iterator = 0;

        while(iterator < totalObjects)
        {
            const data = parser.items[iterator];

            if(data) this.addRoomObjectFurnitureWall(this._currentRoomId, data);

            iterator++;
        }
    }

    private onFurnitureWallRemoveEvent(event: FurnitureWallRemoveEvent): void
    {
        if(!(event instanceof FurnitureWallRemoveEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        this._roomEngine.removeRoomObjectWall(this._currentRoomId, parser.itemId, parser.userId);
    }

    private onFurnitureWallUpdateEvent(event: FurnitureWallUpdateEvent): void
    {
        if(!(event instanceof FurnitureWallUpdateEvent) || !event.connection || !this._roomEngine) return;

        const wallGeometry = this._roomEngine.getLegacyWallGeometry(this._currentRoomId);

        if(!wallGeometry) return;

        const item = event.getParser().item;

        if(!item) return;

        const location = wallGeometry.getLocation(item.width, item.height, item.localX, item.localY, item.direction);
        const direction = new Vector3d(wallGeometry.getDirection(item.direction));

        this._roomEngine.updateRoomObjectWall(this._currentRoomId, item.itemId, location, direction, item.state, item.stuffData);
        this._roomEngine.updateRoomObjectWallExpiration(this._currentRoomId, item.itemId, item.secondsToExpiration);
    }

    private onFurnitureDataEvent(event: FurnitureDataEvent): void
    {
        if(!(event instanceof FurnitureDataEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        this._roomEngine.updateRoomObjectFloor(this._currentRoomId, parser.furnitureId, null, null, parser.objectData.state, parser.objectData);
    }

    private onItemDataUpdateMessageEvent(event: ItemDataUpdateMessageEvent): void
    {
        if(!(event instanceof ItemDataUpdateMessageEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        this._roomEngine.updateRoomObjectWallItemData(this._currentRoomId, parser.furnitureId, parser.data);
    }

    private onOneWayDoorStatusMessageEvent(event: OneWayDoorStatusMessageEvent): void
    {
        if(!(event instanceof OneWayDoorStatusMessageEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        this._roomEngine.updateRoomObjectFloor(this._currentRoomId, parser.itemId, null, null, parser.state, new LegacyDataType());
    }

    private onAreaHideMessageEvent(event: AreaHideMessageEvent): void
    {
        if(!(event instanceof AreaHideMessageEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();
        const areaData = parser.areaData;

        this._roomEngine.updateAreaHide(this._currentRoomId, areaData.furniId, areaData.on, areaData.rootX, areaData.rootY, areaData.width, areaData.length, areaData.invert);
    }

    private onDiceValueMessageEvent(event: DiceValueMessageEvent): void
    {
        if(!(event instanceof DiceValueMessageEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        this._roomEngine.updateRoomObjectFloor(this._currentRoomId, parser.itemId, null, null, parser.value, new LegacyDataType());
    }

    private onRoomUnitDanceEvent(event: RoomUnitDanceEvent): void
    {
        if(!(event instanceof RoomUnitDanceEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, event.getParser().unitId, RoomObjectVariable.FIGURE_DANCE, event.getParser().danceId);
    }

    private onRoomUnitEffectEvent(event: RoomUnitEffectEvent): void
    {
        if(!(event instanceof RoomUnitEffectEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserEffect(this._currentRoomId, event.getParser().unitId, event.getParser().effectId, event.getParser().delay);
    }

    private onRoomUnitEvent(event: RoomUnitEvent): void
    {
        if(!(event instanceof RoomUnitEvent) || !event.connection || !this._roomEngine) return;

        const users = event.getParser().users;

        if(!users || !users.length) return;

        for(const user of users)
        {
            if(!user) continue;

            const location = new Vector3d(user.x, user.y, user.z);
            const direction = new Vector3d(user.dir);

            this._roomEngine.addRoomObjectUser(this._currentRoomId, user.roomIndex, location, direction, user.dir, user.userType, user.figure);

            if(user.webID === this._ownUserId)
            {
                this._roomEngine.setRoomSessionOwnUser(this._currentRoomId, user.roomIndex);
                this._roomEngine.updateRoomObjectUserOwn(this._currentRoomId, user.roomIndex);
            }

            this._roomEngine.updateRoomObjectUserFigure(this._currentRoomId, user.roomIndex, user.figure, user.sex, user.subType, user.isRiding);

            if(RoomObjectUserType.getTypeString(user.userType) === RoomObjectUserType.PET)
            {
                if(this._roomEngine.getPetTypeId(user.figure) === PetType.MONSTERPLANT)
                {
                    this._roomEngine.updateRoomObjectUserPosture(this._currentRoomId, user.roomIndex, user.petPosture);
                }
            }

            this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, user.roomIndex, RoomObjectVariable.FIGURE_IS_MUTED, (GetSessionDataManager().isUserIgnored(user.name) ? 1 : 0));
        }

        this.updateGuideMarker();
    }

    private onRoomUnitExpressionEvent(event: RoomUnitExpressionEvent): void
    {
        if(!(event instanceof RoomUnitExpressionEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, event.getParser().unitId, RoomObjectVariable.FIGURE_EXPRESSION, event.getParser().expression);
    }

    private onRoomUnitHandItemEvent(event: RoomUnitHandItemEvent): void
    {
        if(!(event instanceof RoomUnitHandItemEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, event.getParser().unitId, RoomObjectVariable.FIGURE_CARRY_OBJECT, event.getParser().handId);
    }

    private onRoomUnitIdleEvent(event: RoomUnitIdleEvent): void
    {
        if(!(event instanceof RoomUnitIdleEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, event.getParser().unitId, RoomObjectVariable.FIGURE_SLEEP, (event.getParser().isIdle ? 1 : 0));
    }

    private onRoomUnitInfoEvent(event: RoomUnitInfoEvent): void
    {
        if(!(event instanceof RoomUnitInfoEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserFigure(this._currentRoomId, event.getParser().unitId, event.getParser().figure, event.getParser().gender);
    }

    private onRoomUnitNumberEvent(event: RoomUnitNumberEvent): void
    {
        if(!(event instanceof RoomUnitNumberEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, parser.unitId, RoomObjectVariable.FIGURE_NUMBER_VALUE, parser.value);
    }

    private onRoomUnitRemoveEvent(event: RoomUnitRemoveEvent): void
    {
        if(!(event instanceof RoomUnitRemoveEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.removeRoomObjectUser(this._currentRoomId, event.getParser().unitId);

        this.updateGuideMarker();
    }

    private onRoomUnitStatusEvent(event: RoomUnitStatusEvent): void
    {
        if(!(event instanceof RoomUnitStatusEvent) || !event.connection || !this._roomEngine) return;

        const statuses = event.getParser().statuses;

        if(!statuses || !statuses.length) return;

        const roomInstance = this._roomEngine.getRoomInstance(this._currentRoomId);

        if(!roomInstance) return;

        const zScale = (roomInstance.model.getValue<number>(RoomVariableEnum.ROOM_Z_SCALE) || 1);

        for(const status of statuses)
        {
            if(!status) continue;

            let height = status.height;

            if(height) height = (height / zScale);

            const location = new Vector3d(status.x, status.y, (status.z + height));
            const direction = new Vector3d(status.direction);

            let goal: IVector3D = null;

            if(status.didMove) goal = new Vector3d(status.targetX, status.targetY, status.targetZ);

            this._roomEngine.updateRoomObjectUserLocation(this._currentRoomId, status.id, location, goal, status.canStandUp, height, direction, status.headDirection);
            this._roomEngine.updateRoomObjectUserFlatControl(this._currentRoomId, status.id, null);

            let isPosture = true;
            let postureUpdate = false;
            let postureType = RoomObjectVariable.STD;
            let parameter = '';

            if(status.actions && status.actions.length)
            {
                for(const action of status.actions)
                {
                    if(!action) continue;

                    switch(action.action)
                    {
                        case 'flatctrl':
                            this._roomEngine.updateRoomObjectUserFlatControl(this._currentRoomId, status.id, action.value);
                            break;
                        case 'sign':
                            if(status.actions.length === 1) isPosture = false;

                            this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, status.id, RoomObjectVariable.FIGURE_SIGN, parseInt(action.value));
                            break;
                        case 'gst':
                            if(status.actions.length === 1) isPosture = false;

                            this._roomEngine.updateRoomObjectUserPetGesture(this._currentRoomId, status.id, action.value);
                            break;
                        case 'wav':
                        case 'mv':
                            postureUpdate = true;
                            postureType = action.action;
                            parameter = action.value;
                            break;
                        case 'trd': break;
                        default:
                            postureUpdate = true;
                            postureType = action.action;
                            parameter = action.value;
                            break;
                    }
                }
            }

            if(postureUpdate) this._roomEngine.updateRoomObjectUserPosture(this._currentRoomId, status.id, postureType, parameter);
            else if(isPosture) this._roomEngine.updateRoomObjectUserPosture(this._currentRoomId, status.id, RoomObjectVariable.STD, '');
        }

        this.updateGuideMarker();
    }

    private onRoomUnitChatEvent(event: RoomUnitChatEvent): void
    {
        if(!event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        this._roomEngine.updateRoomObjectUserGesture(this._currentRoomId, parser.roomIndex, parser.gesture);
        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, parser.roomIndex, RoomObjectVariable.FIGURE_TALK, (parser.message.length / 10));
    }

    private onRoomUnitTypingEvent(event: RoomUnitTypingEvent): void
    {
        if(!(event instanceof RoomUnitTypingEvent) || !event.connection || !this._roomEngine) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, event.getParser().unitId, RoomObjectVariable.FIGURE_IS_TYPING, event.getParser().isTyping ? 1 : 0);
    }

    private onPetFigureUpdateEvent(event: PetFigureUpdateEvent): void
    {
        if(!(event instanceof PetFigureUpdateEvent) || !event.connection || !this._roomEngine) return;

        const parser = event.getParser();

        if(!parser) return;

        this._roomEngine.updateRoomObjectUserFigure(this._currentRoomId, parser.roomIndex, parser.figureData.figuredata, '', '', parser.isRiding);
    }

    private onPetExperienceEvent(event: PetExperienceEvent): void
    {
        const parser = event.getParser();

        if(!parser) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, parser.roomIndex, RoomObjectVariable.FIGURE_GAINED_EXPERIENCE, parser.gainedExperience);
    }

    private onYouArePlayingGameEvent(event: YouArePlayingGameEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._roomEngine.setRoomEngineGameMode(this._currentRoomId, parser.isPlaying);
    }

    private addRoomObjectFurnitureFloor(roomId: number, data: FurnitureFloorDataParser): void
    {
        if(!data || !this._roomEngine) return;

        const location = new Vector3d(data.x, data.y, data.z);
        const direction = new Vector3d(data.direction);

        if(data.spriteName)
        {
            this._roomEngine.addFurnitureFloorByTypeName(roomId, data.itemId, data.spriteName, location, direction, data.state, data.data, data.extra, data.expires, data.usagePolicy, data.userId, data.username, true, true, data.stackHeight);
        }
        else
        {
            this._roomEngine.addFurnitureFloor(roomId, data.itemId, data.spriteId, location, direction, data.state, data.data, data.extra, data.expires, data.usagePolicy, data.userId, data.username, true, true, data.stackHeight);
        }
    }

    private addRoomObjectFurnitureWall(roomId: number, data: FurnitureWallDataParser): void
    {
        if(!data || !this._roomEngine) return;

        const wallGeometry = this._roomEngine.getLegacyWallGeometry(roomId);

        if(!wallGeometry) return;

        let location: IVector3D = null;

        if(!data.isOldFormat)
        {
            location = wallGeometry.getLocation(data.width, data.height, data.localX, data.localY, data.direction);
        }
        else
        {
            //location = wallGeometry.getLocationOldFormat(data.y, data.z, data.direction);
        }

        const direction = new Vector3d(wallGeometry.getDirection(data.direction));

        this._roomEngine.addFurnitureWall(roomId, data.itemId, data.spriteId, location, direction, data.state, data.stuffData, data.secondsToExpiration, data.usagePolicy, data.userId, data.username);
    }

    private onIgnoreResultEvent(event: IgnoreResultEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        const roomSession = GetRoomSessionManager().getSession(this._currentRoomId);

        if(!roomSession) return;

        const userData = roomSession.userDataManager.getUserDataByName(parser.name);

        if(!userData) return;

        switch(parser.result)
        {
            case 1:
            case 2:
                this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, userData.roomIndex, RoomObjectVariable.FIGURE_IS_MUTED, 1);
                return;
            case 3:
                this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, userData.roomIndex, RoomObjectVariable.FIGURE_IS_MUTED, 0);
                return;
        }
    }

    private onGuideSessionStartedMessageEvent(event: GuideSessionStartedMessageEvent): void
    {
        const parser = event.getParser();

        this._guideId = parser.guideUserId;
        this._requesterId = parser.requesterUserId;

        this.updateGuideMarker();
    }

    private onGuideSessionEndedMessageEvent(k: GuideSessionEndedMessageEvent): void
    {
        this.removeGuideMarker();
    }

    private onGuideSessionErrorMessageEvent(k: GuideSessionErrorMessageEvent): void
    {
        this.removeGuideMarker();
    }

    private updateGuideMarker(): void
    {
        const userId = GetSessionDataManager().userId;

        this.setUserGuideStatus(this._guideId, ((this._requesterId === userId) ? AvatarGuideStatus.GUIDE : AvatarGuideStatus.NONE));
        this.setUserGuideStatus(this._requesterId, ((this._guideId === userId) ? AvatarGuideStatus.REQUESTER : AvatarGuideStatus.NONE));
    }

    private removeGuideMarker(): void
    {
        this.setUserGuideStatus(this._guideId, AvatarGuideStatus.NONE);
        this.setUserGuideStatus(this._requesterId, AvatarGuideStatus.NONE);

        this._guideId = -1;
        this._requesterId = -1;
    }

    private setUserGuideStatus(userId: number, status: number): void
    {
        const roomSession = GetRoomSessionManager().getSession(this._currentRoomId);

        if(!roomSession) return;

        const userData = roomSession.userDataManager.getDataByType(userId, RoomObjectType.USER);

        if(!userData) return;

        this._roomEngine.updateRoomObjectUserAction(this._currentRoomId, userData.roomIndex, RoomObjectVariable.FIGURE_GUIDE_STATUS, status);
    }

    // public _SafeStr_10580(event:_SafeStr_2242): void
    // {
    //     var arrayIndex: number;
    //     var discoColours:Array;
    //     var discoTimer:Timer;
    //     var eventParser:_SafeStr_4576 = (event.parser as _SafeStr_4576);
    //     switch (eventParser._SafeStr_7025)
    //     {
    //         case 0:
    //             _SafeStr_4588.init(250, 5000);
    //             _SafeStr_4588._SafeStr_6766();
    //             return;
    //         case 1:
    //             _SafeStr_4231.init(250, 5000);
    //             _SafeStr_4231._SafeStr_6766();
    //             return;
    //         case 2:
    //             NitroEventDispatcher.dispatchEvent(new _SafeStr_2821(this._SafeStr_10593, -1, true));
    //             return;
    //         case 3:
    //             arrayIndex = 0;
    //             discoColours = [29371, 16731195, 16764980, 0x99FF00, 29371, 16731195, 16764980, 0x99FF00, 0];
    //             discoTimer = new Timer(1000, (discoColours.length + 1));
    //             discoTimer.addEventListener(TimerEvent.TIMER, function (k:TimerEvent): void
    //             {
    //                 if (arrayIndex == discoColours.length)
    //                 {
    //                     _SafeStr_10592._SafeStr_21164(_SafeStr_10593, discoColours[arrayIndex++], 176, true);
    //                 } else
    //                 {
    //                     _SafeStr_10592._SafeStr_21164(_SafeStr_10593, discoColours[arrayIndex++], 176, false);
    //                 };
    //             });
    //             discoTimer.start();
    //             return;
    //     };
    // }

    public get currentRoomId(): number
    {
        return this._currentRoomId;
    }
}
