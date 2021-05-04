import { IMessageConfiguration } from '../../core/communication/messages/IMessageConfiguration';
import { AvailabilityStatusMessageEvent } from './messages/incoming/availability/AvailabilityStatusMessageEvent';
import { ChangeNameUpdateEvent } from './messages/incoming/avatar/ChangeNameUpdateEvent';
import { CatalogClubEvent } from './messages/incoming/catalog/CatalogClubEvent';
import { CatalogClubGiftsEvent } from './messages/incoming/catalog/CatalogClubGiftsEvent';
import { CatalogGiftConfigurationEvent } from './messages/incoming/catalog/CatalogGiftConfigurationEvent';
import { CatalogGiftUsernameUnavailableEvent } from './messages/incoming/catalog/CatalogGiftUsernameUnavailableEvent';
import { CatalogGroupsEvent } from './messages/incoming/catalog/CatalogGroupsEvent';
import { CatalogModeEvent } from './messages/incoming/catalog/CatalogModeEvent';
import { CatalogPageEvent } from './messages/incoming/catalog/CatalogPageEvent';
import { CatalogPagesEvent } from './messages/incoming/catalog/CatalogPagesEvent';
import { CatalogPurchaseEvent } from './messages/incoming/catalog/CatalogPurchaseEvent';
import { CatalogPurchaseFailedEvent } from './messages/incoming/catalog/CatalogPurchaseFailedEvent';
import { CatalogPurchaseUnavailableEvent } from './messages/incoming/catalog/CatalogPurchaseUnavailableEvent';
import { CatalogRedeemVoucherErrorEvent } from './messages/incoming/catalog/CatalogRedeemVoucherErrorEvent';
import { CatalogRedeemVoucherOkEvent } from './messages/incoming/catalog/CatalogRedeemVoucherOkEvent';
import { CatalogSearchEvent } from './messages/incoming/catalog/CatalogSearchEvent';
import { CatalogSoldOutEvent } from './messages/incoming/catalog/CatalogSoldOutEvent';
import { CatalogUpdatedEvent } from './messages/incoming/catalog/CatalogUpdatedEvent';
import { ClientPingEvent } from './messages/incoming/client/ClientPingEvent';
import { DesktopViewEvent } from './messages/incoming/desktop/DesktopViewEvent';
import { AcceptFriendResultEvent } from './messages/incoming/friendlist/AcceptFriendResultEvent';
import { FindFriendsProcessResultEvent } from './messages/incoming/friendlist/FindFriendsProcessResultEvent';
import { FollowFriendFailedEvent } from './messages/incoming/friendlist/FollowFriendFailedEvent';
import { FriendListFragmentEvent } from './messages/incoming/friendlist/FriendListFragmentEvent';
import { FriendListUpdateEvent } from './messages/incoming/friendlist/FriendListUpdateEvent';
import { FriendNotificationEvent } from './messages/incoming/friendlist/FriendNotificationEvent';
import { FriendRequestsEvent } from './messages/incoming/friendlist/FriendRequestsEvent';
import { HabboSearchResultEvent } from './messages/incoming/friendlist/HabboSearchResultEvent';
import { InstantMessageErrorEvent } from './messages/incoming/friendlist/InstantMessageErrorEvent';
import { MessageErrorEvent } from './messages/incoming/friendlist/MessageErrorEvent';
import { MessengerInitEvent } from './messages/incoming/friendlist/MessengerInitEvent';
import { MiniMailNewMessageEvent } from './messages/incoming/friendlist/MiniMailNewMessageEvent';
import { NewConsoleMessageEvent } from './messages/incoming/friendlist/NewConsoleMessageEvent';
import { NewFriendRequestEvent } from './messages/incoming/friendlist/NewFriendRequestEvent';
import { RoomInviteErrorEvent } from './messages/incoming/friendlist/RoomInviteErrorEvent';
import { RoomInviteEvent } from './messages/incoming/friendlist/RoomInviteEvent';
import { LoadGameUrlEvent } from './messages/incoming/game/LoadGameUrlEvent';
import { GenericErrorEvent } from './messages/incoming/generic/GenericErrorEvent';
import { GroupBadgePartsEvent } from './messages/incoming/group/GroupBadgePartsEvent';
import { GroupBuyDataEvent } from './messages/incoming/group/GroupBuyDataEvent';
import { GroupConfirmMemberRemoveEvent } from './messages/incoming/group/GroupConfirmMemberRemoveEvent';
import { GroupInformationEvent } from './messages/incoming/group/GroupInformationEvent';
import { GroupMembersEvent } from './messages/incoming/group/GroupMembersEvent';
import { GroupSettingsEvent } from './messages/incoming/group/GroupSettingsEvent';
import { CallForHelpResultMessageEvent } from './messages/incoming/help/CallForHelpResultMessageEvent';
import { IncomingHeader } from './messages/incoming/IncomingHeader';
import { AchievementEvent } from './messages/incoming/inventory/achievements/AchievementEvent';
import { AchievementsEvent } from './messages/incoming/inventory/achievements/AchievementsEvent';
import { AchievementsScoreEvent } from './messages/incoming/inventory/achievements/AchievementsScoreEvent';
import { AvatarEffectActivatedEvent } from './messages/incoming/inventory/avatareffect/AvatarEffectActivatedEvent';
import { AvatarEffectAddedEvent } from './messages/incoming/inventory/avatareffect/AvatarEffectAddedEvent';
import { AvatarEffectExpiredEvent } from './messages/incoming/inventory/avatareffect/AvatarEffectExpiredEvent';
import { AvatarEffectsEvent } from './messages/incoming/inventory/avatareffect/AvatarEffectsEvent';
import { BadgesEvent } from './messages/incoming/inventory/badges/BadgesEvent';
import { BotAddedToInventoryEvent } from './messages/incoming/inventory/bots/BotAddedToInventoryEvent';
import { BotInventoryMessageEvent } from './messages/incoming/inventory/bots/BotInventoryMessageEvent';
import { BotRemovedFromInventoryEvent } from './messages/incoming/inventory/bots/BotRemovedFromInventoryEvent';
import { FigureSetIdsMessageEvent } from './messages/incoming/inventory/clothes/FigureSetIdsMessageEvent';
import { FurnitureListAddOrUpdateEvent } from './messages/incoming/inventory/furni/FurnitureListAddOrUpdateEvent';
import { FurnitureListEvent } from './messages/incoming/inventory/furni/FurnitureListEvent';
import { FurnitureListInvalidateEvent } from './messages/incoming/inventory/furni/FurnitureListInvalidateEvent';
import { FurnitureListRemovedEvent } from './messages/incoming/inventory/furni/FurnitureListRemovedEvent';
import { FurniturePostItPlacedEvent } from './messages/incoming/inventory/furni/FurniturePostItPlacedEvent';
import { FurnitureGiftOpenedEvent } from './messages/incoming/inventory/furni/gifts/FurnitureGiftOpenedEvent';
import { PetAddedToInventoryEvent } from './messages/incoming/inventory/pets/PetAddedToInventoryEvent';
import { PetInventoryEvent } from './messages/incoming/inventory/pets/PetInventoryEvent';
import { PetRemovedFromInventory } from './messages/incoming/inventory/pets/PetRemovedFromInventoryEvent';
import { TradingAcceptEvent } from './messages/incoming/inventory/trading/TradingAcceptEvent';
import { TradingCloseEvent } from './messages/incoming/inventory/trading/TradingCloseEvent';
import { TradingCompletedEvent } from './messages/incoming/inventory/trading/TradingCompletedEvent';
import { TradingConfirmationEvent } from './messages/incoming/inventory/trading/TradingConfirmationEvent';
import { TradingListItemEvent } from './messages/incoming/inventory/trading/TradingListItemEvent';
import { TradingNotOpenEvent } from './messages/incoming/inventory/trading/TradingNotOpenEvent';
import { TradingOpenEvent } from './messages/incoming/inventory/trading/TradingOpenEvent';
import { TradingOpenFailedEvent } from './messages/incoming/inventory/trading/TradingOpenFailedEvent';
import { TradingOtherNotAllowedEvent } from './messages/incoming/inventory/trading/TradingOtherNotAllowedEvent';
import { TradingYouAreNotAllowedEvent } from './messages/incoming/inventory/trading/TradingYouAreNotAllowedEvent';
import { ModeratorMessageEvent } from './messages/incoming/moderation/ModeratorMessageEvent';
import { ModtoolCallForHelpTopicsEvent } from './messages/incoming/modtool/ModtoolCallForHelpTopicsEvent';
import { ModtoolMainEvent } from './messages/incoming/modtool/ModtoolMainEvent';
import { ModtoolReceivedRoomsUserEvent } from './messages/incoming/modtool/ModtoolReceivedRoomsUserEvent';
import { ModtoolRoomChatlogEvent } from './messages/incoming/modtool/ModtoolRoomChatlogEvent';
import { ModtoolRoomInfoEvent } from './messages/incoming/modtool/ModtoolRoomInfoEvent';
import { ModtoolUserChatlogEvent } from './messages/incoming/modtool/ModtoolUserChatlogEvent';
import { ModtoolUserInfoEvent } from './messages/incoming/modtool/ModtoolUserInfoEvent';
import { NavigatorCategoriesEvent } from './messages/incoming/navigator/NavigatorCategoriesEvent';
import { NavigatorCollapsedEvent } from './messages/incoming/navigator/NavigatorCollapsedEvent';
import { NavigatorEventCategoriesEvent } from './messages/incoming/navigator/NavigatorEventCategoriesEvent';
import { NavigatorHomeRoomEvent } from './messages/incoming/navigator/NavigatorHomeRoomEvent';
import { NavigatorLiftedEvent } from './messages/incoming/navigator/NavigatorLiftedEvent';
import { NavigatorMetadataEvent } from './messages/incoming/navigator/NavigatorMetadataEvent';
import { NavigatorOpenRoomCreatorEvent } from './messages/incoming/navigator/NavigatorOpenRoomCreatorEvent';
import { NavigatorSearchesEvent } from './messages/incoming/navigator/NavigatorSearchesEvent';
import { NavigatorSearchEvent } from './messages/incoming/navigator/NavigatorSearchEvent';
import { NavigatorSettingsEvent } from './messages/incoming/navigator/NavigatorSettingsEvent';
import { BotErrorEvent } from './messages/incoming/notifications/BotErrorEvent';
import { HabboBroadcastMessageEvent } from './messages/incoming/notifications/HabboBroadcastMessageEvent';
import { HotelWillShutdownEvent } from './messages/incoming/notifications/HotelWillShutdownEvent';
import { MOTDNotificationEvent } from './messages/incoming/notifications/MOTDNotificationEvent';
import { NotificationDialogMessageEvent } from './messages/incoming/notifications/NotificationDialogMessageEvent';
import { PetPlacingErrorEvent } from './messages/incoming/notifications/PetPlacingErrorEvent';
import { RespectReceivedEvent } from './messages/incoming/notifications/RespectReceivedEvent';
import { UnseenItemsEvent } from './messages/incoming/notifications/UnseenItemsEvent';
import { RoomDoorbellAcceptedEvent } from './messages/incoming/room/access/doorbell/RoomDoorbellAcceptedEvent';
import { RoomDoorbellEvent } from './messages/incoming/room/access/doorbell/RoomDoorbellEvent';
import { RoomDoorbellRejectedEvent } from './messages/incoming/room/access/doorbell/RoomDoorbellRejectedEvent';
import { RoomRightsClearEvent } from './messages/incoming/room/access/rights/RoomRightsClearEvent';
import { RoomRightsEvent } from './messages/incoming/room/access/rights/RoomRightsEvent';
import { RoomRightsOwnerEvent } from './messages/incoming/room/access/rights/RoomRightsOwnerEvent';
import { RoomEnterErrorEvent } from './messages/incoming/room/access/RoomEnterErrorEvent';
import { RoomEnterEvent } from './messages/incoming/room/access/RoomEnterEvent';
import { RoomForwardEvent } from './messages/incoming/room/access/RoomForwardEvent';
import { BotCommandConfigurationEvent } from './messages/incoming/room/bots/BotCommandConfigurationEvent';
import { RoomBannedUsersEvent } from './messages/incoming/room/data/RoomBannedUsersEvent';
import { RoomChatSettingsEvent } from './messages/incoming/room/data/RoomChatSettingsEvent';
import { RoomInfoEvent } from './messages/incoming/room/data/RoomInfoEvent';
import { RoomInfoOwnerEvent } from './messages/incoming/room/data/RoomInfoOwnerEvent';
import { RoomScoreEvent } from './messages/incoming/room/data/RoomScoreEvent';
import { RoomSettingsErrorEvent } from './messages/incoming/room/data/RoomSettingsErrorEvent';
import { RoomSettingsEvent } from './messages/incoming/room/data/RoomSettingsEvent';
import { RoomSettingsSavedEvent } from './messages/incoming/room/data/RoomSettingsSavedEvent';
import { RoomSettingsUpdatedEvent } from './messages/incoming/room/data/RoomSettingsUpdatedEvent';
import { RoomUsersWithRightsEvent } from './messages/incoming/room/data/RoomUsersWithRightsEvent';
import { ObjectsRollingEvent } from './messages/incoming/room/engine/ObjectsRollingEvent';
import { RoomCreatedEvent } from './messages/incoming/room/engine/RoomCreatedEvent';
import { FurnitureFloorAddEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorAddEvent';
import { FurnitureFloorEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorEvent';
import { FurnitureFloorRemoveEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorRemoveEvent';
import { FurnitureFloorUpdateEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorUpdateEvent';
import { FurnitureAliasesEvent } from './messages/incoming/room/furniture/FurnitureAliasesEvent';
import { FurnitureDataEvent } from './messages/incoming/room/furniture/FurnitureDataEvent';
import { FurnitureItemDataEvent } from './messages/incoming/room/furniture/FurnitureItemDataEvent';
import { FurnitureStackHeightEvent } from './messages/incoming/room/furniture/FurnitureStackHeightEvent';
import { FurnitureState2Event } from './messages/incoming/room/furniture/FurnitureState2Event';
import { FurnitureStateEvent } from './messages/incoming/room/furniture/FurnitureStateEvent';
import { LoveLockFurniFinishedEvent } from './messages/incoming/room/furniture/LoveLockFurniFinishedEvent';
import { LoveLockFurniFriendConfirmedEvent } from './messages/incoming/room/furniture/LoveLockFurniFriendConfirmedEvent';
import { LoveLockFurniStartEvent } from './messages/incoming/room/furniture/LoveLockFurniStartEvent';
import { RoomDimmerPresetsEvent } from './messages/incoming/room/furniture/RoomDimmerPresetsMessageEvent';
import { FurnitureWallAddEvent } from './messages/incoming/room/furniture/wall/FurnitureWallAddEvent';
import { FurnitureWallEvent } from './messages/incoming/room/furniture/wall/FurnitureWallEvent';
import { FurnitureWallRemoveEvent } from './messages/incoming/room/furniture/wall/FurnitureWallRemoveEvent';
import { FurnitureWallUpdateEvent } from './messages/incoming/room/furniture/wall/FurnitureWallUpdateEvent';
import { RoomBlockedTilesEvent } from './messages/incoming/room/mapping/RoomBlockedTilesEvent';
import { RoomDoorEvent } from './messages/incoming/room/mapping/RoomDoorEvent';
import { RoomHeightMapEvent } from './messages/incoming/room/mapping/RoomHeightMapEvent';
import { RoomHeightMapUpdateEvent } from './messages/incoming/room/mapping/RoomHeightMapUpdateEvent';
import { RoomModelEvent } from './messages/incoming/room/mapping/RoomModelEvent';
import { RoomModelNameEvent } from './messages/incoming/room/mapping/RoomModelNameEvent';
import { RoomPaintEvent } from './messages/incoming/room/mapping/RoomPaintEvent';
import { RoomThicknessEvent } from './messages/incoming/room/mapping/RoomThicknessEvent';
import { PetFigureUpdateEvent } from './messages/incoming/room/pet/PetFigureUpdateEvent';
import { PetInfoEvent } from './messages/incoming/room/pet/PetInfoEvent';
import { YouArePlayingGameEvent } from './messages/incoming/room/session/YouArePlayingGameEvent';
import { FloodControlEvent } from './messages/incoming/room/unit/chat/FloodControlEvent';
import { RemainingMuteEvent } from './messages/incoming/room/unit/chat/RemainingMuteEvent';
import { RoomUnitChatEvent } from './messages/incoming/room/unit/chat/RoomUnitChatEvent';
import { RoomUnitChatShoutEvent } from './messages/incoming/room/unit/chat/RoomUnitChatShoutEvent';
import { RoomUnitChatWhisperEvent } from './messages/incoming/room/unit/chat/RoomUnitChatWhisperEvent';
import { RoomUnitTypingEvent } from './messages/incoming/room/unit/chat/RoomUnitTypingEvent';
import { RoomUnitDanceEvent } from './messages/incoming/room/unit/RoomUnitDanceEvent';
import { RoomUnitEffectEvent } from './messages/incoming/room/unit/RoomUnitEffectEvent';
import { RoomUnitEvent } from './messages/incoming/room/unit/RoomUnitEvent';
import { RoomUnitExpressionEvent } from './messages/incoming/room/unit/RoomUnitExpressionEvent';
import { RoomUnitHandItemEvent } from './messages/incoming/room/unit/RoomUnitHandItemEvent';
import { RoomUnitHandItemReceivedEvent } from './messages/incoming/room/unit/RoomUnitHandItemReceivedEvent';
import { RoomUnitIdleEvent } from './messages/incoming/room/unit/RoomUnitIdleEvent';
import { RoomUnitInfoEvent } from './messages/incoming/room/unit/RoomUnitInfoEvent';
import { RoomUnitNumberEvent } from './messages/incoming/room/unit/RoomUnitNumberEvent';
import { RoomUnitRemoveEvent } from './messages/incoming/room/unit/RoomUnitRemoveEvent';
import { RoomUnitStatusEvent } from './messages/incoming/room/unit/RoomUnitStatusEvent';
import { RoomMutedEvent } from './messages/incoming/roomevents/RoomMutedEvent';
import { WiredFurniActionEvent } from './messages/incoming/roomevents/WiredFurniActionEvent';
import { WiredFurniConditionEvent } from './messages/incoming/roomevents/WiredFurniConditionEvent';
import { WiredFurniTriggerEvent } from './messages/incoming/roomevents/WiredFurniTriggerEvent';
import { WiredOpenEvent } from './messages/incoming/roomevents/WiredOpenEvent';
import { WiredRewardResultMessageEvent } from './messages/incoming/roomevents/WiredRewardResultMessageEvent';
import { WiredSaveSuccessEvent } from './messages/incoming/roomevents/WiredSaveSuccessEvent';
import { WiredValidationErrorEvent } from './messages/incoming/roomevents/WiredValidationErrorEvent';
import { AuthenticatedEvent } from './messages/incoming/security/AuthenticatedEvent';
import { UserPerksEvent } from './messages/incoming/user/access/UserPerksEvent';
import { UserPermissionsEvent } from './messages/incoming/user/access/UserPermissionsEvent';
import { UserCurrentBadgesEvent } from './messages/incoming/user/data/UserCurrentBadgesEvent';
import { UserFigureEvent } from './messages/incoming/user/data/UserFigureEvent';
import { UserInfoEvent } from './messages/incoming/user/data/UserInfoEvent';
import { UserNameChangeMessageEvent } from './messages/incoming/user/data/UserNameChangeMessageEvent';
import { UserProfileEvent } from './messages/incoming/user/data/UserProfileEvent';
import { UserRelationshipsEvent } from './messages/incoming/user/data/UserRelationshipsEvent';
import { UserSettingsEvent } from './messages/incoming/user/data/UserSettingsEvent';
import { IgnoredUsersEvent } from './messages/incoming/user/IgnoredUsersEvent';
import { IgnoreResultEvent } from './messages/incoming/user/IgnoreResultEvent';
import { InClientLinkEvent } from './messages/incoming/user/InClientLinkEvent';
import { UserCreditsEvent } from './messages/incoming/user/inventory/currency/UserCreditsEvent';
import { UserCurrencyEvent } from './messages/incoming/user/inventory/currency/UserCurrencyEvent';
import { UserCurrencyUpdateEvent } from './messages/incoming/user/inventory/currency/UserCurrencyUpdateEvent';
import { UserSubscriptionEvent } from './messages/incoming/user/inventory/subscription/UserSubscriptionEvent';
import { UserWardrobePageEvent } from './messages/incoming/user/wardrobe/UserWardrobePageEvent';
import { RequestAchievementsMessageComposer } from './messages/outgoing/achievements/RequestAchievementsMessageComposer';
import { CatalogGroupsComposer } from './messages/outgoing/catalog/CatalogGroupsComposer';
import { CatalogModeComposer } from './messages/outgoing/catalog/CatalogModeComposer';
import { CatalogPageComposer } from './messages/outgoing/catalog/CatalogPageComposer';
import { CatalogPurchaseComposer } from './messages/outgoing/catalog/CatalogPurchaseComposer';
import { CatalogPurchaseGiftComposer } from './messages/outgoing/catalog/CatalogPurchaseGiftComposer';
import { CatalogRequestGiftConfigurationComposer } from './messages/outgoing/catalog/CatalogRequestGiftConfigurationComposer';
import { CatalogRequestVipGiftsComposer } from './messages/outgoing/catalog/CatalogRequestVipGiftsComposer';
import { CatalogRequestVipOffersComposer } from './messages/outgoing/catalog/CatalogRequestVipOffersComposer';
import { CatalogSearchComposer } from './messages/outgoing/catalog/CatalogSearchComposer';
import { CatalogSelectClubGiftComposer } from './messages/outgoing/catalog/CatalogSelectClubGiftComposer';
import { RedeemItemClothingComposer } from './messages/outgoing/catalog/RedeemItemClothingComposer';
import { CatalogRedeemVoucherComposer } from './messages/outgoing/catalog/RedeemVoucherComposer';
import { ClientPongComposer } from './messages/outgoing/client/ClientPongComposer';
import { ClientReleaseVersionComposer } from './messages/outgoing/client/ClientReleaseVersionComposer';
import { DesktopViewComposer } from './messages/outgoing/desktop/DesktopViewComposer';
import { AcceptFriendComposer } from './messages/outgoing/friendlist/AcceptFriendComposer';
import { DeclineFriendComposer } from './messages/outgoing/friendlist/DeclineFriendComposer';
import { FindNewFriendsComposer } from './messages/outgoing/friendlist/FindNewFriendsComposer';
import { FollowFriendComposer } from './messages/outgoing/friendlist/FollowFriendComposer';
import { FriendListUpdateComposer } from './messages/outgoing/friendlist/FriendListUpdateComposer';
import { GetFriendRequestsComposer } from './messages/outgoing/friendlist/GetFriendRequestsComposer';
import { HabboSearchComposer } from './messages/outgoing/friendlist/HabboSearchComposer';
import { MessengerInitComposer } from './messages/outgoing/friendlist/MessengerInitComposer';
import { RemoveFriendComposer } from './messages/outgoing/friendlist/RemoveFriendComposer';
import { RequestFriendComposer } from './messages/outgoing/friendlist/RequestFriendComposer';
import { SendMessageComposer } from './messages/outgoing/friendlist/SendMessageComposer';
import { SendRoomInviteComposer } from './messages/outgoing/friendlist/SendRoomInviteComposer';
import { SetRelationshipStatusComposer } from './messages/outgoing/friendlist/SetRelationshipStatusComposer';
import { VisitUserComposer } from './messages/outgoing/friendlist/VisitUserComposer';
import { GroupAdminGiveComposer } from './messages/outgoing/group/GroupAdminGiveComposer';
import { GroupAdminTakeComposer } from './messages/outgoing/group/GroupAdminTakeComposer';
import { GroupBadgePartsComposer } from './messages/outgoing/group/GroupBadgePartsComposer';
import { GroupBuyComposer } from './messages/outgoing/group/GroupBuyComposer';
import { GroupBuyDataComposer } from './messages/outgoing/group/GroupBuyDataComposer';
import { GroupConfirmRemoveMemberComposer } from './messages/outgoing/group/GroupConfirmRemoveMemberComposer';
import { GroupDeleteComposer } from './messages/outgoing/group/GroupDeleteComposer';
import { GroupInformationComposer } from './messages/outgoing/group/GroupInformationComposer';
import { GroupJoinComposer } from './messages/outgoing/group/GroupJoinComposer';
import { GroupMembersComposer } from './messages/outgoing/group/GroupMembersComposer';
import { GroupMembershipAcceptComposer } from './messages/outgoing/group/GroupMembershipAcceptComposer';
import { GroupMembershipDeclineComposer } from './messages/outgoing/group/GroupMembershipDeclineComposer';
import { GroupRemoveMemberComposer } from './messages/outgoing/group/GroupRemoveMemberComposer';
import { GroupSaveBadgeComposer } from './messages/outgoing/group/GroupSaveBadgeComposer';
import { GroupSaveColorsComposer } from './messages/outgoing/group/GroupSaveColorsComposer';
import { GroupSaveInformationComposer } from './messages/outgoing/group/GroupSaveInformationComposer';
import { GroupSavePreferencesComposer } from './messages/outgoing/group/GroupSavePreferencesComposer';
import { GroupSettingsComposer } from './messages/outgoing/group/GroupSettingsComposer';
import { InfoRetrieveBaseMessageComposer } from './messages/outgoing/handshake/InfoRetrieveBaseMessageComposer';
import { SecurityTicketComposer } from './messages/outgoing/handshake/SecurityTicketComposer';
import { RequestBadgesComposer } from './messages/outgoing/inventory/badges/RequestBadgesComposer';
import { SetActivatedBadgesComposer } from './messages/outgoing/inventory/badges/SetActivatedBadgesComposer';
import { GetBotInventoryComposer } from './messages/outgoing/inventory/bots/GetBotInventoryComposer';
import { FurnitureList2Composer } from './messages/outgoing/inventory/furni/FurnitureList2Composer';
import { FurnitureListComposer } from './messages/outgoing/inventory/furni/FurnitureListComposer';
import { RequestPetsComposer } from './messages/outgoing/inventory/pets/RequestPetsComposer';
import { TradingAcceptComposer } from './messages/outgoing/inventory/trading/TradingAcceptComposer';
import { TradingCancelComposer } from './messages/outgoing/inventory/trading/TradingCancelComposer';
import { TradingCloseComposer } from './messages/outgoing/inventory/trading/TradingCloseComposer';
import { TradingConfirmationComposer } from './messages/outgoing/inventory/trading/TradingConfirmationComposer';
import { TradingListAddItemComposer } from './messages/outgoing/inventory/trading/TradingListAddItemComposer';
import { TradingListAddItemsComposer } from './messages/outgoing/inventory/trading/TradingListAddItemsComposer';
import { TradingListItemRemoveComposer } from './messages/outgoing/inventory/trading/TradingListRemoveItemComposer';
import { TradingOpenComposer } from './messages/outgoing/inventory/trading/TradingOpenComposer';
import { TradingUnacceptComposer } from './messages/outgoing/inventory/trading/TradingUnacceptComposer';
import { ModtoolChangeRoomSettingsComposer } from './messages/outgoing/modtool/ModtoolChangeRoomSettingsComposer';
import { ModtoolEventAlertComposer } from './messages/outgoing/modtool/ModtoolEventAlertComposer';
import { ModtoolRequestRoomChatlogComposer } from './messages/outgoing/modtool/ModtoolRequestRoomChatlogComposer';
import { ModtoolRequestRoomInfoComposer } from './messages/outgoing/modtool/ModtoolRequestRoomInfoComposer';
import { ModtoolRequestUserChatlogComposer } from './messages/outgoing/modtool/ModtoolRequestUserChatlogComposer';
import { ModtoolRequestUserInfoComposer } from './messages/outgoing/modtool/ModtoolRequestUserInfoComposer';
import { ModtoolRequestUserRoomsComposer } from './messages/outgoing/modtool/ModtoolRequestUserRoomsComposer';
import { ModtoolRoomAlertComposer } from './messages/outgoing/modtool/ModtoolRoomAlertComposer';
import { ModtoolSanctionAlertComposer } from './messages/outgoing/modtool/ModtoolSanctionAlertComposer';
import { ModtoolSanctionBanComposer } from './messages/outgoing/modtool/ModtoolSanctionBanComposer';
import { ModtoolSanctionKickComposer } from './messages/outgoing/modtool/ModtoolSanctionKickComposer';
import { ModtoolSanctionMuteComposer } from './messages/outgoing/modtool/ModtoolSanctionMuteComposer';
import { ModtoolSanctionTradelockComposer } from './messages/outgoing/modtool/ModtoolSanctionTradelockComposer';
import { ConvertGlobalRoomIdMessageComposer } from './messages/outgoing/navigator/ConvertGlobalRoomIdComposer';
import { NavigatorCategoriesComposer } from './messages/outgoing/navigator/NavigatorCategoriesComposer';
import { NavigatorCategoryListModeComposer } from './messages/outgoing/navigator/NavigatorCategoryListModeComposer';
import { NavigatorInitComposer } from './messages/outgoing/navigator/NavigatorInitComposer';
import { NavigatorSearchCloseComposer } from './messages/outgoing/navigator/NavigatorSearchCloseComposer';
import { NavigatorSearchComposer } from './messages/outgoing/navigator/NavigatorSearchComposer';
import { NavigatorSearchOpenComposer } from './messages/outgoing/navigator/NavigatorSearchOpenComposer';
import { NavigatorSearchSaveComposer } from './messages/outgoing/navigator/NavigatorSearchSaveComposer';
import { NavigatorSettingsComposer } from './messages/outgoing/navigator/NavigatorSettingsComposer';
import { NavigatorSettingsSaveComposer } from './messages/outgoing/navigator/NavigatorSettingsSaveComposer';
import { OutgoingHeader } from './messages/outgoing/OutgoingHeader';
import { PetRespectComposer } from './messages/outgoing/pet/PetRespectComposer';
import { RequestPetInfoComposer } from './messages/outgoing/pet/RequestPetInfoComposer';
import { RoomDoorbellAccessComposer } from './messages/outgoing/room/access/RoomDoorbellAccessComposer';
import { RoomEnterComposer } from './messages/outgoing/room/access/RoomEnterComposer';
import { RoomAmbassadorAlertComposer } from './messages/outgoing/room/action/RoomAmbassadorAlertComposer';
import { RoomBanUserComposer } from './messages/outgoing/room/action/RoomBanUserComposer';
import { RoomDeleteComposer } from './messages/outgoing/room/action/RoomDeleteComposer';
import { RoomGiveRightsComposer } from './messages/outgoing/room/action/RoomGiveRightsComposer';
import { RoomKickUserComposer } from './messages/outgoing/room/action/RoomKickUserComposer';
import { RoomLikeRoomComposer } from './messages/outgoing/room/action/RoomLikeRoomComposer';
import { RoomMuteUserComposer } from './messages/outgoing/room/action/RoomMuteUserComposer';
import { RoomStaffPickComposer } from './messages/outgoing/room/action/RoomStaffPickComposer';
import { RoomTakeRightsComposer } from './messages/outgoing/room/action/RoomTakeRightsComposer';
import { RoomUnbanUserComposer } from './messages/outgoing/room/action/RoomUnbanUserComposer';
import { RequestBotCommandConfigurationComposer } from './messages/outgoing/room/bots/RequestBotConfigurationComposer';
import { RoomBannedUsersComposer } from './messages/outgoing/room/data/RoomBannedUsersComposer';
import { RoomInfoComposer } from './messages/outgoing/room/data/RoomInfoComposer';
import { RoomSettingsComposer } from './messages/outgoing/room/data/RoomSettingsComposer';
import { RoomUsersWithRightsComposer } from './messages/outgoing/room/data/RoomUsersWithRightsComposer';
import { SaveRoomSettingsComposer } from './messages/outgoing/room/data/SaveRoomSettingsComposer';
import { BotPlaceComposer } from './messages/outgoing/room/engine/BotPlaceComposer';
import { BotRemoveComposer } from './messages/outgoing/room/engine/BotRemoveComposer';
import { BotSkillSaveComposer } from './messages/outgoing/room/engine/BotSkillSaveComposer';
import { GetItemDataComposer } from './messages/outgoing/room/engine/GetItemDataComposer';
import { ModifyWallItemDataComposer } from './messages/outgoing/room/engine/ModifyWallItemDataComposer';
import { PetMoveComposer } from './messages/outgoing/room/engine/PetMoveComposer';
import { PetPlaceComposer } from './messages/outgoing/room/engine/PetPlaceComposer';
import { PetRemoveComposer } from './messages/outgoing/room/engine/PetRemoveComposer';
import { RemoveWallItemComposer } from './messages/outgoing/room/engine/RemoveWallItemComposer';
import { RoomAdsUpdateComposer } from './messages/outgoing/room/furniture/ads/RoomAdsUpdateComposer';
import { MoodlightSettingsComposer } from './messages/outgoing/room/furniture/dimmer/MoodlightSettingsComposer';
import { MoodlightSettingsSaveComposer } from './messages/outgoing/room/furniture/dimmer/MoodlightSettingsSaveComposer';
import { MoodlightTogggleStateComposer } from './messages/outgoing/room/furniture/dimmer/MoodlightTogggleStateComposer';
import { FurnitureFloorUpdateComposer } from './messages/outgoing/room/furniture/floor/FurnitureFloorUpdateComposer';
import { FurnitureAliasesComposer } from './messages/outgoing/room/furniture/FurnitureAliasesComposer';
import { FurniturePickupComposer } from './messages/outgoing/room/furniture/FurniturePickupComposer';
import { FurniturePlaceComposer } from './messages/outgoing/room/furniture/FurniturePlaceComposer';
import { FurniturePlacePaintComposer } from './messages/outgoing/room/furniture/FurniturePlacePaintComposer';
import { FurniturePostItPlaceComposer } from './messages/outgoing/room/furniture/FurniturePostItPlaceComposer';
import { FurnitureColorWheelComposer } from './messages/outgoing/room/furniture/logic/FurnitureColorWheelComposer';
import { FurnitureDiceActivateComposer } from './messages/outgoing/room/furniture/logic/FurnitureDiceActivateComposer';
import { FurnitureDiceDeactivateComposer } from './messages/outgoing/room/furniture/logic/FurnitureDiceDeactivateComposer';
import { FurnitureExchangeComposer } from './messages/outgoing/room/furniture/logic/FurnitureExchangeComposer';
import { FurnitureMultiStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureMultiStateComposer';
import { FurnitureOneWayDoorComposer } from './messages/outgoing/room/furniture/logic/FurnitureOneWayDoorComposer';
import { FurnitureRandomStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureRandomStateComposer';
import { FurnitureStackHeightComposer } from './messages/outgoing/room/furniture/logic/FurnitureStackHeightComposer';
import { FurnitureWallMultiStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureWallMultiStateComposer';
import { LoveLockStartConfirmComposer } from './messages/outgoing/room/furniture/logic/LoveLockStartConfirmComposer';
import { FurnitureMannequinSaveLookComposer } from './messages/outgoing/room/furniture/mannequin/FurnitureMannequinSaveLookComposer';
import { FurnitureMannequinSaveNameComposer } from './messages/outgoing/room/furniture/mannequin/FurnitureMannequinSaveNameComposer';
import { OpenPresentComposer } from './messages/outgoing/room/furniture/presents/OpenPresentComposer';
import { ApplyTonerComposer } from './messages/outgoing/room/furniture/toner/ApplyTonerComposer';
import { FurnitureWallUpdateComposer } from './messages/outgoing/room/furniture/wall/FurnitureWallUpdateComposer';
import { RoomBlockedTilesComposer } from './messages/outgoing/room/mapping/RoomBlockedTilesComposer';
import { RoomDoorSettingsComposer } from './messages/outgoing/room/mapping/RoomDoorSettingsComposer';
import { RoomModelComposer } from './messages/outgoing/room/mapping/RoomModelComposer';
import { RoomModelSaveComposer } from './messages/outgoing/room/mapping/RoomModelSaveComposer';
import { RoomCreateComposer } from './messages/outgoing/room/RoomCreateComposer';
import { RoomUnitChatComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatComposer';
import { RoomUnitChatShoutComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatShoutComposer';
import { RoomUnitChatStyleComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatStyleComposer';
import { RoomUnitChatWhisperComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatWhisperComposer';
import { RoomUnitTypingStartComposer } from './messages/outgoing/room/unit/chat/RoomUnitTypingStartComposer';
import { RoomUnitTypingStopComposer } from './messages/outgoing/room/unit/chat/RoomUnitTypingStopComposer';
import { RoomUnitActionComposer } from './messages/outgoing/room/unit/RoomUnitActionComposer';
import { RoomUnitDanceComposer } from './messages/outgoing/room/unit/RoomUnitDanceComposer';
import { RoomUnitDropHandItemComposer } from './messages/outgoing/room/unit/RoomUnitDropHandItemComposer';
import { RoomUnitGiveHandItemComposer } from './messages/outgoing/room/unit/RoomUnitGiveHandItemComposer';
import { RoomUnitLookComposer } from './messages/outgoing/room/unit/RoomUnitLookComposer';
import { RoomUnitPostureComposer } from './messages/outgoing/room/unit/RoomUnitPostureComposer';
import { RoomUnitSignComposer } from './messages/outgoing/room/unit/RoomUnitSignComposer';
import { RoomUnitWalkComposer } from './messages/outgoing/room/unit/RoomUnitWalkComposer';
import { ApplySnapshotMessageComposer } from './messages/outgoing/roomevents/ApplySnapshotMessageComposer';
import { OpenMessageComposer } from './messages/outgoing/roomevents/OpenMessageComposer';
import { RoomMuteComposer } from './messages/outgoing/roomevents/RoomMuteComposer';
import { UpdateActionMessageComposer } from './messages/outgoing/roomevents/UpdateActionMessageComposer';
import { UpdateConditionMessageComposer } from './messages/outgoing/roomevents/UpdateConditionMessageComposer';
import { UpdateTriggerMessageComposer } from './messages/outgoing/roomevents/UpdateTriggerMessageComposer';
import { GetIgnoredUsersComposer } from './messages/outgoing/user/data/GetIgnoredUsersComposer';
import { IgnoreUserComposer } from './messages/outgoing/user/data/IgnoreUserComposer';
import { IgnoreUserIdComposer } from './messages/outgoing/user/data/IgnoreUserIdComposer';
import { UnignoreUserComposer } from './messages/outgoing/user/data/UnignoreUserComposer';
import { UserCurrentBadgesComposer } from './messages/outgoing/user/data/UserCurrentBadgesComposer';
import { UserFigureComposer } from './messages/outgoing/user/data/UserFigureComposer';
import { UserHomeRoomComposer } from './messages/outgoing/user/data/UserHomeRoomComposer';
import { UserMottoComposer } from './messages/outgoing/user/data/UserMottoComposer';
import { UserProfileComposer } from './messages/outgoing/user/data/UserProfileComposer';
import { UserRelationshipsComposer } from './messages/outgoing/user/data/UserRelationshipsComposer';
import { UserCurrencyComposer } from './messages/outgoing/user/inventory/currency/UserCurrencyComposer';
import { UserSubscriptionComposer } from './messages/outgoing/user/inventory/subscription/UserSubscriptionComposer';
import { UserSettingsCameraFollowComposer } from './messages/outgoing/user/settings/UserSettingsCameraFollowComposer';
import { UserSettingsOldChatComposer } from './messages/outgoing/user/settings/UserSettingsOldChatComposer';
import { UserSettingsRoomInvitesComposer } from './messages/outgoing/user/settings/UserSettingsRoomInvitesComposer';
import { UserSettingsSoundComposer } from './messages/outgoing/user/settings/UserSettingsSoundComposer';
import { UserRespectComposer } from './messages/outgoing/user/UserRespectComposer';
import { UserWardrobePageComposer } from './messages/outgoing/user/wardrobe/UserWardrobePageComposer';
import { UserWardrobeSaveComposer } from './messages/outgoing/user/wardrobe/UserWardrobeSaveComposer';
import { MiniMailUnreadCountParser } from './messages/parser/friendlist/MiniMailUnreadCountParser';
import { RequestSellItemComposer } from './messages/outgoing/inventory/marketplace/RequestSellItemComposer';
import { MarketplaceSellItemEvent } from './messages/incoming/inventory/marketplace/MarketplaceSellItemEvent';
import { MarketplaceConfigEvent } from './messages/incoming/catalog/MarketplaceConfigEvent';
import { MarketplaceItemStatsEvent } from './messages/incoming/catalog/MarketplaceItemStatsEvent';
import { MarketplaceSellItemComposer } from './messages/outgoing/inventory/marketplace/MarketplaceSellItemComposer';
import { MarketplaceRequesstItemStatsComposer } from './messages/outgoing/catalog/marketplace/MarketplaceRequesstItemStatsComposer';
import { MarketplaceRequestComposer } from './messages/outgoing/catalog/marketplace/MarketplaceRequestComposer';
import { MarketplaceRequestOwnItemsComposer } from './messages/outgoing/catalog/marketplace/MarketplaceRequestOwnItemsComposer';
import { MarketplaceOwnItemsEvent } from './messages/incoming/catalog/marketplace/MarketplaceOwnItemsEvent';
import { MarketplaceTakeItemBackComposer } from './messages/outgoing/catalog/marketplace/MarketplaceTakeItemBackComposer';
import { MarketplaceCancelItemEvent } from './messages/incoming/catalog/marketplace/MarketplaceCancelItemEvent';
import { MarketplaceRedeemCreditsComposer } from './messages/outgoing/catalog/marketplace/MarketplaceRedeemCreditsComposer';
import { MarketplaceItemPostedEvent } from './messages/incoming/inventory/marketplace/MarketplaceItemPostedEvent';
import { MarketplaceRequestOffersComposer } from './messages/outgoing/catalog/marketplace/MarketplaceRequestOffersComposer';
import { MarketplaceOffersReceivedEvent } from './messages/incoming/catalog/marketplace/MarketplaceOffersReceivedEvent';
import { MarketplaceBuyOfferComposer } from './messages/outgoing/catalog/marketplace/MarketplaceBuyOfferComposer';
import { MarketplaceAfterOrderStatusEvent } from './messages/incoming/catalog/marketplace/MarketplaceAfterOrderStatusEvent';

export class NitroMessages implements IMessageConfiguration
{
    private _events: Map<number, Function>;
    private _composers: Map<number, Function>;

    constructor()
    {
        this._events    = new Map();
        this._composers = new Map();

        this.registerEvents();
        this.registerComposers();
    }

    private registerEvents(): void
    {
        // AVAILABILITY
        this._events.set(IncomingHeader.AVAILABILITY_STATUS, AvailabilityStatusMessageEvent);
        this._events.set(IncomingHeader.GENERIC_ERROR, GenericErrorEvent);

        // AVATAR
        this._events.set(IncomingHeader.USER_CHANGE_NAME, ChangeNameUpdateEvent);

        // CATALOG
        this._events.set(IncomingHeader.CATALOG_CLUB, CatalogClubEvent);
        this._events.set(IncomingHeader.CATALOG_MODE, CatalogModeEvent);
        this._events.set(IncomingHeader.CATALOG_PAGE, CatalogPageEvent);
        this._events.set(IncomingHeader.CATALOG_PAGES, CatalogPagesEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE, CatalogPurchaseEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_FAILED, CatalogPurchaseFailedEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_UNAVAILABLE, CatalogPurchaseUnavailableEvent);
        this._events.set(IncomingHeader.CATALOG_SEARCH, CatalogSearchEvent);
        this._events.set(IncomingHeader.CATALOG_SOLD_OUT, CatalogSoldOutEvent);
        this._events.set(IncomingHeader.CATALOG_UPDATED, CatalogUpdatedEvent);
        this._events.set(IncomingHeader.CATALOG_CLUB_GIFTS, CatalogClubGiftsEvent);
        this._events.set(IncomingHeader.GROUP_LIST, CatalogGroupsEvent);
        this._events.set(IncomingHeader.GIFT_CONFIG, CatalogGiftConfigurationEvent);
        this._events.set(IncomingHeader.REDEEM_VOUCHER_ERROR, CatalogRedeemVoucherErrorEvent);
        this._events.set(IncomingHeader.REDEEM_VOUCHER_OK, CatalogRedeemVoucherOkEvent);

        // CLIENT
        this._events.set(IncomingHeader.CLIENT_PING, ClientPingEvent);

        // DESKTOP
        this._events.set(IncomingHeader.DESKTOP_VIEW, DesktopViewEvent);

        // FRIENDLIST
        this._events.set(IncomingHeader.MESSENGER_ACCEPT_FRIENDS, AcceptFriendResultEvent);
        this._events.set(IncomingHeader.MESSENGER_FIND_FRIENDS, FindFriendsProcessResultEvent);
        this._events.set(IncomingHeader.MESSENGER_FOLLOW_FAILED, FollowFriendFailedEvent);
        this._events.set(IncomingHeader.MESSENGER_FRIENDS, FriendListFragmentEvent);
        this._events.set(IncomingHeader.MESSENGER_UPDATE, FriendListUpdateEvent);
        this._events.set(IncomingHeader.MESSENGER_FRIEND_NOTIFICATION, FriendNotificationEvent);
        this._events.set(IncomingHeader.MESSENGER_REQUESTS, FriendRequestsEvent);
        this._events.set(IncomingHeader.MESSENGER_SEARCH, HabboSearchResultEvent);
        this._events.set(IncomingHeader.MESSENGER_INSTANCE_MESSAGE_ERROR, InstantMessageErrorEvent);
        this._events.set(IncomingHeader.MESSENGER_MESSAGE_ERROR, MessageErrorEvent);
        this._events.set(IncomingHeader.MESSENGER_INIT, MessengerInitEvent);
        this._events.set(IncomingHeader.MESSENGER_MINIMAIL_NEW, MiniMailNewMessageEvent);
        this._events.set(IncomingHeader.MESSENGER_MINIMAIL_COUNT, MiniMailUnreadCountParser);
        this._events.set(IncomingHeader.MESSENGER_CHAT, NewConsoleMessageEvent);
        this._events.set(IncomingHeader.MESSENGER_REQUEST, NewFriendRequestEvent);
        this._events.set(IncomingHeader.MESSENGER_INVITE_ERROR, RoomInviteErrorEvent);
        this._events.set(IncomingHeader.MESSENGER_INVITE, RoomInviteEvent);

        // GROUP
        this._events.set(IncomingHeader.GROUP_INFO, GroupInformationEvent);
        this._events.set(IncomingHeader.GROUP_MEMBER_REMOVE_CONFIRM, GroupConfirmMemberRemoveEvent);
        this._events.set(IncomingHeader.GROUP_MEMBERS, GroupMembersEvent);
        this._events.set(IncomingHeader.GROUP_CREATE_OPTIONS, GroupBuyDataEvent);
        this._events.set(IncomingHeader.GROUP_BADGE_PARTS, GroupBadgePartsEvent);
        this._events.set(IncomingHeader.GROUP_SETTINGS, GroupSettingsEvent);

        // HELP
        this._events.set(IncomingHeader.CFH_RESULT_MESSAGE, CallForHelpResultMessageEvent);

        // INVENTORY

        // ACHIEVEMENTS
        this._events.set(IncomingHeader.ACHIEVEMENT_PROGRESSED, AchievementEvent);
        this._events.set(IncomingHeader.ACHIEVEMENT_LIST, AchievementsEvent);
        this._events.set(IncomingHeader.USER_ACHIEVEMENT_SCORE,AchievementsScoreEvent);

        // EFFECTS
        this._events.set(IncomingHeader.USER_EFFECT_ACTIVATE, AvatarEffectActivatedEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST_ADD, AvatarEffectAddedEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST_REMOVE, AvatarEffectExpiredEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST, AvatarEffectsEvent);

        // CLOTHES
        this._events.set(IncomingHeader.USER_CLOTHING, FigureSetIdsMessageEvent);

        // FURNITURE
        this._events.set(IncomingHeader.USER_FURNITURE_ADD, FurnitureListAddOrUpdateEvent);
        this._events.set(IncomingHeader.USER_FURNITURE, FurnitureListEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_REFRESH, FurnitureListInvalidateEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_REMOVE, FurnitureListRemovedEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_POSTIT_PLACED, FurniturePostItPlacedEvent);

        // TRADING
        this._events.set(IncomingHeader.TRADE_ACCEPTED, TradingAcceptEvent);
        this._events.set(IncomingHeader.TRADE_CLOSED, TradingCloseEvent);
        this._events.set(IncomingHeader.TRADE_COMPLETED, TradingCompletedEvent);
        this._events.set(IncomingHeader.TRADE_CONFIRMATION, TradingConfirmationEvent);
        this._events.set(IncomingHeader.TRADE_LIST_ITEM, TradingListItemEvent);
        this._events.set(IncomingHeader.TRADE_NOT_OPEN, TradingNotOpenEvent);
        this._events.set(IncomingHeader.TRADE_OPEN_FAILED, TradingOpenFailedEvent);
        this._events.set(IncomingHeader.TRADE_OPEN, TradingOpenEvent);
        this._events.set(IncomingHeader.TRADE_OTHER_NOT_ALLOWED, TradingOtherNotAllowedEvent);
        this._events.set(IncomingHeader.TRADE_YOU_NOT_ALLOWED, TradingYouAreNotAllowedEvent);

        // MODERATION
        this._events.set(IncomingHeader.GENERIC_ALERT_LINK, ModeratorMessageEvent);

        // MODTOOL
        this._events.set(IncomingHeader.MODTOOL_ROOM_INFO, ModtoolRoomInfoEvent);
        this._events.set(IncomingHeader.MODTOOL_USER_CHATLOG, ModtoolUserChatlogEvent);
        this._events.set(IncomingHeader.MODTOOL_ROOM_CHATLOG, ModtoolRoomChatlogEvent);

        // NAVIGATOR
        this._events.set(IncomingHeader.NAVIGATOR_CATEGORIES, NavigatorCategoriesEvent);
        this._events.set(IncomingHeader.NAVIGATOR_COLLAPSED, NavigatorCollapsedEvent);
        this._events.set(IncomingHeader.NAVIGATOR_EVENT_CATEGORIES, NavigatorEventCategoriesEvent);
        this._events.set(IncomingHeader.USER_HOME_ROOM, NavigatorHomeRoomEvent);
        this._events.set(IncomingHeader.NAVIGATOR_LIFTED, NavigatorLiftedEvent);
        this._events.set(IncomingHeader.NAVIGATOR_METADATA, NavigatorMetadataEvent);
        this._events.set(IncomingHeader.NAVIGATOR_OPEN_ROOM_CREATOR, NavigatorOpenRoomCreatorEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SEARCHES, NavigatorSearchesEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SEARCH, NavigatorSearchEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SETTINGS, NavigatorSettingsEvent);

        // NOTIFICATIONS
        this._events.set(IncomingHeader.GENERIC_ALERT, HabboBroadcastMessageEvent);
        this._events.set(IncomingHeader.MOTD_MESSAGES, MOTDNotificationEvent);
        this._events.set(IncomingHeader.NOTIFICATION_LIST, NotificationDialogMessageEvent);
        this._events.set(IncomingHeader.USER_RESPECT, RespectReceivedEvent);
        this._events.set(IncomingHeader.UNSEEN_ITEMS, UnseenItemsEvent);
        this._events.set(IncomingHeader.HOTEL_WILL_SHUTDOWN, HotelWillShutdownEvent);

        // ROOM

        // ACCESS
        this._events.set(IncomingHeader.ROOM_ENTER_ERROR, RoomEnterErrorEvent);
        this._events.set(IncomingHeader.ROOM_ENTER, RoomEnterEvent);
        this._events.set(IncomingHeader.ROOM_FORWARD, RoomForwardEvent);

        // DOORBELL
        this._events.set(IncomingHeader.ROOM_DOORBELL, RoomDoorbellEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL_ACCEPTED, RoomDoorbellAcceptedEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL_REJECTED, RoomDoorbellRejectedEvent);

        // RIGHTS
        this._events.set(IncomingHeader.ROOM_RIGHTS_CLEAR, RoomRightsClearEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_OWNER, RoomRightsOwnerEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS, RoomRightsEvent);

        // DATA
        this._events.set(IncomingHeader.ROOM_SETTINGS_CHAT, RoomChatSettingsEvent);
        this._events.set(IncomingHeader.ROOM_INFO, RoomInfoEvent);
        this._events.set(IncomingHeader.ROOM_INFO_OWNER, RoomInfoOwnerEvent);
        this._events.set(IncomingHeader.ROOM_SCORE, RoomScoreEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_SAVE_ERROR, RoomSettingsErrorEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS, RoomSettingsEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_SAVE, RoomSettingsSavedEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_UPDATED, RoomSettingsUpdatedEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_LIST, RoomUsersWithRightsEvent);
        this._events.set(IncomingHeader.ROOM_BAN_LIST, RoomBannedUsersEvent);

        // ENGINE
        this._events.set(IncomingHeader.ROOM_ROLLING, ObjectsRollingEvent);
        this._events.set(IncomingHeader.ROOM_CREATED, RoomCreatedEvent);

        // BOTS
        this._events.set(IncomingHeader.BOT_COMMAND_CONFIGURATION, BotCommandConfigurationEvent);
        this._events.set(IncomingHeader.BOT_ERROR, BotErrorEvent);

        // FURNITURE
        this._events.set(IncomingHeader.FURNITURE_ALIASES, FurnitureAliasesEvent);
        this._events.set(IncomingHeader.FURNITURE_DATA, FurnitureDataEvent);
        this._events.set(IncomingHeader.FURNITURE_ITEMDATA, FurnitureItemDataEvent);
        this._events.set(IncomingHeader.ITEM_STACK_HELPER, FurnitureStackHeightEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE, FurnitureStateEvent);
        this._events.set(IncomingHeader.ITEM_DIMMER_SETTINGS, RoomDimmerPresetsEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE_2, FurnitureState2Event);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_FINISHED, LoveLockFurniFinishedEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_FRIEND_COMFIRMED, LoveLockFurniFriendConfirmedEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_START, LoveLockFurniStartEvent);

        // FLOOR
        this._events.set(IncomingHeader.FURNITURE_FLOOR_ADD, FurnitureFloorAddEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR, FurnitureFloorEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_REMOVE, FurnitureFloorRemoveEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateEvent);

        // WALL
        this._events.set(IncomingHeader.ITEM_WALL_ADD, FurnitureWallAddEvent);
        this._events.set(IncomingHeader.ITEM_WALL, FurnitureWallEvent);
        this._events.set(IncomingHeader.ITEM_WALL_REMOVE, FurnitureWallRemoveEvent);
        this._events.set(IncomingHeader.ITEM_WALL_UPDATE, FurnitureWallUpdateEvent);

        // MAPPING
        this._events.set(IncomingHeader.ROOM_MODEL_DOOR, RoomDoorEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP, RoomHeightMapEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP_UPDATE, RoomHeightMapUpdateEvent);
        this._events.set(IncomingHeader.ROOM_MODEL, RoomModelEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_NAME, RoomModelNameEvent);
        this._events.set(IncomingHeader.ROOM_PAINT, RoomPaintEvent);
        this._events.set(IncomingHeader.ROOM_THICKNESS, RoomThicknessEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_BLOCKED_TILES, RoomBlockedTilesEvent);

        // PET
        this._events.set(IncomingHeader.PET_FIGURE_UPDATE, PetFigureUpdateEvent);
        this._events.set(IncomingHeader.PET_INFO, PetInfoEvent);

        // SESSION
        this._events.set(IncomingHeader.PLAYING_GAME, YouArePlayingGameEvent);

        // UNIT
        this._events.set(IncomingHeader.UNIT_DANCE, RoomUnitDanceEvent);
        this._events.set(IncomingHeader.UNIT_EFFECT, RoomUnitEffectEvent);
        this._events.set(IncomingHeader.UNIT, RoomUnitEvent);
        this._events.set(IncomingHeader.UNIT_EXPRESSION, RoomUnitExpressionEvent);
        this._events.set(IncomingHeader.UNIT_HAND_ITEM, RoomUnitHandItemEvent);
        this._events.set(IncomingHeader.UNIT_IDLE, RoomUnitIdleEvent);
        this._events.set(IncomingHeader.UNIT_INFO, RoomUnitInfoEvent);
        this._events.set(IncomingHeader.UNIT_NUMBER, RoomUnitNumberEvent);
        this._events.set(IncomingHeader.UNIT_REMOVE, RoomUnitRemoveEvent);
        this._events.set(IncomingHeader.UNIT_STATUS, RoomUnitStatusEvent);
        this._events.set(IncomingHeader.HAND_ITEM_RECEIVED, RoomUnitHandItemReceivedEvent);

        // CHAT
        this._events.set(IncomingHeader.FLOOD_CONTROL, FloodControlEvent);
        this._events.set(IncomingHeader.REMAINING_MUTE, RemainingMuteEvent);
        this._events.set(IncomingHeader.UNIT_CHAT, RoomUnitChatEvent);
        this._events.set(IncomingHeader.UNIT_CHAT_SHOUT, RoomUnitChatShoutEvent);
        this._events.set(IncomingHeader.UNIT_CHAT_WHISPER, RoomUnitChatWhisperEvent);
        this._events.set(IncomingHeader.UNIT_TYPING, RoomUnitTypingEvent);

        // ROOM EVENTS
        this._events.set(IncomingHeader.WIRED_ACTION, WiredFurniActionEvent);
        this._events.set(IncomingHeader.WIRED_CONDITION, WiredFurniConditionEvent);
        this._events.set(IncomingHeader.WIRED_TRIGGER, WiredFurniTriggerEvent);
        this._events.set(IncomingHeader.WIRED_OPEN, WiredOpenEvent);
        this._events.set(IncomingHeader.WIRED_REWARD, WiredRewardResultMessageEvent);
        this._events.set(IncomingHeader.WIRED_SAVE, WiredSaveSuccessEvent);
        this._events.set(IncomingHeader.WIRED_ERROR, WiredValidationErrorEvent);
        this._events.set(IncomingHeader.ROOM_MUTED, RoomMutedEvent);

        // SECURITY
        this._events.set(IncomingHeader.AUTHENTICATED, AuthenticatedEvent);

        // USER
        this._events.set(IncomingHeader.IN_CLIENT_LINK, InClientLinkEvent);
        this._events.set(IncomingHeader.USER_IGNORED, IgnoredUsersEvent);
        this._events.set(IncomingHeader.USER_IGNORED_RESULT, IgnoreResultEvent);

        // BADGES
        this._events.set(IncomingHeader.USER_BADGES, BadgesEvent);

        // ACCESS
        this._events.set(IncomingHeader.USER_PERKS, UserPerksEvent);
        this._events.set(IncomingHeader.USER_PERMISSIONS, UserPermissionsEvent);

        // DATA
        this._events.set(IncomingHeader.USER_BADGES_CURRENT, UserCurrentBadgesEvent);
        this._events.set(IncomingHeader.USER_FIGURE, UserFigureEvent);
        this._events.set(IncomingHeader.USER_INFO, UserInfoEvent);
        this._events.set(IncomingHeader.UNIT_CHANGE_NAME, UserNameChangeMessageEvent);
        this._events.set(IncomingHeader.USER_SETTINGS, UserSettingsEvent);
        this._events.set(IncomingHeader.USER_PROFILE, UserProfileEvent);
        this._events.set(IncomingHeader.MESSENGER_RELATIONSHIPS, UserRelationshipsEvent);

        // GIFTS
        this._events.set(IncomingHeader.GIFT_OPENED, FurnitureGiftOpenedEvent);

        // INVENTORY
        this._events.set(IncomingHeader.GIFT_RECEIVER_NOT_FOUND, CatalogGiftUsernameUnavailableEvent);

        // BOTS
        this._events.set(IncomingHeader.USER_BOTS, BotInventoryMessageEvent);
        this._events.set(IncomingHeader.REMOVE_BOT_FROM_INVENTORY, BotRemovedFromInventoryEvent);
        this._events.set(IncomingHeader.ADD_BOT_TO_INVENTORY, BotAddedToInventoryEvent);

        // CURRENCY
        this._events.set(IncomingHeader.USER_CREDITS, UserCreditsEvent);
        this._events.set(IncomingHeader.USER_CURRENCY, UserCurrencyEvent);
        this._events.set(IncomingHeader.USER_CURRENCY_UPDATE, UserCurrencyUpdateEvent);

        // SUBSCRIPTION
        this._events.set(IncomingHeader.USER_SUBSCRIPTION, UserSubscriptionEvent);

        // GAMES
        this._events.set(IncomingHeader.LOAD_GAME_URL, LoadGameUrlEvent);

        // WARDROBE
        this._events.set(IncomingHeader.USER_WARDROBE_PAGE, UserWardrobePageEvent);

        // PETS
        this._events.set(IncomingHeader.USER_PETS, PetInventoryEvent);
        this._events.set(IncomingHeader.USER_PET_REMOVE, PetRemovedFromInventory);
        this._events.set(IncomingHeader.USER_PET_ADD, PetAddedToInventoryEvent);
        this._events.set(IncomingHeader.PET_PLACING_ERROR, PetPlacingErrorEvent);

        // MOD TOOL
        this._events.set(IncomingHeader.MODERATION_USER_INFO, ModtoolUserInfoEvent);
        this._events.set(IncomingHeader.MODERATION_TOPICS, ModtoolCallForHelpTopicsEvent);
        this._events.set(IncomingHeader.MODERATION_TOOL, ModtoolMainEvent);
        this._events.set(IncomingHeader.MODTOOL_VISITED_ROOMS_USER, ModtoolReceivedRoomsUserEvent);

        // MARKETPLACE
        this._events.set(IncomingHeader.MARKETPLACE_SELL_ITEM, MarketplaceSellItemEvent);
        this._events.set(IncomingHeader.MARKETPLACE_CONFIG, MarketplaceConfigEvent);
        this._events.set(IncomingHeader.MARKETPLACE_ITEM_STATS, MarketplaceItemStatsEvent);
        this._events.set(IncomingHeader.MARKETPLACE_OWN_ITEMS, MarketplaceOwnItemsEvent);
        this._events.set(IncomingHeader.MARKETPLACE_CANCEL_SALE, MarketplaceCancelItemEvent);
        this._events.set(IncomingHeader.MARKETPLACE_ITEM_POSTED, MarketplaceItemPostedEvent);
        this._events.set(IncomingHeader.MARKETPLACE_ITEMS_SEARCHED, MarketplaceOffersReceivedEvent);
        this._events.set(IncomingHeader.MARKETPLACE_AFTER_ORDER_STATUS, MarketplaceAfterOrderStatusEvent);
    }

    private registerComposers(): void
    {
        // CATALOG
        this._composers.set(OutgoingHeader.CATALOG_MODE, CatalogModeComposer);
        this._composers.set(OutgoingHeader.CATALOG_PAGE, CatalogPageComposer);
        this._composers.set(OutgoingHeader.CATALOG_PURCHASE, CatalogPurchaseComposer);
        this._composers.set(OutgoingHeader.CATALOG_PURCHASE_GIFT, CatalogPurchaseGiftComposer);
        this._composers.set(OutgoingHeader.CATALOG_SEARCH, CatalogSearchComposer);
        this._composers.set(OutgoingHeader.CATALOG_CLUB, CatalogRequestVipOffersComposer);
        this._composers.set(OutgoingHeader.CATALOG_CLUB_GIFTS, CatalogRequestVipGiftsComposer);
        this._composers.set(OutgoingHeader.CATALOG_REDEEM_VOUCHER, CatalogRedeemVoucherComposer);
        this._composers.set(OutgoingHeader.LOVELOCK_START_CONFIRM, LoveLockStartConfirmComposer);
        this._composers.set(OutgoingHeader.GROUP_MEMBERSHIPS, CatalogGroupsComposer);
        this._composers.set(OutgoingHeader.GIFT_CONFIG, CatalogRequestGiftConfigurationComposer);
        this._composers.set(OutgoingHeader.CATALOG_SELECT_VIP_GIFT, CatalogSelectClubGiftComposer);

        // CLIENT
        this._composers.set(OutgoingHeader.CLIENT_PONG, ClientPongComposer);
        this._composers.set(OutgoingHeader.RELEASE_VERSION, ClientReleaseVersionComposer);

        // DESKTOP
        this._composers.set(OutgoingHeader.DESKTOP_VIEW, DesktopViewComposer);

        // FRIENDLIST
        this._composers.set(OutgoingHeader.MESSENGER_ACCEPT, AcceptFriendComposer);
        this._composers.set(OutgoingHeader.MESSENGER_DECLINE, DeclineFriendComposer);
        this._composers.set(OutgoingHeader.FIND_FRIENDS, FindNewFriendsComposer);
        this._composers.set(OutgoingHeader.MESSENGER_FOLLOW, FollowFriendComposer);
        this._composers.set(OutgoingHeader.MESSENGER_UPDATES, FriendListUpdateComposer);
        this._composers.set(OutgoingHeader.MESSENGER_REQUESTS, GetFriendRequestsComposer);
        this._composers.set(OutgoingHeader.MESSENGER_SEARCH, HabboSearchComposer);
        this._composers.set(OutgoingHeader.MESSENGER_INIT, MessengerInitComposer);
        this._composers.set(OutgoingHeader.MESSENGER_REMOVE, RemoveFriendComposer);
        this._composers.set(OutgoingHeader.MESSENGER_REQUEST, RequestFriendComposer);
        this._composers.set(OutgoingHeader.MESSENGER_CHAT, SendMessageComposer);
        this._composers.set(OutgoingHeader.MESSENGER_ROOM_INVITE, SendRoomInviteComposer);
        this._composers.set(OutgoingHeader.MESSENGER_RELATIONSHIPS_UPDATE, SetRelationshipStatusComposer);
        this._composers.set(OutgoingHeader.USER_VISIT, VisitUserComposer);

        // GROUP
        this._composers.set(OutgoingHeader.GROUP_INFO, GroupInformationComposer);
        this._composers.set(OutgoingHeader.GROUP_REQUEST, GroupJoinComposer);
        this._composers.set(OutgoingHeader.GROUP_MEMBER_REMOVE_CONFIRM, GroupConfirmRemoveMemberComposer);
        this._composers.set(OutgoingHeader.GROUP_MEMBER_REMOVE, GroupRemoveMemberComposer);
        this._composers.set(OutgoingHeader.GROUP_MEMBERS, GroupMembersComposer);
        this._composers.set(OutgoingHeader.GROUP_ADMIN_ADD, GroupAdminGiveComposer);
        this._composers.set(OutgoingHeader.GROUP_ADMIN_REMOVE, GroupAdminTakeComposer);
        this._composers.set(OutgoingHeader.GROUP_REQUEST_ACCEPT, GroupMembershipAcceptComposer);
        this._composers.set(OutgoingHeader.GROUP_REQUEST_DECLINE, GroupMembershipDeclineComposer);
        this._composers.set(OutgoingHeader.GROUP_DELETE, GroupDeleteComposer);
        this._composers.set(OutgoingHeader.GROUP_CREATE_OPTIONS, GroupBuyDataComposer);
        this._composers.set(OutgoingHeader.GROUP_PARTS, GroupBadgePartsComposer);
        this._composers.set(OutgoingHeader.GROUP_BUY, GroupBuyComposer);
        this._composers.set(OutgoingHeader.GROUP_SETTINGS, GroupSettingsComposer);
        this._composers.set(OutgoingHeader.GROUP_SAVE_BADGE, GroupSaveBadgeComposer);
        this._composers.set(OutgoingHeader.GROUP_SAVE_COLORS, GroupSaveColorsComposer);
        this._composers.set(OutgoingHeader.GROUP_SAVE_INFORMATION, GroupSaveInformationComposer);
        this._composers.set(OutgoingHeader.GROUP_SAVE_PREFERENCES, GroupSavePreferencesComposer);

        // SECURITY
        this._composers.set(OutgoingHeader.SECURITY_TICKET, SecurityTicketComposer);
        this._composers.set(OutgoingHeader.USER_INFO, InfoRetrieveBaseMessageComposer);

        // NAVIGATOR
        this._composers.set(OutgoingHeader.NAVIGATOR_CATEGORIES, NavigatorCategoriesComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_INIT, NavigatorInitComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_CLOSE, NavigatorSearchCloseComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH, NavigatorSearchComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_OPEN, NavigatorSearchOpenComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_SAVE, NavigatorSearchSaveComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SETTINGS, NavigatorSettingsComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SETTINGS_SAVE, NavigatorSettingsSaveComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_CATEGORY_LIST_MODE, NavigatorCategoryListModeComposer);
        this._composers.set(OutgoingHeader.CONVERT_GLOBAL_ROOM_ID, ConvertGlobalRoomIdMessageComposer);

        // INVENTORY

        // MARKETPLACE
        this._composers.set(OutgoingHeader.REQUEST_SELL_ITEM, RequestSellItemComposer);
        this._composers.set(OutgoingHeader.REQUEST_MARKETPLACE_ITEM_STATS, MarketplaceRequesstItemStatsComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_REDEEM_CREDITS, MarketplaceRedeemCreditsComposer);

        // FURNI
        this._composers.set(OutgoingHeader.USER_FURNITURE, FurnitureListComposer);
        this._composers.set(OutgoingHeader.USER_FURNITURE2, FurnitureList2Composer);
        this._composers.set(OutgoingHeader.ITEM_SAVE_BACKGROUND, RoomAdsUpdateComposer);

        // TRADING
        this._composers.set(OutgoingHeader.TRADE_ACCEPT, TradingAcceptComposer);
        this._composers.set(OutgoingHeader.TRADE_CANCEL, TradingCancelComposer);
        this._composers.set(OutgoingHeader.TRADE_CLOSE, TradingCloseComposer);
        this._composers.set(OutgoingHeader.TRADE_CONFIRM, TradingConfirmationComposer);
        this._composers.set(OutgoingHeader.TRADE_ITEM, TradingListAddItemComposer);
        this._composers.set(OutgoingHeader.TRADE_ITEMS, TradingListAddItemsComposer);
        this._composers.set(OutgoingHeader.TRADE_ITEM_REMOVE, TradingListItemRemoveComposer);
        this._composers.set(OutgoingHeader.TRADE, TradingOpenComposer);
        this._composers.set(OutgoingHeader.TRADE_UNACCEPT, TradingUnacceptComposer);

        // ACHIVEMENTS
        this._composers.set(OutgoingHeader.ACHIEVEMENT_LIST, RequestAchievementsMessageComposer);

        // PET
        this._composers.set(OutgoingHeader.PET_RESPECT, PetRespectComposer);
        this._composers.set(OutgoingHeader.PET_INFO, RequestPetInfoComposer);

        // ROOM
        this._composers.set(OutgoingHeader.ROOM_CREATE, RoomCreateComposer);

        // ACCESS
        this._composers.set(OutgoingHeader.ROOM_ENTER, RoomEnterComposer);
        this._composers.set(OutgoingHeader.ROOM_DOORBELL, RoomDoorbellAccessComposer);

        // ACTION
        this._composers.set(OutgoingHeader.ROOM_AMBASSADOR_ALERT, RoomAmbassadorAlertComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_GIVE, RoomBanUserComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_REMOVE, RoomUnbanUserComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_GIVE, RoomGiveRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_KICK, RoomKickUserComposer);
        this._composers.set(OutgoingHeader.ROOM_MUTE_USER, RoomMuteUserComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE, RoomTakeRightsComposer);

        this._composers.set(OutgoingHeader.ROOM_LIKE, RoomLikeRoomComposer);
        this._composers.set(OutgoingHeader.ROOM_DELETE, RoomDeleteComposer);
        this._composers.set(OutgoingHeader.ROOM_STAFF_PICK, RoomStaffPickComposer);

        // DATA
        this._composers.set(OutgoingHeader.ROOM_INFO, RoomInfoComposer);
        this._composers.set(OutgoingHeader.ROOM_SETTINGS, RoomSettingsComposer);
        this._composers.set(OutgoingHeader.ROOM_SETTINGS_SAVE, SaveRoomSettingsComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_LIST, RoomUsersWithRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_LIST, RoomBannedUsersComposer);

        // BOTS
        this._composers.set(OutgoingHeader.BOT_CONFIGURATION, RequestBotCommandConfigurationComposer);

        // ENGINE
        this._composers.set(OutgoingHeader.GET_ITEM_DATA, GetItemDataComposer);
        this._composers.set(OutgoingHeader.REMOVE_WALL_ITEM, RemoveWallItemComposer);
        this._composers.set(OutgoingHeader.MODIFY_WALL_ITEM_DATA, ModifyWallItemDataComposer);
        this._composers.set(OutgoingHeader.BOT_PLACE, BotPlaceComposer);
        this._composers.set(OutgoingHeader.BOT_PICKUP, BotRemoveComposer);
        this._composers.set(OutgoingHeader.BOT_SKILL_SAVE, BotSkillSaveComposer);
        this._composers.set(OutgoingHeader.PET_PLACE, PetPlaceComposer);
        this._composers.set(OutgoingHeader.PET_MOVE, PetMoveComposer);
        this._composers.set(OutgoingHeader.PET_PICKUP, PetRemoveComposer);

        // FURNITURE
        this._composers.set(OutgoingHeader.FURNITURE_ALIASES, FurnitureAliasesComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PICKUP, FurniturePickupComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PLACE, FurniturePlaceComposer);
        this._composers.set(OutgoingHeader.ITEM_PAINT, FurniturePlacePaintComposer);
        this._composers.set(OutgoingHeader.FURNITURE_POSTIT_PLACE, FurniturePostItPlaceComposer);

        // FLOOR
        this._composers.set(OutgoingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateComposer);

        // WALL
        this._composers.set(OutgoingHeader.FURNITURE_WALL_UPDATE, FurnitureWallUpdateComposer);

        // Dimmers
        this._composers.set(OutgoingHeader.ITEM_DIMMER_SETTINGS, MoodlightSettingsComposer);
        this._composers.set(OutgoingHeader.ITEM_DIMMER_SAVE, MoodlightSettingsSaveComposer);
        this._composers.set(OutgoingHeader.ITEM_DIMMER_TOGGLE, MoodlightTogggleStateComposer);

        // Toners
        this._composers.set(OutgoingHeader.ROOM_TONER_APPLY, ApplyTonerComposer);

        // LOGIC
        this._composers.set(OutgoingHeader.ITEM_COLOR_WHEEL_CLICK, FurnitureColorWheelComposer);
        this._composers.set(OutgoingHeader.ITEM_DICE_CLICK, FurnitureDiceActivateComposer);
        this._composers.set(OutgoingHeader.ITEM_DICE_CLOSE, FurnitureDiceDeactivateComposer);
        this._composers.set(OutgoingHeader.FURNITURE_MULTISTATE, FurnitureMultiStateComposer);
        this._composers.set(OutgoingHeader.FURNITURE_RANDOMSTATE, FurnitureRandomStateComposer);
        this._composers.set(OutgoingHeader.ITEM_STACK_HELPER, FurnitureStackHeightComposer);
        this._composers.set(OutgoingHeader.FURNITURE_WALL_MULTISTATE, FurnitureWallMultiStateComposer);
        this._composers.set(OutgoingHeader.ONE_WAY_DOOR_CLICK, FurnitureOneWayDoorComposer);
        this._composers.set(OutgoingHeader.ITEM_EXCHANGE_REDEEM, FurnitureExchangeComposer);
        this._composers.set(OutgoingHeader.ITEM_CLOTHING_REDEEM, RedeemItemClothingComposer);

        // MAPPING
        this._composers.set(OutgoingHeader.ROOM_MODEL, RoomModelComposer);
        this._composers.set(OutgoingHeader.ROOM_MODEL_BLOCKED_TILES, RoomBlockedTilesComposer);
        this._composers.set(OutgoingHeader.ROOM_MODEL_DOOR, RoomDoorSettingsComposer);
        this._composers.set(OutgoingHeader.ROOM_MODEL_SAVE, RoomModelSaveComposer);

        // UNIT
        this._composers.set(OutgoingHeader.UNIT_ACTION, RoomUnitActionComposer);
        this._composers.set(OutgoingHeader.UNIT_DANCE, RoomUnitDanceComposer);
        this._composers.set(OutgoingHeader.UNIT_DROP_HAND_ITEM, RoomUnitDropHandItemComposer);
        this._composers.set(OutgoingHeader.UNIT_GIVE_HANDITEM, RoomUnitGiveHandItemComposer);
        this._composers.set(OutgoingHeader.UNIT_LOOK, RoomUnitLookComposer);
        this._composers.set(OutgoingHeader.UNIT_SIGN, RoomUnitSignComposer);
        this._composers.set(OutgoingHeader.UNIT_POSTURE, RoomUnitPostureComposer);
        this._composers.set(OutgoingHeader.UNIT_WALK, RoomUnitWalkComposer);

        // CHAT
        this._composers.set(OutgoingHeader.UNIT_CHAT, RoomUnitChatComposer);
        this._composers.set(OutgoingHeader.UNIT_CHAT_SHOUT, RoomUnitChatShoutComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_CHAT_STYLE, RoomUnitChatStyleComposer);
        this._composers.set(OutgoingHeader.UNIT_CHAT_WHISPER, RoomUnitChatWhisperComposer);
        this._composers.set(OutgoingHeader.UNIT_TYPING, RoomUnitTypingStartComposer);
        this._composers.set(OutgoingHeader.UNIT_TYPING_STOP, RoomUnitTypingStopComposer);

        // ROOM EVENTS
        this._composers.set(OutgoingHeader.WIRED_APPLY_SNAPSHOT, ApplySnapshotMessageComposer);
        this._composers.set(OutgoingHeader.WIRED_OPEN, OpenMessageComposer);
        this._composers.set(OutgoingHeader.WIRED_ACTION_SAVE, UpdateActionMessageComposer);
        this._composers.set(OutgoingHeader.WIRED_CONDITION_SAVE, UpdateConditionMessageComposer);
        this._composers.set(OutgoingHeader.WIRED_TRIGGER_SAVE, UpdateTriggerMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_MUTE, RoomMuteComposer);

        // USER
        this._composers.set(OutgoingHeader.USER_RESPECT, UserRespectComposer);

        // DATA
        this._composers.set(OutgoingHeader.USER_IGNORED, GetIgnoredUsersComposer);
        this._composers.set(OutgoingHeader.USER_IGNORE, IgnoreUserComposer);
        this._composers.set(OutgoingHeader.USER_IGNORE_ID, IgnoreUserIdComposer);
        this._composers.set(OutgoingHeader.USER_UNIGNORE, UnignoreUserComposer);
        this._composers.set(OutgoingHeader.USER_BADGES_CURRENT, UserCurrentBadgesComposer);
        this._composers.set(OutgoingHeader.USER_FIGURE, UserFigureComposer);
        this._composers.set(OutgoingHeader.USER_HOME_ROOM, UserHomeRoomComposer);
        this._composers.set(OutgoingHeader.USER_MOTTO, UserMottoComposer);
        this._composers.set(OutgoingHeader.USER_PROFILE, UserProfileComposer);
        this._composers.set(OutgoingHeader.MESSENGER_RELATIONSHIPS, UserRelationshipsComposer);

        // MANNEQUIN
        this._composers.set(OutgoingHeader.MANNEQUIN_SAVE_NAME, FurnitureMannequinSaveNameComposer);
        this._composers.set(OutgoingHeader.MANNEQUIN_SAVE_LOOK, FurnitureMannequinSaveLookComposer);

        // GIFTS
        this._composers.set(OutgoingHeader.PRESENT_OPEN_PRESENT, OpenPresentComposer);

        // INVENTORY

        // MARKETPLACE
        this._composers.set(OutgoingHeader.MARKETPLACE_CONFIG, MarketplaceRequestComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_SELL_ITEM, MarketplaceSellItemComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_REQUEST_OWN_ITEMS, MarketplaceRequestOwnItemsComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_TAKE_BACK_ITEM, MarketplaceTakeItemBackComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_REQUEST_OFFERS, MarketplaceRequestOffersComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_BUY_OFFER, MarketplaceBuyOfferComposer);

        // BOTS
        this._composers.set(OutgoingHeader.USER_BOTS, GetBotInventoryComposer);

        // BADGES
        this._composers.set(OutgoingHeader.USER_BADGES, RequestBadgesComposer);
        this._composers.set(OutgoingHeader.USER_BADGES_CURRENT_UPDATE, SetActivatedBadgesComposer);

        // PETS
        this._composers.set(OutgoingHeader.USER_PETS, RequestPetsComposer);

        // CURRENCY
        this._composers.set(OutgoingHeader.USER_CURRENCY, UserCurrencyComposer);

        // SUBSCRIPTION
        this._composers.set(OutgoingHeader.USER_SUBSCRIPTION, UserSubscriptionComposer);

        // MODTOOL
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_ROOM_INFO, ModtoolRequestRoomInfoComposer);
        this._composers.set(OutgoingHeader.MODTOOL_CHANGE_ROOM_SETTINGS, ModtoolChangeRoomSettingsComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_USER_CHATLOG, ModtoolRequestUserChatlogComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_ROOM_CHATLOG, ModtoolRequestRoomChatlogComposer);
        this._composers.set(OutgoingHeader.MOD_TOOL_USER_INFO, ModtoolRequestUserInfoComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_ALERT, ModtoolSanctionAlertComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_BAN, ModtoolSanctionBanComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_KICK, ModtoolSanctionKickComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_TRADELOCK, ModtoolSanctionTradelockComposer);
        this._composers.set(OutgoingHeader.MODTOOL_ALERTEVENT, ModtoolEventAlertComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_MUTE, ModtoolSanctionMuteComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_USER_ROOMS, ModtoolRequestUserRoomsComposer);
        this._composers.set(OutgoingHeader.MODTOOL_ROOM_ALERT, ModtoolRoomAlertComposer);

        // WARDROBE
        this._composers.set(OutgoingHeader.USER_WARDROBE_PAGE, UserWardrobePageComposer);
        this._composers.set(OutgoingHeader.USER_WARDROBE_SAVE, UserWardrobeSaveComposer);

        // SETTINGS
        this._composers.set(OutgoingHeader.USER_SETTINGS_CAMERA, UserSettingsCameraFollowComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_OLD_CHAT, UserSettingsOldChatComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_INVITES, UserSettingsRoomInvitesComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_VOLUME, UserSettingsSoundComposer);
    }

    public get events(): Map<number, Function>
    {
        return this._events;
    }

    public get composers(): Map<number, Function>
    {
        return this._composers;
    }
}
