import { IMessageConfiguration } from '../../core/communication/messages/IMessageConfiguration';
import { AchievementNotificationMessageEvent, ActivityPointNotificationMessageEvent, AddJukeboxDiskComposer, ApproveNameMessageComposer, ApproveNameMessageEvent, AvailabilityTimeMessageEvent, BadgePointLimitsEvent, BadgeReceivedEvent, BonusRareInfoMessageEvent, BuildersClubFurniCountMessageEvent, BuildersClubSubscriptionStatusMessageEvent, BundleDiscountRulesetMessageEvent, ChangeUserNameMessageComposer, ChangeUserNameResultMessageEvent, CheckUserNameMessageComposer, CheckUserNameResultMessageEvent, ClubGiftNotificationEvent, ControlYoutubeDisplayPlaybackMessageComposer, DirectSMSClubBuyAvailableMessageEvent, FigureUpdateEvent, ForwardToASubmittableRoomMessageComposer, ForwardToRandomCompetitionRoomMessageComposer, FurnitureGroupInfoComposer, GetBonusRareInfoMessageComposer, GetCatalogPageExpirationComposer, GetCatalogPageWithEarliestExpiryComposer, GetCurrentTimingCodeMessageComposer, GetDirectClubBuyAvailableComposer, GetForumsListMessageComposer, GetForumStatsMessageComposer, GetGiftMessageComposer, GetHabboBasicMembershipExtendOfferComposer, GetHabboClubExtendOfferMessageComposer, GetInterstitialMessageComposer, GetJukeboxPlayListMessageComposer, GetLimitedOfferAppearingNextComposer, GetMessagesMessageComposer, GetNextTargetedOfferComposer, GetNowPlayingMessageComposer, GetOfficialSongIdMessageComposer, GetRoomAdPurchaseInfoComposer, GetSeasonalCalendarDailyOfferComposer, GetSecondsUntilMessageComposer, GetSongInfoMessageComposer, GetSoundMachinePlayListMessageComposer, GetThreadMessageComposer, GetThreadsMessageComposer, GetUnreadForumsCountMessageComposer, GetUserSongDisksMessageComposer, GetYoutubeDisplayStatusMessageComposer, GoToFlatMessageComposer, GroupBadgesComposer, GroupBadgesEvent, HabboClubExtendOfferMessageEvent, HotelClosedAndOpensEvent, HotelClosesAndWillOpenAtEvent, HotelWillCloseInMinutesEvent, InfoFeedEnableMessageEvent, InterstitialMessageEvent, InterstitialShownMessageComposer, IsBadgeRequestFulfilledEvent, IsOfferGiftableMessageEvent, JukeboxPlayListFullMessageEvent, JukeboxSongDisksMessageEvent, LimitedOfferAppearingNextMessageEvent, MaintenanceStatusMessageEvent, MarkCatalogNewAdditionsPageOpenedComposer, MarketplaceBuyOfferComposer, MarketplaceRedeemCreditsComposer, MarketplaceRequesstItemStatsComposer, MarketplaceRequestComposer, MarketplaceRequestOffersComposer, MarketplaceRequestOwnItemsComposer, MarketplaceTakeItemBackComposer, ModerateMessageMessageComposer, ModerateThreadMessageComposer, MysteryBoxKeysEvent, NotEnoughBalanceMessageEvent, NowPlayingMessageEvent, OfficialSongIdMessageEvent, OpenCampaignCalendarDoorAsStaffComposer, OpenCampaignCalendarDoorComposer, PetExperienceEvent, PetMountComposer, PetSupplementComposer, PlayListMessageEvent, PlayListSongAddedMessageEvent, PostMessageMessageComposer, PurchaseBasicMembershipExtensionComposer, PurchaseRoomAdMessageComposer, PurchaseTargetedOfferComposer, PurchaseVipMembershipExtensionComposer, RemoveAllRightsMessageComposer, RemoveJukeboxDiskComposer, RemoveOwnRoomRightsRoomMessageComposer, RemovePetSaddleComposer, ResetPhoneNumberStateMessageComposer, RoomAdErrorEvent, RoomAdPurchaseInfoEvent, RoomCompetitionInitMessageComposer, RoomUnitGiveHandItemPetComposer, SeasonalCalendarDailyOfferMessageEvent, SellablePetPalettesMessageEvent, SetPhoneNumberVerificationStatusMessageComposer, SetTargetedOfferStateComposer, SetYoutubeDisplayPlaylistMessageComposer, ShopTargetedOfferViewedComposer, SubmitRoomToCompetitionMessageComposer, TalentTrackEvent, TargetedOfferEvent, TargetedOfferNotFoundEvent, TogglePetBreedingComposer, TogglePetRidingComposer, TraxSongInfoMessageEvent, TryPhoneNumberMessageComposer, UnseenResetCategoryComposer, UnseenResetItemsComposer, UpdateForumReadMarkerMessageComposer, UpdateForumSettingsMessageComposer, UpdateThreadMessageComposer, UsePetProductComposer, UserSongDisksInventoryMessageEvent, VerifyCodeMessageComposer, VoteForRoomMessageComposer, WardrobeMessageEvent } from './messages';
import { AvailabilityStatusMessageEvent } from './messages/incoming/availability/AvailabilityStatusMessageEvent';
import { BotAddedToInventoryEvent, BotInventoryMessageEvent, BotReceivedMessageEvent, BotRemovedFromInventoryEvent } from './messages/incoming/bots';
import { CfhSanctionMessageEvent, CfhTopicsInitEvent, SanctionStatusEvent } from './messages/incoming/callforhelp';
import { CameraPublishStatusMessageEvent } from './messages/incoming/camera/CameraPublishStatusMessageEvent';
import { CameraPurchaseOKMessageEvent } from './messages/incoming/camera/CameraPurchaseOKMessageEvent';
import { CameraStorageUrlMessageEvent } from './messages/incoming/camera/CameraStorageUrlMessageEvent';
import { CompetitionStatusMessageEvent } from './messages/incoming/camera/CompetitionStatusMessageEvent';
import { InitCameraMessageEvent } from './messages/incoming/camera/InitCameraMessageEvent';
import { ThumbnailStatusMessageEvent } from './messages/incoming/camera/ThumbnailStatusMessageEvent';
import { CampaignCalendarDataMessageEvent, CampaignCalendarDoorOpenedMessageEvent } from './messages/incoming/campaign';
import { CatalogPageExpirationEvent, CatalogPageMessageEvent, CatalogPagesListEvent, CatalogPageWithEarliestExpiryMessageEvent, CatalogPublishedMessageEvent, ClubGiftInfoEvent, ClubGiftSelectedEvent, GiftReceiverNotFoundEvent, GiftWrappingConfigurationEvent, HabboClubOffersMessageEvent, LimitedEditionSoldOutEvent, ProductOfferEvent, PurchaseErrorMessageEvent, PurchaseNotAllowedMessageEvent, PurchaseOKMessageEvent, VoucherRedeemErrorMessageEvent, VoucherRedeemOkMessageEvent } from './messages/incoming/catalog';
import { ClientPingEvent } from './messages/incoming/client/ClientPingEvent';
import { CompetitionEntrySubmitResultEvent } from './messages/incoming/competition/CompetitionEntrySubmitResultEvent';
import { CompetitionVotingInfoMessageEvent } from './messages/incoming/competition/CompetitionVotingInfoMessageEvent';
import { CurrentTimingCodeMessageEvent } from './messages/incoming/competition/CurrentTimingCodeMessageEvent';
import { IsUserPartOfCompetitionMessageEvent } from './messages/incoming/competition/IsUserPartOfCompetitionMessageEvent';
import { NoOwnedRoomsAlertMessageEvent } from './messages/incoming/competition/NoOwnedRoomsAlertMessageEvent';
import { SecondsUntilMessageEvent } from './messages/incoming/competition/SecondsUntilMessageEvent';
import { CraftableProductsEvent } from './messages/incoming/crafting/CraftableProductsEvent';
import { CraftingRecipeEvent } from './messages/incoming/crafting/CraftingRecipeEvent';
import { CraftingRecipesAvailableEvent } from './messages/incoming/crafting/CraftingRecipesAvailableEvent';
import { CraftingResultEvent } from './messages/incoming/crafting/CraftingResultEvent';
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
import { MiniMailUnreadCountEvent } from './messages/incoming/friendlist/MiniMailUnreadCountEvent';
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
import { GroupPurchasedEvent } from './messages/incoming/group/GroupPurchasedEvent';
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
import { FigureSetIdsMessageEvent } from './messages/incoming/inventory/clothes/FigureSetIdsMessageEvent';
import { FurnitureListAddOrUpdateEvent } from './messages/incoming/inventory/furni/FurnitureListAddOrUpdateEvent';
import { FurnitureListEvent } from './messages/incoming/inventory/furni/FurnitureListEvent';
import { FurnitureListInvalidateEvent } from './messages/incoming/inventory/furni/FurnitureListInvalidateEvent';
import { FurnitureListRemovedEvent } from './messages/incoming/inventory/furni/FurnitureListRemovedEvent';
import { FurniturePostItPlacedEvent } from './messages/incoming/inventory/furni/FurniturePostItPlacedEvent';
import { PresentOpenedMessageEvent } from './messages/incoming/inventory/furni/gifts/PresentOpenedMessageEvent';
import { PetAddedToInventoryEvent } from './messages/incoming/inventory/pets/PetAddedToInventoryEvent';
import { PetInventoryEvent } from './messages/incoming/inventory/pets/PetInventoryEvent';
import { PetReceivedMessageEvent } from './messages/incoming/inventory/pets/PetReceivedMessageEvent';
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
import { PromoArticlesMessageEvent } from './messages/incoming/landingview/PromoArticlesMessageEvent';
import { CommunityGoalVoteMessageEvent } from './messages/incoming/landingview/votes/CommunityGoalVoteMessageEvent';
import { MarketplaceBuyOfferResultEvent } from './messages/incoming/marketplace/MarketplaceBuyOfferResultEvent';
import { MarketplaceCancelOfferResultEvent } from './messages/incoming/marketplace/MarketplaceCancelOfferResultEvent';
import { MarketplaceCanMakeOfferResult } from './messages/incoming/marketplace/MarketplaceCanMakeOfferResult';
import { MarketplaceConfigurationEvent } from './messages/incoming/marketplace/MarketplaceConfigurationEvent';
import { MarketplaceItemStatsEvent } from './messages/incoming/marketplace/MarketplaceItemStatsEvent';
import { MarketplaceMakeOfferResult } from './messages/incoming/marketplace/MarketplaceMakeOfferResult';
import { MarketPlaceOffersEvent } from './messages/incoming/marketplace/MarketplaceOffersEvent';
import { MarketplaceOwnOffersEvent } from './messages/incoming/marketplace/MarketplaceOwnOffersEvent';
import { UserBannedMessageEvent } from './messages/incoming/moderation';
import { ModeratorCautionEvent } from './messages/incoming/moderation/ModeratorCautionEvent';
import { ModeratorInitMessageEvent } from './messages/incoming/modtool/ModeratorInitMessageEvent';
import { ModtoolCallForHelpTopicsEvent } from './messages/incoming/modtool/ModtoolCallForHelpTopicsEvent';
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
import { ModeratorMessageEvent } from './messages/incoming/notifications/ModeratorMessageEvent';
import { MOTDNotificationEvent } from './messages/incoming/notifications/MOTDNotificationEvent';
import { NotificationDialogMessageEvent } from './messages/incoming/notifications/NotificationDialogMessageEvent';
import { PetLevelNotificationEvent } from './messages/incoming/notifications/PetLevelNotificationEvent';
import { PetPlacingErrorEvent } from './messages/incoming/notifications/PetPlacingErrorEvent';
import { UnseenItemsEvent } from './messages/incoming/notifications/UnseenItemsEvent';
import { CommunityGoalEarnedPrizesMessageEvent } from './messages/incoming/quest/CommunityGoalEarnedPrizesMessageEvent';
import { CommunityGoalHallOfFameMessageEvent } from './messages/incoming/quest/CommunityGoalHallOfFameMessageEvent';
import { CommunityGoalProgressMessageEvent } from './messages/incoming/quest/CommunityGoalProgressMessageEvent';
import { ConcurrentUsersGoalProgressMessageEvent } from './messages/incoming/quest/ConcurrentUsersGoalProgressMessageEvent';
import { EpicPopupMessageEvent } from './messages/incoming/quest/EpicPopupMessageEvent';
import { QuestCancelledMessageEvent } from './messages/incoming/quest/QuestCancelledMessageEvent';
import { QuestCompletedMessageEvent } from './messages/incoming/quest/QuestCompletedMessageEvent';
import { QuestDailyMessageEvent } from './messages/incoming/quest/QuestDailyMessageEvent';
import { QuestMessageEvent } from './messages/incoming/quest/QuestMessageEvent';
import { QuestsMessageEvent } from './messages/incoming/quest/QuestsMessageEvent';
import { SeasonalQuestsMessageEvent } from './messages/incoming/quest/SeasonalQuestsMessageEvent';
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
import { ObjectsDataUpdateEvent } from './messages/incoming/room/engine/ObjectsDataUpdateEvent';
import { ObjectsRollingEvent } from './messages/incoming/room/engine/ObjectsRollingEvent';
import { RoomCreatedEvent } from './messages/incoming/room/engine/RoomCreatedEvent';
import { DiceValueMessageEvent } from './messages/incoming/room/furniture/DiceValueMessageEvent';
import { FurnitureFloorAddEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorAddEvent';
import { FurnitureFloorEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorEvent';
import { FurnitureFloorRemoveEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorRemoveEvent';
import { FurnitureFloorUpdateEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorUpdateEvent';
import { FurnitureAliasesEvent } from './messages/incoming/room/furniture/FurnitureAliasesEvent';
import { FurnitureDataEvent } from './messages/incoming/room/furniture/FurnitureDataEvent';
import { FurnitureItemDataEvent } from './messages/incoming/room/furniture/FurnitureItemDataEvent';
import { FurniturePostItStickyPoleOpenEvent } from './messages/incoming/room/furniture/FurniturePostItStickyPoleOpenEvent';
import { FurnitureStackHeightEvent } from './messages/incoming/room/furniture/FurnitureStackHeightEvent';
import { FurnitureStateEvent } from './messages/incoming/room/furniture/FurnitureStateEvent';
import { GroupFurniContextMenuInfoMessageEvent } from './messages/incoming/room/furniture/GroupFurniContextMenuInfoMessageEvent';
import { LoveLockFurniFinishedEvent } from './messages/incoming/room/furniture/LoveLockFurniFinishedEvent';
import { LoveLockFurniFriendConfirmedEvent } from './messages/incoming/room/furniture/LoveLockFurniFriendConfirmedEvent';
import { LoveLockFurniStartEvent } from './messages/incoming/room/furniture/LoveLockFurniStartEvent';
import { RoomDimmerPresetsEvent } from './messages/incoming/room/furniture/RoomDimmerPresetsMessageEvent';
import { FurnitureWallAddEvent } from './messages/incoming/room/furniture/wall/FurnitureWallAddEvent';
import { FurnitureWallEvent } from './messages/incoming/room/furniture/wall/FurnitureWallEvent';
import { FurnitureWallRemoveEvent } from './messages/incoming/room/furniture/wall/FurnitureWallRemoveEvent';
import { FurnitureWallUpdateEvent } from './messages/incoming/room/furniture/wall/FurnitureWallUpdateEvent';
import { YoutubeControlVideoMessageEvent } from './messages/incoming/room/furniture/youtube/YoutubeControlVideoMessageEvent';
import { YoutubeDisplayPlaylistsEvent } from './messages/incoming/room/furniture/youtube/YoutubeDisplayPlaylistsEvent';
import { YoutubeDisplayVideoMessageEvent } from './messages/incoming/room/furniture/youtube/YoutubeDisplayVideoMessageEvent';
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
import { RelationshipStatusInfoEvent } from './messages/incoming/user/data/RelationshipStatusInfoEvent';
import { UserCurrentBadgesEvent } from './messages/incoming/user/data/UserCurrentBadgesEvent';
import { UserInfoEvent } from './messages/incoming/user/data/UserInfoEvent';
import { UserNameChangeMessageEvent } from './messages/incoming/user/data/UserNameChangeMessageEvent';
import { UserProfileEvent } from './messages/incoming/user/data/UserProfileEvent';
import { UserSettingsEvent } from './messages/incoming/user/data/UserSettingsEvent';
import { GuildMembershipsMessageEvent } from './messages/incoming/user/GuildMembershipsMessageEvent';
import { IgnoredUsersEvent } from './messages/incoming/user/IgnoredUsersEvent';
import { IgnoreResultEvent } from './messages/incoming/user/IgnoreResultEvent';
import { InClientLinkEvent } from './messages/incoming/user/InClientLinkEvent';
import { UserCreditsEvent } from './messages/incoming/user/inventory/currency/UserCreditsEvent';
import { UserCurrencyEvent } from './messages/incoming/user/inventory/currency/UserCurrencyEvent';
import { UserSubscriptionEvent } from './messages/incoming/user/inventory/subscription/UserSubscriptionEvent';
import { RespectReceivedEvent } from './messages/incoming/user/RespectReceivedEvent';
import { UserWardrobePageEvent } from './messages/incoming/user/wardrobe/UserWardrobePageEvent';
import { RequestAchievementsMessageComposer } from './messages/outgoing/advertisement/RequestAchievementsMessageComposer';
import { GetWardrobeMessageComposer } from './messages/outgoing/avatar/GetWardrobeMessageComposer';
import { SaveWardrobeOutfitMessageComposer } from './messages/outgoing/avatar/SaveWardrobeOutfitMessageComposer';
import { PhotoCompetitionMessageComposer } from './messages/outgoing/camera/PhotoCompetitionMessageComposer';
import { PublishPhotoMessageComposer } from './messages/outgoing/camera/PublishPhotoMessageComposer';
import { PurchasePhotoMessageComposer } from './messages/outgoing/camera/PurchasePhotoMessageComposer';
import { RenderRoomMessageComposer } from './messages/outgoing/camera/RenderRoomMessageComposer';
import { RenderRoomThumbnailMessageComposer } from './messages/outgoing/camera/RenderRoomThumbnailMessageComposer';
import { RequestCameraConfigurationComposer } from './messages/outgoing/camera/RequestCameraConfigurationComposer';
import { BuildersClubPlaceRoomItemMessageComposer } from './messages/outgoing/catalog/BuildersClubPlaceRoomItemMessageComposer';
import { BuildersClubPlaceWallItemMessageComposer } from './messages/outgoing/catalog/BuildersClubPlaceWallItemMessageComposer';
import { BuildersClubQueryFurniCountMessageComposer } from './messages/outgoing/catalog/BuildersClubQueryFurniCountMessageComposer';
import { GetBundleDiscountRulesetComposer } from './messages/outgoing/catalog/GetBundleDiscountRulesetComposer';
import { GetCatalogIndexComposer } from './messages/outgoing/catalog/GetCatalogIndexComposer';
import { GetCatalogPageComposer } from './messages/outgoing/catalog/GetCatalogPageComposer';
import { GetClubGiftInfo } from './messages/outgoing/catalog/GetClubGiftInfo';
import { GetClubOffersMessageComposer } from './messages/outgoing/catalog/GetClubOffersMessageComposer';
import { GetGiftWrappingConfigurationComposer } from './messages/outgoing/catalog/GetGiftWrappingConfigurationComposer';
import { GetIsOfferGiftableComposer } from './messages/outgoing/catalog/GetIsOfferGiftableComposer';
import { GetProductOfferComposer } from './messages/outgoing/catalog/GetProductOfferComposer';
import { GetSellablePetPalettesComposer } from './messages/outgoing/catalog/GetSellablePetPalettesComposer';
import { GetTargetedOfferComposer } from './messages/outgoing/catalog/GetTargetedOfferComposer';
import { PurchaseFromCatalogAsGiftComposer } from './messages/outgoing/catalog/PurchaseFromCatalogAsGiftComposer';
import { PurchaseFromCatalogComposer } from './messages/outgoing/catalog/PurchaseFromCatalogComposer';
import { RedeemVoucherMessageComposer } from './messages/outgoing/catalog/RedeemVoucherMessageComposer';
import { RoomAdPurchaseInitiatedComposer } from './messages/outgoing/catalog/RoomAdPurchaseInitiatedComposer';
import { SelectClubGiftComposer } from './messages/outgoing/catalog/SelectClubGiftComposer';
import { ClientPongComposer } from './messages/outgoing/client/ClientPongComposer';
import { ClientReleaseVersionComposer } from './messages/outgoing/client/ClientReleaseVersionComposer';
import { ForwardToACompetitionRoomMessageComposer } from './messages/outgoing/competition/ForwardToACompetitionRoomMessageComposer';
import { GetIsUserPartOfCompetitionMessageComposer } from './messages/outgoing/competition/GetIsUserPartOfCompetitionMessageComposer';
import { CraftComposer } from './messages/outgoing/crafting/CraftComposer';
import { CraftSecretComposer } from './messages/outgoing/crafting/CraftSecretComposer';
import { GetCraftableProductsComposer } from './messages/outgoing/crafting/GetCraftableProductsComposer';
import { GetCraftingRecipeComposer } from './messages/outgoing/crafting/GetCraftingRecipeComposer';
import { GetCraftingRecipesAvailableComposer } from './messages/outgoing/crafting/GetCraftingRecipesAvailableComposer';
import { DesktopViewComposer } from './messages/outgoing/desktop/DesktopViewComposer';
import { FriendFurniConfirmLockMessageComposer } from './messages/outgoing/friendfurni/FriendFurniConfirmLockMessageComposer';
import { AcceptFriendMessageComposer } from './messages/outgoing/friendlist/AcceptFriendMessageComposer';
import { DeclineFriendMessageComposer } from './messages/outgoing/friendlist/DeclineFriendMessageComposer';
import { FindNewFriendsMessageComposer } from './messages/outgoing/friendlist/FindNewFriendsMessageComposer';
import { FollowFriendMessageComposer } from './messages/outgoing/friendlist/FollowFriendMessageComposer';
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
import { GroupFavoriteComposer } from './messages/outgoing/group/GroupFavoriteComposer';
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
import { AuthenticationMessageComposer } from './messages/outgoing/handshake/AuthenticationMessageComposer';
import { InfoRetrieveBaseMessageComposer } from './messages/outgoing/handshake/InfoRetrieveBaseMessageComposer';
import { SecurityTicketComposer } from './messages/outgoing/handshake/SecurityTicketComposer';
import { TalentTrackComposer } from './messages/outgoing/helper/TalentTrackComposer';
import { RequestBadgesComposer } from './messages/outgoing/inventory/badges/RequestBadgesComposer';
import { SetActivatedBadgesComposer } from './messages/outgoing/inventory/badges/SetActivatedBadgesComposer';
import { GetBotInventoryComposer } from './messages/outgoing/inventory/bots/GetBotInventoryComposer';
import { FurnitureList2Composer } from './messages/outgoing/inventory/furni/FurnitureList2Composer';
import { FurnitureListComposer } from './messages/outgoing/inventory/furni/FurnitureListComposer';
import { MarketplaceSellItemComposer } from './messages/outgoing/inventory/marketplace/MarketplaceSellItemComposer';
import { RequestSellItemComposer } from './messages/outgoing/inventory/marketplace/RequestSellItemComposer';
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
import { GetPromoArticlesComposer } from './messages/outgoing/landingview/GetPromoArticlesComposer';
import { CommunityGoalVoteMessageComposer } from './messages/outgoing/landingview/votes/CommunityGoalVoteMessageComposer';
import { ModerateRoomMessageComposer } from './messages/outgoing/modtool/ModerateRoomMessageComposer';
import { ModeratorActionMessageComposer } from './messages/outgoing/modtool/ModeratorActionMessageComposer';
import { ModMessageMessageComposer } from './messages/outgoing/modtool/ModMessageMessageComposer';
import { ModtoolRequestRoomChatlogComposer } from './messages/outgoing/modtool/ModtoolRequestRoomChatlogComposer';
import { ModtoolRequestRoomInfoComposer } from './messages/outgoing/modtool/ModtoolRequestRoomInfoComposer';
import { ModtoolRequestUserChatlogComposer } from './messages/outgoing/modtool/ModtoolRequestUserChatlogComposer';
import { ModtoolRequestUserInfoComposer } from './messages/outgoing/modtool/ModtoolRequestUserInfoComposer';
import { ModtoolRequestUserRoomsComposer } from './messages/outgoing/modtool/ModtoolRequestUserRoomsComposer';
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
import { AcceptQuestMessageComposer } from './messages/outgoing/quest/AcceptQuestMessageComposer';
import { ActivateQuestMessageComposer } from './messages/outgoing/quest/ActivateQuestMessageComposer';
import { CancelQuestMessageComposer } from './messages/outgoing/quest/CancelQuestMessageComposer';
import { FriendRequestQuestCompleteMessageComposer } from './messages/outgoing/quest/FriendRequestQuestCompleteMessageComposer';
import { GetCommunityGoalEarnedPrizesMessageComposer } from './messages/outgoing/quest/GetCommunityGoalEarnedPrizesMessageComposer';
import { GetCommunityGoalHallOfFameMessageComposer } from './messages/outgoing/quest/GetCommunityGoalHallOfFameMessageComposer';
import { GetCommunityGoalProgressMessageComposer } from './messages/outgoing/quest/GetCommunityGoalProgressMessageComposer';
import { GetConcurrentUsersGoalProgressMessageComposer } from './messages/outgoing/quest/GetConcurrentUsersGoalProgressMessageComposer';
import { GetConcurrentUsersRewardMessageComposer } from './messages/outgoing/quest/GetConcurrentUsersRewardMessageComposer';
import { GetDailyQuestMessageComposer } from './messages/outgoing/quest/GetDailyQuestMessageComposer';
import { GetQuestsMessageComposer } from './messages/outgoing/quest/GetQuestsMessageComposer';
import { GetSeasonalQuestsOnlyMessageComposer } from './messages/outgoing/quest/GetSeasonalQuestsOnlyMessageComposer';
import { OpenQuestTrackerMessageComposer } from './messages/outgoing/quest/OpenQuestTrackerMessageComposer';
import { RedeemCommunityGoalPrizeMessageComposer } from './messages/outgoing/quest/RedeemCommunityGoalPrizeMessageComposer';
import { RejectQuestMessageComposer } from './messages/outgoing/quest/RejectQuestMessageComposer';
import { StartCampaignMessageComposer } from './messages/outgoing/quest/StartCampaignMessageComposer';
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
import { PetMoveComposer } from './messages/outgoing/room/engine/PetMoveComposer';
import { PetPlaceComposer } from './messages/outgoing/room/engine/PetPlaceComposer';
import { PetRemoveComposer } from './messages/outgoing/room/engine/PetRemoveComposer';
import { RemoveWallItemComposer } from './messages/outgoing/room/engine/RemoveWallItemComposer';
import { SetItemDataMessageComposer } from './messages/outgoing/room/engine/SetItemDataMessageComposer';
import { SetObjectDataMessageComposer } from './messages/outgoing/room/engine/SetObjectDataMessageComposer';
import { MoodlightSettingsComposer } from './messages/outgoing/room/furniture/dimmer/MoodlightSettingsComposer';
import { MoodlightSettingsSaveComposer } from './messages/outgoing/room/furniture/dimmer/MoodlightSettingsSaveComposer';
import { MoodlightTogggleStateComposer } from './messages/outgoing/room/furniture/dimmer/MoodlightTogggleStateComposer';
import { FurnitureFloorUpdateComposer } from './messages/outgoing/room/furniture/floor/FurnitureFloorUpdateComposer';
import { FurnitureAliasesComposer } from './messages/outgoing/room/furniture/FurnitureAliasesComposer';
import { FurniturePickupComposer } from './messages/outgoing/room/furniture/FurniturePickupComposer';
import { FurniturePlaceComposer } from './messages/outgoing/room/furniture/FurniturePlaceComposer';
import { FurniturePlacePaintComposer } from './messages/outgoing/room/furniture/FurniturePlacePaintComposer';
import { FurniturePostItPlaceComposer } from './messages/outgoing/room/furniture/FurniturePostItPlaceComposer';
import { FurniturePostItSaveStickyPoleComposer } from './messages/outgoing/room/furniture/FurniturePostItSaveStickyPoleComposer';
import { FurnitureColorWheelComposer } from './messages/outgoing/room/furniture/logic/FurnitureColorWheelComposer';
import { FurnitureDiceActivateComposer } from './messages/outgoing/room/furniture/logic/FurnitureDiceActivateComposer';
import { FurnitureDiceDeactivateComposer } from './messages/outgoing/room/furniture/logic/FurnitureDiceDeactivateComposer';
import { FurnitureExchangeComposer } from './messages/outgoing/room/furniture/logic/FurnitureExchangeComposer';
import { FurnitureMultiStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureMultiStateComposer';
import { FurnitureOneWayDoorComposer } from './messages/outgoing/room/furniture/logic/FurnitureOneWayDoorComposer';
import { FurnitureRandomStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureRandomStateComposer';
import { FurnitureStackHeightComposer } from './messages/outgoing/room/furniture/logic/FurnitureStackHeightComposer';
import { FurnitureWallMultiStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureWallMultiStateComposer';
import { FurnitureMannequinSaveLookComposer } from './messages/outgoing/room/furniture/mannequin/FurnitureMannequinSaveLookComposer';
import { FurnitureMannequinSaveNameComposer } from './messages/outgoing/room/furniture/mannequin/FurnitureMannequinSaveNameComposer';
import { OpenPresentComposer } from './messages/outgoing/room/furniture/presents/OpenPresentComposer';
import { ApplyTonerComposer } from './messages/outgoing/room/furniture/toner/ApplyTonerComposer';
import { FurnitureWallUpdateComposer } from './messages/outgoing/room/furniture/wall/FurnitureWallUpdateComposer';
import { RoomBlockedTilesComposer } from './messages/outgoing/room/mapping/RoomBlockedTilesComposer';
import { RoomDoorSettingsComposer } from './messages/outgoing/room/mapping/RoomDoorSettingsComposer';
import { RoomModelComposer } from './messages/outgoing/room/mapping/RoomModelComposer';
import { RoomModelSaveComposer } from './messages/outgoing/room/mapping/RoomModelSaveComposer';
import { RedeemItemClothingComposer } from './messages/outgoing/room/RedeemItemClothingComposer';
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
import { GetSoundSettingsComposer } from './messages/outgoing/sound/GetSoundSettingsComposer';
import { CatalogGroupsComposer } from './messages/outgoing/user/CatalogGroupsComposer';
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
        // ADVERTISEMENT
        this._events.set(IncomingHeader.INTERSTITIAL_MESSAGE, InterstitialMessageEvent);
        this._events.set(IncomingHeader.ROOM_AD_ERROR, RoomAdErrorEvent);

        // AVAILABILITY
        this._events.set(IncomingHeader.AVAILABILITY_STATUS, AvailabilityStatusMessageEvent);
        this._events.set(IncomingHeader.AVAILABILITY_TIME, AvailabilityTimeMessageEvent);
        this._events.set(IncomingHeader.HOTEL_CLOSED_AND_OPENS, HotelClosedAndOpensEvent);
        this._events.set(IncomingHeader.HOTEL_CLOSES_AND_OPENS_AT, HotelClosesAndWillOpenAtEvent);
        this._events.set(IncomingHeader.HOTEL_WILL_CLOSE_MINUTES, HotelWillCloseInMinutesEvent);
        this._events.set(IncomingHeader.HOTEL_MAINTENANCE, MaintenanceStatusMessageEvent);

        // AVATAR
        this._events.set(IncomingHeader.USER_CHANGE_NAME, ChangeUserNameResultMessageEvent);
        this._events.set(IncomingHeader.CHECK_USER_NAME, CheckUserNameResultMessageEvent);
        this._events.set(IncomingHeader.USER_FIGURE, FigureUpdateEvent);
        this._events.set(IncomingHeader.USER_OUTFITS, WardrobeMessageEvent);

        // BOTS
        this._events.set(IncomingHeader.ADD_BOT_TO_INVENTORY, BotAddedToInventoryEvent);
        this._events.set(IncomingHeader.USER_BOTS, BotInventoryMessageEvent);
        this._events.set(IncomingHeader.BOT_RECEIVED, BotReceivedMessageEvent);
        this._events.set(IncomingHeader.REMOVE_BOT_FROM_INVENTORY, BotRemovedFromInventoryEvent);

        // CALL FOR HELP
        this._events.set(IncomingHeader.CFH_SANCTION, CfhSanctionMessageEvent);
        this._events.set(IncomingHeader.CFH_TOPICS, CfhTopicsInitEvent);
        this._events.set(IncomingHeader.CFH_SANCTION_STATUS, SanctionStatusEvent);

        // CAMERA
        this._events.set(IncomingHeader.CAMERA_PUBLISH_STATUS, CameraPublishStatusMessageEvent);
        this._events.set(IncomingHeader.CAMERA_PURCHASE_OK, CameraPurchaseOKMessageEvent);
        this._events.set(IncomingHeader.CAMERA_STORAGE_URL, CameraStorageUrlMessageEvent);
        this._events.set(IncomingHeader.COMPETITION_STATUS, CompetitionStatusMessageEvent);
        this._events.set(IncomingHeader.INIT_CAMERA, InitCameraMessageEvent);
        this._events.set(IncomingHeader.THUMBNAIL_STATUS, ThumbnailStatusMessageEvent);

        // CAMPAIGN
        this._events.set(IncomingHeader.CAMPAIGN_CALENDAR_DATA, CampaignCalendarDataMessageEvent);
        this._events.set(IncomingHeader.CAMPAIGN_CALENDAR_DOOR_OPENED, CampaignCalendarDoorOpenedMessageEvent);

        // CATALOG
        this._events.set(IncomingHeader.BONUS_RARE_INFO, BonusRareInfoMessageEvent);
        this._events.set(IncomingHeader.BUILDERS_CLUB_FURNI_COUNT, BuildersClubFurniCountMessageEvent);
        this._events.set(IncomingHeader.BUILDERS_CLUB_SUBSCRIPTION, BuildersClubSubscriptionStatusMessageEvent);
        this._events.set(IncomingHeader.BUNDLE_DISCOUNT_RULESET, BundleDiscountRulesetMessageEvent);
        this._events.set(IncomingHeader.CATALOG_PAGE_EXPIRATION, CatalogPageExpirationEvent);
        this._events.set(IncomingHeader.CATALOG_PAGE, CatalogPageMessageEvent);
        this._events.set(IncomingHeader.CATALOG_PAGE_LIST, CatalogPagesListEvent);
        this._events.set(IncomingHeader.CATALOG_EARLIEST_EXPIRY, CatalogPageWithEarliestExpiryMessageEvent);
        this._events.set(IncomingHeader.CATALOG_PUBLISHED, CatalogPublishedMessageEvent);
        this._events.set(IncomingHeader.CLUB_GIFT_INFO, ClubGiftInfoEvent);
        this._events.set(IncomingHeader.CLUB_GIFT_SELECTED, ClubGiftSelectedEvent);
        this._events.set(IncomingHeader.DIRECT_SMS_CLUB_BUY, DirectSMSClubBuyAvailableMessageEvent);
        this._events.set(IncomingHeader.GIFT_RECEIVER_NOT_FOUND, GiftReceiverNotFoundEvent);
        this._events.set(IncomingHeader.GIFT_WRAPPER_CONFIG, GiftWrappingConfigurationEvent);
        this._events.set(IncomingHeader.CLUB_EXTENDED_OFFER, HabboClubExtendOfferMessageEvent);
        this._events.set(IncomingHeader.CLUB_OFFERS, HabboClubOffersMessageEvent);
        this._events.set(IncomingHeader.IS_OFFER_GIFTABLE, IsOfferGiftableMessageEvent);
        this._events.set(IncomingHeader.LIMITED_SOLD_OUT, LimitedEditionSoldOutEvent);
        this._events.set(IncomingHeader.LIMITED_OFFER_APPEARING_NEXT, LimitedOfferAppearingNextMessageEvent);
        this._events.set(IncomingHeader.NOT_ENOUGH_BALANCE, NotEnoughBalanceMessageEvent);
        this._events.set(IncomingHeader.PRODUCT_OFFER, ProductOfferEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_ERROR, PurchaseErrorMessageEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_NOT_ALLOWED, PurchaseNotAllowedMessageEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_OK, PurchaseOKMessageEvent);
        this._events.set(IncomingHeader.ROOM_AD_PURCHASE, RoomAdPurchaseInfoEvent);
        this._events.set(IncomingHeader.SEASONAL_CALENDAR_OFFER, SeasonalCalendarDailyOfferMessageEvent);
        this._events.set(IncomingHeader.CATALOG_RECEIVE_PET_BREEDS, SellablePetPalettesMessageEvent);
        this._events.set(IncomingHeader.TARGET_OFFER, TargetedOfferEvent);
        this._events.set(IncomingHeader.TARGET_OFFER_NOT_FOUND, TargetedOfferNotFoundEvent);
        this._events.set(IncomingHeader.REDEEM_VOUCHER_ERROR, VoucherRedeemErrorMessageEvent);
        this._events.set(IncomingHeader.REDEEM_VOUCHER_OK, VoucherRedeemOkMessageEvent);

        // CLIENT
        this._events.set(IncomingHeader.CLIENT_PING, ClientPingEvent);

        // COMPETITION
        this._events.set(IncomingHeader.COMPETITION_ENTRY_SUBMIT, CompetitionEntrySubmitResultEvent);
        this._events.set(IncomingHeader.COMPETITION_VOTING_INFO, CompetitionVotingInfoMessageEvent);
        this._events.set(IncomingHeader.COMPETITION_TIMING_CODE, CurrentTimingCodeMessageEvent);
        this._events.set(IncomingHeader.COMPETITION_USER_PART_OF, IsUserPartOfCompetitionMessageEvent);
        this._events.set(IncomingHeader.COMPETITION_NO_OWNED_ROOMS, NoOwnedRoomsAlertMessageEvent);
        this._events.set(IncomingHeader.COMPETITION_SECONDS_UNTIL, SecondsUntilMessageEvent);

        // CRAFTING
        this._events.set(IncomingHeader.CRAFTABLE_PRODUCTS, CraftableProductsEvent);
        this._events.set(IncomingHeader.CRAFTING_RECIPE, CraftingRecipeEvent);
        this._events.set(IncomingHeader.CRAFTING_RECIPES_AVAILABLE, CraftingRecipesAvailableEvent);
        this._events.set(IncomingHeader.CRAFTING_RESULT, CraftingResultEvent);

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
        this._events.set(IncomingHeader.MESSENGER_MINIMAIL_COUNT, MiniMailUnreadCountEvent);
        this._events.set(IncomingHeader.MESSENGER_CHAT, NewConsoleMessageEvent);
        this._events.set(IncomingHeader.MESSENGER_REQUEST, NewFriendRequestEvent);
        this._events.set(IncomingHeader.MESSENGER_INVITE_ERROR, RoomInviteErrorEvent);
        this._events.set(IncomingHeader.MESSENGER_INVITE, RoomInviteEvent);

        // GAMES
        this._events.set(IncomingHeader.LOAD_GAME_URL, LoadGameUrlEvent);

        // GROUP
        this._events.set(IncomingHeader.GROUP_INFO, GroupInformationEvent);
        this._events.set(IncomingHeader.GROUP_MEMBER_REMOVE_CONFIRM, GroupConfirmMemberRemoveEvent);
        this._events.set(IncomingHeader.GROUP_MEMBERS, GroupMembersEvent);
        this._events.set(IncomingHeader.GROUP_CREATE_OPTIONS, GroupBuyDataEvent);
        this._events.set(IncomingHeader.GROUP_BADGE_PARTS, GroupBadgePartsEvent);
        this._events.set(IncomingHeader.GROUP_SETTINGS, GroupSettingsEvent);
        this._events.set(IncomingHeader.GROUP_PURCHASED, GroupPurchasedEvent);
        this._events.set(IncomingHeader.GROUP_BADGES, GroupBadgesEvent);

        // HELP
        this._events.set(IncomingHeader.CFH_RESULT_MESSAGE, CallForHelpResultMessageEvent);
        this._events.set(IncomingHeader.HELPER_TALENT_TRACK, TalentTrackEvent);

        // INVENTORY
        this._events.set(IncomingHeader.ACHIEVEMENT_PROGRESSED, AchievementEvent);
        this._events.set(IncomingHeader.ACHIEVEMENT_LIST, AchievementsEvent);
        this._events.set(IncomingHeader.USER_ACHIEVEMENT_SCORE,AchievementsScoreEvent);
        this._events.set(IncomingHeader.USER_EFFECT_ACTIVATE, AvatarEffectActivatedEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST_ADD, AvatarEffectAddedEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST_REMOVE, AvatarEffectExpiredEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST, AvatarEffectsEvent);
        this._events.set(IncomingHeader.USER_BADGES, BadgesEvent);
        this._events.set(IncomingHeader.USER_BADGES_ADD, BadgeReceivedEvent);
        this._events.set(IncomingHeader.BADGE_POINT_LIMITS, BadgePointLimitsEvent);
        this._events.set(IncomingHeader.BADGE_REQUEST_FULFILLED, IsBadgeRequestFulfilledEvent);
        this._events.set(IncomingHeader.USER_CLOTHING, FigureSetIdsMessageEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_ADD, FurnitureListAddOrUpdateEvent);
        this._events.set(IncomingHeader.USER_FURNITURE, FurnitureListEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_REFRESH, FurnitureListInvalidateEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_REMOVE, FurnitureListRemovedEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_POSTIT_PLACED, FurniturePostItPlacedEvent);
        this._events.set(IncomingHeader.USER_PETS, PetInventoryEvent);
        this._events.set(IncomingHeader.USER_PET_REMOVE, PetRemovedFromInventory);
        this._events.set(IncomingHeader.USER_PET_ADD, PetAddedToInventoryEvent);
        this._events.set(IncomingHeader.PET_RECEIVED, PetReceivedMessageEvent);
        this._events.set(IncomingHeader.PET_PLACING_ERROR, PetPlacingErrorEvent);
        this._events.set(IncomingHeader.YOUTUBE_CONTROL_VIDEO, YoutubeControlVideoMessageEvent);
        this._events.set(IncomingHeader.YOUTUBE_DISPLAY_PLAYLISTS, YoutubeDisplayPlaylistsEvent);
        this._events.set(IncomingHeader.YOUTUBE_DISPLAY_VIDEO, YoutubeDisplayVideoMessageEvent);

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

        // LANDING VIEW
        this._events.set(IncomingHeader.COMMUNITY_GOAL_VOTE_EVENT, CommunityGoalVoteMessageEvent);
        this._events.set(IncomingHeader.PROMO_ARTICLES, PromoArticlesMessageEvent);

        // MARKETPLACE
        this._events.set(IncomingHeader.MARKETPLACE_AFTER_ORDER_STATUS, MarketplaceBuyOfferResultEvent);
        this._events.set(IncomingHeader.MARKETPLACE_CANCEL_SALE, MarketplaceCancelOfferResultEvent);
        this._events.set(IncomingHeader.MARKETPLACE_SELL_ITEM, MarketplaceCanMakeOfferResult);
        this._events.set(IncomingHeader.MARKETPLACE_CONFIG, MarketplaceConfigurationEvent);
        this._events.set(IncomingHeader.MARKETPLACE_ITEM_STATS, MarketplaceItemStatsEvent);
        this._events.set(IncomingHeader.MARKETPLACE_ITEM_POSTED, MarketplaceMakeOfferResult);
        this._events.set(IncomingHeader.MARKETPLACE_ITEMS_SEARCHED, MarketPlaceOffersEvent);
        this._events.set(IncomingHeader.MARKETPLACE_OWN_ITEMS, MarketplaceOwnOffersEvent);

        // MODERATION
        this._events.set(IncomingHeader.MARKETPLACE_OWN_ITEMS, UserBannedMessageEvent);
        this._events.set(IncomingHeader.MODERATION_CAUTION, ModeratorCautionEvent);

        // MODTOOL
        this._events.set(IncomingHeader.MODTOOL_ROOM_INFO, ModtoolRoomInfoEvent);
        this._events.set(IncomingHeader.MODTOOL_USER_CHATLOG, ModtoolUserChatlogEvent);
        this._events.set(IncomingHeader.MODTOOL_ROOM_CHATLOG, ModtoolRoomChatlogEvent);
        this._events.set(IncomingHeader.MODERATION_USER_INFO, ModtoolUserInfoEvent);
        this._events.set(IncomingHeader.MODERATION_TOPICS, ModtoolCallForHelpTopicsEvent);
        this._events.set(IncomingHeader.MODERATION_TOOL, ModeratorInitMessageEvent);
        this._events.set(IncomingHeader.MODTOOL_VISITED_ROOMS_USER, ModtoolReceivedRoomsUserEvent);

        // MYSTERY BOX
        this._events.set(IncomingHeader.MYSTERY_BOX_KEYS, MysteryBoxKeysEvent);

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
        this._events.set(IncomingHeader.UNSEEN_ITEMS, UnseenItemsEvent);
        this._events.set(IncomingHeader.ACHIEVEMENT_NOTIFICATION, AchievementNotificationMessageEvent);
        this._events.set(IncomingHeader.INFO_FEED_ENABLE, InfoFeedEnableMessageEvent);
        this._events.set(IncomingHeader.CLUB_GIFT_NOTIFICATION, ClubGiftNotificationEvent);
        this._events.set(IncomingHeader.MODERATOR_MESSAGE, ModeratorMessageEvent);
        this._events.set(IncomingHeader.ACTIVITY_POINT_NOTIFICATION, ActivityPointNotificationMessageEvent);
        this._events.set(IncomingHeader.BOT_ERROR, BotErrorEvent);
        this._events.set(IncomingHeader.PET_LEVEL_NOTIFICATION, PetLevelNotificationEvent);

        // QUEST
        this._events.set(IncomingHeader.COMMUNITY_GOAL_EARNED_PRIZES, CommunityGoalEarnedPrizesMessageEvent);
        this._events.set(IncomingHeader.COMMUNITY_GOAL_PROGRESS, CommunityGoalProgressMessageEvent);
        this._events.set(IncomingHeader.CONCURRENT_USERS_GOAL_PROGRESS, ConcurrentUsersGoalProgressMessageEvent);
        this._events.set(IncomingHeader.QUEST_DAILY, QuestDailyMessageEvent);
        this._events.set(IncomingHeader.QUEST_CANCELLED, QuestCancelledMessageEvent);
        this._events.set(IncomingHeader.QUEST_COMPLETED, QuestCompletedMessageEvent);
        this._events.set(IncomingHeader.COMMUNITY_GOAL_HALL_OF_FAME, CommunityGoalHallOfFameMessageEvent);
        this._events.set(IncomingHeader.EPIC_POPUP, EpicPopupMessageEvent);
        this._events.set(IncomingHeader.SEASONAL_QUESTS, SeasonalQuestsMessageEvent);
        this._events.set(IncomingHeader.QUESTS, QuestsMessageEvent);
        this._events.set(IncomingHeader.QUEST, QuestMessageEvent);

        // ROOM
        this._events.set(IncomingHeader.ROOM_ENTER_ERROR, RoomEnterErrorEvent);
        this._events.set(IncomingHeader.ROOM_ENTER, RoomEnterEvent);
        this._events.set(IncomingHeader.ROOM_FORWARD, RoomForwardEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL, RoomDoorbellEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL_ACCEPTED, RoomDoorbellAcceptedEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL_REJECTED, RoomDoorbellRejectedEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_CLEAR, RoomRightsClearEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_OWNER, RoomRightsOwnerEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS, RoomRightsEvent);
        this._events.set(IncomingHeader.BOT_COMMAND_CONFIGURATION, BotCommandConfigurationEvent);
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
        this._events.set(IncomingHeader.ROOM_ROLLING, ObjectsRollingEvent);
        this._events.set(IncomingHeader.ROOM_CREATED, RoomCreatedEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_ADD, FurnitureFloorAddEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR, FurnitureFloorEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_REMOVE, FurnitureFloorRemoveEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateEvent);
        this._events.set(IncomingHeader.ITEM_WALL_ADD, FurnitureWallAddEvent);
        this._events.set(IncomingHeader.ITEM_WALL, FurnitureWallEvent);
        this._events.set(IncomingHeader.ITEM_WALL_REMOVE, FurnitureWallRemoveEvent);
        this._events.set(IncomingHeader.ITEM_WALL_UPDATE, FurnitureWallUpdateEvent);
        this._events.set(IncomingHeader.FURNITURE_ALIASES, FurnitureAliasesEvent);
        this._events.set(IncomingHeader.FURNITURE_DATA, FurnitureDataEvent);
        this._events.set(IncomingHeader.FURNITURE_ITEMDATA, FurnitureItemDataEvent);
        this._events.set(IncomingHeader.ITEM_STACK_HELPER, FurnitureStackHeightEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE, FurnitureStateEvent);
        this._events.set(IncomingHeader.ITEM_DIMMER_SETTINGS, RoomDimmerPresetsEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE_2, DiceValueMessageEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_FINISHED, LoveLockFurniFinishedEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_FRIEND_COMFIRMED, LoveLockFurniFriendConfirmedEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_START, LoveLockFurniStartEvent);
        this._events.set(IncomingHeader.OBJECTS_DATA_UPDATE, ObjectsDataUpdateEvent);
        this._events.set(IncomingHeader.FURNITURE_GROUP_CONTEXT_MENU_INFO, GroupFurniContextMenuInfoMessageEvent);
        this._events.set(IncomingHeader.FURNITURE_POSTIT_STICKY_POLE_OPEN, FurniturePostItStickyPoleOpenEvent);

        // MAPPING
        this._events.set(IncomingHeader.ROOM_MODEL_DOOR, RoomDoorEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP, RoomHeightMapEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP_UPDATE, RoomHeightMapUpdateEvent);
        this._events.set(IncomingHeader.ROOM_MODEL, RoomModelEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_NAME, RoomModelNameEvent);
        this._events.set(IncomingHeader.ROOM_PAINT, RoomPaintEvent);
        this._events.set(IncomingHeader.ROOM_THICKNESS, RoomThicknessEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_BLOCKED_TILES, RoomBlockedTilesEvent);
        this._events.set(IncomingHeader.PET_FIGURE_UPDATE, PetFigureUpdateEvent);
        this._events.set(IncomingHeader.PET_INFO, PetInfoEvent);
        this._events.set(IncomingHeader.PET_EXPERIENCE, PetExperienceEvent);
        this._events.set(IncomingHeader.PLAYING_GAME, YouArePlayingGameEvent);
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

        // SOUNDS
        this._events.set(IncomingHeader.JUKEBOX_PLAYLIST_FULL, JukeboxPlayListFullMessageEvent);
        this._events.set(IncomingHeader.JUKEBOX_SONG_DISKS, JukeboxSongDisksMessageEvent);
        this._events.set(IncomingHeader.NOW_PLAYING, NowPlayingMessageEvent);
        this._events.set(IncomingHeader.OFFICIAL_SONG_ID, OfficialSongIdMessageEvent);
        this._events.set(IncomingHeader.PLAYLIST, PlayListMessageEvent);
        this._events.set(IncomingHeader.PLAYLIST_SONG_ADDED, PlayListSongAddedMessageEvent);
        this._events.set(IncomingHeader.TRAX_SONG_INFO, TraxSongInfoMessageEvent);
        this._events.set(IncomingHeader.USER_SONG_DISKS_INVENTORY, UserSongDisksInventoryMessageEvent);

        // USER
        this._events.set(IncomingHeader.IN_CLIENT_LINK, InClientLinkEvent);
        this._events.set(IncomingHeader.USER_IGNORED, IgnoredUsersEvent);
        this._events.set(IncomingHeader.USER_IGNORED_RESULT, IgnoreResultEvent);
        this._events.set(IncomingHeader.USER_RESPECT, RespectReceivedEvent);
        this._events.set(IncomingHeader.USER_PERKS, UserPerksEvent);
        this._events.set(IncomingHeader.USER_PERMISSIONS, UserPermissionsEvent);
        this._events.set(IncomingHeader.USER_BADGES_CURRENT, UserCurrentBadgesEvent);
        this._events.set(IncomingHeader.USER_INFO, UserInfoEvent);
        this._events.set(IncomingHeader.UNIT_CHANGE_NAME, UserNameChangeMessageEvent);
        this._events.set(IncomingHeader.USER_SETTINGS, UserSettingsEvent);
        this._events.set(IncomingHeader.USER_PROFILE, UserProfileEvent);
        this._events.set(IncomingHeader.MESSENGER_RELATIONSHIPS, RelationshipStatusInfoEvent);
        this._events.set(IncomingHeader.GIFT_OPENED, PresentOpenedMessageEvent);
        this._events.set(IncomingHeader.USER_CREDITS, UserCreditsEvent);
        this._events.set(IncomingHeader.USER_CURRENCY, UserCurrencyEvent);
        this._events.set(IncomingHeader.USER_SUBSCRIPTION, UserSubscriptionEvent);
        this._events.set(IncomingHeader.USER_WARDROBE_PAGE, UserWardrobePageEvent);

        this._events.set(IncomingHeader.GENERIC_ERROR, GenericErrorEvent);
        this._events.set(IncomingHeader.GROUP_LIST, GuildMembershipsMessageEvent);
        this._events.set(IncomingHeader.CATALOG_APPROVE_NAME_RESULT, ApproveNameMessageEvent);
    }

    private registerComposers(): void
    {
        // AUTHENTICATION
        this._composers.set(OutgoingHeader.AUTHENTICATION, AuthenticationMessageComposer);

        // ADVERTISEMENT
        this._composers.set(OutgoingHeader.INTERSTITIAL_SHOWN, InterstitialShownMessageComposer);
        this._composers.set(OutgoingHeader.GET_INTERSTITIAL, GetInterstitialMessageComposer);

        // AVATAR
        this._composers.set(OutgoingHeader.GET_WARDROBE, GetWardrobeMessageComposer);
        this._composers.set(OutgoingHeader.SAVE_WARDROBE_OUTFIT, SaveWardrobeOutfitMessageComposer);
        this._composers.set(OutgoingHeader.CHANGE_USERNAME, ChangeUserNameMessageComposer);
        this._composers.set(OutgoingHeader.CHECK_USERNAME, CheckUserNameMessageComposer);

        // CAMERA
        this._composers.set(OutgoingHeader.REQUEST_CAMERA_CONFIGURATION, RequestCameraConfigurationComposer);
        this._composers.set(OutgoingHeader.RENDER_ROOM, RenderRoomMessageComposer);
        this._composers.set(OutgoingHeader.RENDER_ROOM_THUMBNAIL, RenderRoomThumbnailMessageComposer);
        this._composers.set(OutgoingHeader.PURCHASE_PHOTO, PurchasePhotoMessageComposer);
        this._composers.set(OutgoingHeader.PUBLISH_PHOTO, PublishPhotoMessageComposer);
        this._composers.set(OutgoingHeader.PHOTO_COMPETITION, PhotoCompetitionMessageComposer);

        // CAMPAIGN
        this._composers.set(OutgoingHeader.OPEN_CAMPAIGN_CALENDAR_DOOR, OpenCampaignCalendarDoorComposer);
        this._composers.set(OutgoingHeader.OPEN_CAMPAIGN_CALENDAR_DOOR_STAFF, OpenCampaignCalendarDoorAsStaffComposer);

        // CATALOG
        this._composers.set(OutgoingHeader.BUILDERS_CLUB_PLACE_ROOM_ITEM, BuildersClubPlaceRoomItemMessageComposer);
        this._composers.set(OutgoingHeader.BUILDERS_CLUB_PLACE_WALL_ITEM, BuildersClubPlaceWallItemMessageComposer);
        this._composers.set(OutgoingHeader.BUILDERS_CLUB_QUERY_FURNI_COUNT, BuildersClubQueryFurniCountMessageComposer);
        this._composers.set(OutgoingHeader.GET_CATALOG_INDEX, GetCatalogIndexComposer);
        this._composers.set(OutgoingHeader.GET_CATALOG_PAGE, GetCatalogPageComposer);
        this._composers.set(OutgoingHeader.CATALOG_PURCHASE, PurchaseFromCatalogComposer);
        this._composers.set(OutgoingHeader.CATALOG_PURCHASE_GIFT, PurchaseFromCatalogAsGiftComposer);
        this._composers.set(OutgoingHeader.GET_PRODUCT_OFFER, GetProductOfferComposer);
        this._composers.set(OutgoingHeader.GET_CLUB_OFFERS, GetClubOffersMessageComposer);
        this._composers.set(OutgoingHeader.GET_CLUB_GIFT_INFO, GetClubGiftInfo);
        this._composers.set(OutgoingHeader.CATALOG_REDEEM_VOUCHER, RedeemVoucherMessageComposer);
        this._composers.set(OutgoingHeader.GROUP_MEMBERSHIPS, CatalogGroupsComposer);
        this._composers.set(OutgoingHeader.GET_GIFT_WRAPPING_CONFIG, GetGiftWrappingConfigurationComposer);
        this._composers.set(OutgoingHeader.CATALOG_SELECT_VIP_GIFT, SelectClubGiftComposer);
        this._composers.set(OutgoingHeader.CATALOG_REQUESET_PET_BREEDS, GetSellablePetPalettesComposer);
        this._composers.set(OutgoingHeader.GET_BONUS_RARE_INFO, GetBonusRareInfoMessageComposer);
        this._composers.set(OutgoingHeader.GET_BUNDLE_DISCOUNT_RULESET, GetBundleDiscountRulesetComposer);
        this._composers.set(OutgoingHeader.GET_CATALOG_PAGE_EXPIRATION, GetCatalogPageExpirationComposer);
        this._composers.set(OutgoingHeader.GET_CATALOG_PAGE_WITH_EARLIEST_EXP, GetCatalogPageWithEarliestExpiryComposer);
        this._composers.set(OutgoingHeader.GET_DIRECT_CLUB_BUY_AVAILABLE, GetDirectClubBuyAvailableComposer);
        this._composers.set(OutgoingHeader.GET_HABBO_BASIC_MEMBERSHIP_EXTEND_OFFER, GetHabboBasicMembershipExtendOfferComposer);
        this._composers.set(OutgoingHeader.GET_HABBO_CLUB_EXTEND_OFFER, GetHabboClubExtendOfferMessageComposer);
        this._composers.set(OutgoingHeader.GET_IS_OFFER_GIFTABLE, GetIsOfferGiftableComposer);
        this._composers.set(OutgoingHeader.GET_LIMITED_OFFER_APPEARING_NEXT, GetLimitedOfferAppearingNextComposer);
        this._composers.set(OutgoingHeader.GET_NEXT_TARGETED_OFFER, GetNextTargetedOfferComposer);
        this._composers.set(OutgoingHeader.GET_ROOM_AD_PURCHASE_INFO, GetRoomAdPurchaseInfoComposer);
        this._composers.set(OutgoingHeader.GET_SEASONAL_CALENDAR_DAILY_OFFER, GetSeasonalCalendarDailyOfferComposer);
        this._composers.set(OutgoingHeader.GET_TARGETED_OFFER, GetTargetedOfferComposer);
        this._composers.set(OutgoingHeader.MARK_CATALOG_NEW_ADDITIONS_PAGE_OPENED, MarkCatalogNewAdditionsPageOpenedComposer);
        this._composers.set(OutgoingHeader.PURCHASE_BASIC_MEMBERSHIP_EXTENSION, PurchaseBasicMembershipExtensionComposer);
        this._composers.set(OutgoingHeader.PURCHASE_ROOM_AD, PurchaseRoomAdMessageComposer);
        this._composers.set(OutgoingHeader.PURCHASE_TARGETED_OFFER, PurchaseTargetedOfferComposer);
        this._composers.set(OutgoingHeader.PURCHASE_VIP_MEMBERSHIP_EXTENSION, PurchaseVipMembershipExtensionComposer);
        this._composers.set(OutgoingHeader.ROOM_AD_PURCHASE_INITIATED, RoomAdPurchaseInitiatedComposer);
        this._composers.set(OutgoingHeader.SET_TARGETTED_OFFER_STATE, SetTargetedOfferStateComposer);
        this._composers.set(OutgoingHeader.SHOP_TARGETED_OFFER_VIEWED, ShopTargetedOfferViewedComposer);

        // COMPETITION
        this._composers.set(OutgoingHeader.FORWARD_TO_A_COMPETITION_ROOM, ForwardToACompetitionRoomMessageComposer);
        this._composers.set(OutgoingHeader.FORWARD_TO_A_SUBMITTABLE_ROOM, ForwardToASubmittableRoomMessageComposer);
        this._composers.set(OutgoingHeader.FORWARD_TO_RANDOM_COMPETITION_ROOM, ForwardToRandomCompetitionRoomMessageComposer);
        this._composers.set(OutgoingHeader.GET_CURRENT_TIMING_CODE, GetCurrentTimingCodeMessageComposer);
        this._composers.set(OutgoingHeader.GET_IS_USER_PART_OF_COMPETITION, GetIsUserPartOfCompetitionMessageComposer);
        this._composers.set(OutgoingHeader.GET_SECONDS_UNTIL, GetSecondsUntilMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_COMPETITION_INIT, RoomCompetitionInitMessageComposer);
        this._composers.set(OutgoingHeader.SUBMIT_ROOM_TO_COMPETITION, SubmitRoomToCompetitionMessageComposer);
        this._composers.set(OutgoingHeader.VOTE_FOR_ROOM, VoteForRoomMessageComposer);

        // CRAFTING
        this._composers.set(OutgoingHeader.CRAFT, CraftComposer);
        this._composers.set(OutgoingHeader.CRAFT_SECRET, CraftSecretComposer);
        this._composers.set(OutgoingHeader.GET_CRAFTABLE_PRODUCTS, GetCraftableProductsComposer);
        this._composers.set(OutgoingHeader.GET_CRAFTING_RECIPE, GetCraftingRecipeComposer);
        this._composers.set(OutgoingHeader.GET_CRAFTING_RECIPES_AVAILABLE, GetCraftingRecipesAvailableComposer);

        // FRIENDFURNI
        this._composers.set(OutgoingHeader.FRIEND_FURNI_CONFIRM_LOCK, FriendFurniConfirmLockMessageComposer);

        // FRIENDLIST
        this._composers.set(OutgoingHeader.ACCEPT_FRIEND, AcceptFriendMessageComposer);
        this._composers.set(OutgoingHeader.DECLINE_FRIEND, DeclineFriendMessageComposer);
        this._composers.set(OutgoingHeader.FIND_NEW_FRIENDS, FindNewFriendsMessageComposer);
        this._composers.set(OutgoingHeader.FOLLOW_FRIEND, FollowFriendMessageComposer);
        this._composers.set(OutgoingHeader.FRIEND_LIST_UPDATE, FriendListUpdateComposer);
        this._composers.set(OutgoingHeader.GET_FRIEND_REQUESTS, GetFriendRequestsComposer);
        this._composers.set(OutgoingHeader.HABBO_SEARCH, HabboSearchComposer);
        this._composers.set(OutgoingHeader.MESSENGER_INIT, MessengerInitComposer);
        this._composers.set(OutgoingHeader.REMOVE_FRIEND, RemoveFriendComposer);
        this._composers.set(OutgoingHeader.REQUEST_FRIEND, RequestFriendComposer);
        this._composers.set(OutgoingHeader.MESSENGER_CHAT, SendMessageComposer);
        this._composers.set(OutgoingHeader.SEND_ROOM_INVITE, SendRoomInviteComposer);
        this._composers.set(OutgoingHeader.SET_RELATIONSHIP_STATUS, SetRelationshipStatusComposer);
        this._composers.set(OutgoingHeader.VISIT_USER, VisitUserComposer);

        // todo: game

        // GIFTS
        this._composers.set(OutgoingHeader.GET_GIFT, GetGiftMessageComposer);
        this._composers.set(OutgoingHeader.RESET_PHONE_NUMBER_STATE, ResetPhoneNumberStateMessageComposer);
        this._composers.set(OutgoingHeader.SET_PHONE_NUMBER_VERIFICATION_STATUS, SetPhoneNumberVerificationStatusMessageComposer);
        this._composers.set(OutgoingHeader.TRY_PHONE_NUMBER, TryPhoneNumberMessageComposer);
        this._composers.set(OutgoingHeader.VERIFY_CODE, VerifyCodeMessageComposer);

        // GROUPFORUMS
        this._composers.set(OutgoingHeader.GET_FORUM_STATS, GetForumStatsMessageComposer);
        this._composers.set(OutgoingHeader.GET_FORUMS_LIST, GetForumsListMessageComposer);
        this._composers.set(OutgoingHeader.GET_FORUM_MESSAGES, GetMessagesMessageComposer);
        this._composers.set(OutgoingHeader.GET_FORUM_THREAD, GetThreadMessageComposer);
        this._composers.set(OutgoingHeader.GET_FORUM_THREADS, GetThreadsMessageComposer);
        this._composers.set(OutgoingHeader.GET_UNREAD_FORUMS_COUNT, GetUnreadForumsCountMessageComposer);
        this._composers.set(OutgoingHeader.FORUM_MODERATE_MESSAGE, ModerateMessageMessageComposer);
        this._composers.set(OutgoingHeader.FORUM_MODERATE_THREAD, ModerateThreadMessageComposer);
        this._composers.set(OutgoingHeader.FORUM_POST_MESSAGE, PostMessageMessageComposer);
        this._composers.set(OutgoingHeader.UPDATE_FORUM_READ_MARKER, UpdateForumReadMarkerMessageComposer);
        this._composers.set(OutgoingHeader.UPDATE_FORUM_SETTINGS, UpdateForumSettingsMessageComposer);
        this._composers.set(OutgoingHeader.FORUM_UPDATE_THREAD, UpdateThreadMessageComposer);

        // CLIENT
        this._composers.set(OutgoingHeader.CLIENT_PONG, ClientPongComposer);
        this._composers.set(OutgoingHeader.RELEASE_VERSION, ClientReleaseVersionComposer);

        // DESKTOP
        this._composers.set(OutgoingHeader.DESKTOP_VIEW, DesktopViewComposer);

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
        this._composers.set(OutgoingHeader.GROUP_FAVORITE, GroupFavoriteComposer);
        this._composers.set(OutgoingHeader.GROUP_BADGES, GroupBadgesComposer);

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
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE_OWN, RemoveOwnRoomRightsRoomMessageComposer);

        // INVENTORY

        //// BADGES
        this._composers.set(OutgoingHeader.USER_BADGES, RequestBadgesComposer);
        this._composers.set(OutgoingHeader.USER_BADGES_CURRENT_UPDATE, SetActivatedBadgesComposer);

        //// BOTS
        this._composers.set(OutgoingHeader.USER_BOTS, GetBotInventoryComposer);

        //// FURNI
        this._composers.set(OutgoingHeader.USER_FURNITURE, FurnitureListComposer);
        this._composers.set(OutgoingHeader.USER_FURNITURE2, FurnitureList2Composer);

        //// MARKETPLACE
        this._composers.set(OutgoingHeader.REQUEST_SELL_ITEM, RequestSellItemComposer);
        this._composers.set(OutgoingHeader.REQUEST_MARKETPLACE_ITEM_STATS, MarketplaceRequesstItemStatsComposer);

        //// PETS
        this._composers.set(OutgoingHeader.USER_PETS, RequestPetsComposer);

        //// TRADING
        this._composers.set(OutgoingHeader.TRADE_ACCEPT, TradingAcceptComposer);
        this._composers.set(OutgoingHeader.TRADE_CANCEL, TradingCancelComposer);
        this._composers.set(OutgoingHeader.TRADE_CLOSE, TradingCloseComposer);
        this._composers.set(OutgoingHeader.TRADE_CONFIRM, TradingConfirmationComposer);
        this._composers.set(OutgoingHeader.TRADE_ITEM, TradingListAddItemComposer);
        this._composers.set(OutgoingHeader.TRADE_ITEMS, TradingListAddItemsComposer);
        this._composers.set(OutgoingHeader.TRADE_ITEM_REMOVE, TradingListItemRemoveComposer);
        this._composers.set(OutgoingHeader.TRADE, TradingOpenComposer);
        this._composers.set(OutgoingHeader.TRADE_UNACCEPT, TradingUnacceptComposer);

        //// UNSEEN
        this._composers.set(OutgoingHeader.UNSEEN_RESET_CATEGORY, UnseenResetCategoryComposer);
        this._composers.set(OutgoingHeader.UNSEEN_RESET_ITEMS, UnseenResetItemsComposer);

        // ACHIVEMENTS
        this._composers.set(OutgoingHeader.ACHIEVEMENT_LIST, RequestAchievementsMessageComposer);

        // PET
        this._composers.set(OutgoingHeader.PET_MOUNT, PetMountComposer);
        this._composers.set(OutgoingHeader.PET_RESPECT, PetRespectComposer);
        this._composers.set(OutgoingHeader.PET_SUPPLEMENT, PetSupplementComposer);
        this._composers.set(OutgoingHeader.REMOVE_PET_SADDLE, RemovePetSaddleComposer);
        this._composers.set(OutgoingHeader.PET_INFO, RequestPetInfoComposer);
        this._composers.set(OutgoingHeader.TOGGLE_PET_BREEDING, TogglePetBreedingComposer);
        this._composers.set(OutgoingHeader.TOGGLE_PET_RIDING, TogglePetRidingComposer);
        this._composers.set(OutgoingHeader.USE_PET_PRODUCT, UsePetProductComposer);

        // ROOM
        this._composers.set(OutgoingHeader.ROOM_CREATE, RoomCreateComposer);

        // ACCESS
        this._composers.set(OutgoingHeader.ROOM_ENTER, RoomEnterComposer);
        this._composers.set(OutgoingHeader.ROOM_DOORBELL, RoomDoorbellAccessComposer);
        this._composers.set(OutgoingHeader.GO_TO_FLAT, GoToFlatMessageComposer);

        // ACTION
        this._composers.set(OutgoingHeader.ROOM_AMBASSADOR_ALERT, RoomAmbassadorAlertComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_GIVE, RoomBanUserComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_REMOVE, RoomUnbanUserComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_GIVE, RoomGiveRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_KICK, RoomKickUserComposer);
        this._composers.set(OutgoingHeader.ROOM_MUTE_USER, RoomMuteUserComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE, RoomTakeRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE_ALL, RemoveAllRightsMessageComposer);

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
        this._composers.set(OutgoingHeader.BOT_PLACE, BotPlaceComposer);
        this._composers.set(OutgoingHeader.BOT_PICKUP, BotRemoveComposer);
        this._composers.set(OutgoingHeader.BOT_SKILL_SAVE, BotSkillSaveComposer);
        this._composers.set(OutgoingHeader.PET_PLACE, PetPlaceComposer);
        this._composers.set(OutgoingHeader.PET_MOVE, PetMoveComposer);
        this._composers.set(OutgoingHeader.PET_PICKUP, PetRemoveComposer);
        this._composers.set(OutgoingHeader.SET_ITEM_DATA, SetItemDataMessageComposer);
        this._composers.set(OutgoingHeader.SET_OBJECT_DATA, SetObjectDataMessageComposer);

        // FURNITURE
        this._composers.set(OutgoingHeader.FURNITURE_ALIASES, FurnitureAliasesComposer);
        this._composers.set(OutgoingHeader.FURNITURE_GROUP_INFO, FurnitureGroupInfoComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PICKUP, FurniturePickupComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PLACE, FurniturePlaceComposer);
        this._composers.set(OutgoingHeader.ITEM_PAINT, FurniturePlacePaintComposer);
        this._composers.set(OutgoingHeader.FURNITURE_POSTIT_PLACE, FurniturePostItPlaceComposer);
        this._composers.set(OutgoingHeader.FURNITURE_POSTIT_SAVE_STICKY_POLE, FurniturePostItSaveStickyPoleComposer);
        this._composers.set(OutgoingHeader.CONTROL_YOUTUBE_DISPLAY_PLAYBACK, ControlYoutubeDisplayPlaybackMessageComposer);
        this._composers.set(OutgoingHeader.GET_YOUTUBE_DISPLAY_STATUS, GetYoutubeDisplayStatusMessageComposer);
        this._composers.set(OutgoingHeader.SET_YOUTUBE_DISPLAY_PLAYLIST, SetYoutubeDisplayPlaylistMessageComposer);

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
        this._composers.set(OutgoingHeader.UNIT_GIVE_HANDITEM_PET, RoomUnitGiveHandItemPetComposer);
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
        this._composers.set(OutgoingHeader.APPROVE_NAME, ApproveNameMessageComposer);
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
        this._composers.set(OutgoingHeader.MARKETPLACE_REDEEM_CREDITS, MarketplaceRedeemCreditsComposer);

        // BOTS
        this._composers.set(OutgoingHeader.USER_BOTS, GetBotInventoryComposer);

        // PETS
        this._composers.set(OutgoingHeader.USER_PETS, RequestPetsComposer);

        // CURRENCY
        this._composers.set(OutgoingHeader.USER_CURRENCY, UserCurrencyComposer);

        // SUBSCRIPTION
        this._composers.set(OutgoingHeader.USER_SUBSCRIPTION, UserSubscriptionComposer);

        // MODTOOL
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_ROOM_INFO, ModtoolRequestRoomInfoComposer);
        this._composers.set(OutgoingHeader.MODTOOL_CHANGE_ROOM_SETTINGS, ModerateRoomMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_USER_CHATLOG, ModtoolRequestUserChatlogComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_ROOM_CHATLOG, ModtoolRequestRoomChatlogComposer);
        this._composers.set(OutgoingHeader.MOD_TOOL_USER_INFO, ModtoolRequestUserInfoComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_ALERT, ModtoolSanctionAlertComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_BAN, ModtoolSanctionBanComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_KICK, ModtoolSanctionKickComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_TRADELOCK, ModtoolSanctionTradelockComposer);
        this._composers.set(OutgoingHeader.MODTOOL_ALERTEVENT, ModMessageMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_MUTE, ModtoolSanctionMuteComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_USER_ROOMS, ModtoolRequestUserRoomsComposer);
        this._composers.set(OutgoingHeader.MODTOOL_ROOM_ALERT, ModeratorActionMessageComposer);

        // SETTINGS
        this._composers.set(OutgoingHeader.USER_SETTINGS_CAMERA, UserSettingsCameraFollowComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_OLD_CHAT, UserSettingsOldChatComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_INVITES, UserSettingsRoomInvitesComposer);
        this._composers.set(OutgoingHeader.USER_SETTINGS_VOLUME, UserSettingsSoundComposer);

        // LANDING VIEW
        this._composers.set(OutgoingHeader.COMMUNITY_GOAL_VOTE_COMPOSER, CommunityGoalVoteMessageComposer);
        this._composers.set(OutgoingHeader.GET_PROMO_ARTICLES, GetPromoArticlesComposer);

        // QUEST
        this._composers.set(OutgoingHeader.ACCEPT_QUEST, AcceptQuestMessageComposer);
        this._composers.set(OutgoingHeader.ACTIVATE_QUEST, ActivateQuestMessageComposer);
        this._composers.set(OutgoingHeader.CANCEL_QUEST, CancelQuestMessageComposer);
        this._composers.set(OutgoingHeader.FRIEND_REQUEST_QUEST_COMPLETE, FriendRequestQuestCompleteMessageComposer);
        this._composers.set(OutgoingHeader.GET_COMMUNITY_GOAL_EARNED_PRIZES, GetCommunityGoalEarnedPrizesMessageComposer);
        this._composers.set(OutgoingHeader.GET_COMMUNITY_GOAL_HALL_OF_FAME, GetCommunityGoalHallOfFameMessageComposer);
        this._composers.set(OutgoingHeader.GET_COMMUNITY_GOAL_PROGRESS, GetCommunityGoalProgressMessageComposer);
        this._composers.set(OutgoingHeader.GET_CONCURRENT_USERS_GOAL_PROGRESS, GetConcurrentUsersGoalProgressMessageComposer);
        this._composers.set(OutgoingHeader.GET_CONCURRENT_USERS_REWARD, GetConcurrentUsersRewardMessageComposer);
        this._composers.set(OutgoingHeader.GET_DAILY_QUEST, GetDailyQuestMessageComposer);
        this._composers.set(OutgoingHeader.GET_QUESTS, GetQuestsMessageComposer);
        this._composers.set(OutgoingHeader.GET_SEASONAL_QUESTS_ONLY, GetSeasonalQuestsOnlyMessageComposer);
        this._composers.set(OutgoingHeader.OPEN_QUEST_TRACKER, OpenQuestTrackerMessageComposer);
        this._composers.set(OutgoingHeader.REDEEM_COMMUNITY_GOAL_PRIZE, RedeemCommunityGoalPrizeMessageComposer);
        this._composers.set(OutgoingHeader.REJECT_QUEST, RejectQuestMessageComposer);
        this._composers.set(OutgoingHeader.START_CAMPAIGN, StartCampaignMessageComposer);

        // SOUNDS
        this._composers.set(OutgoingHeader.GET_SOUND_SETTINGS, GetSoundSettingsComposer);
        this._composers.set(OutgoingHeader.ADD_JUKEBOX_DISK, AddJukeboxDiskComposer);
        this._composers.set(OutgoingHeader.GET_JUKEBOX_PLAYLIST, GetJukeboxPlayListMessageComposer);
        this._composers.set(OutgoingHeader.GET_NOW_PLAYING, GetNowPlayingMessageComposer);
        this._composers.set(OutgoingHeader.GET_OFFICIAL_SONG_ID, GetOfficialSongIdMessageComposer);
        this._composers.set(OutgoingHeader.GET_SONG_INFO, GetSongInfoMessageComposer);
        this._composers.set(OutgoingHeader.GET_SOUND_MACHINE_PLAYLIST, GetSoundMachinePlayListMessageComposer);
        this._composers.set(OutgoingHeader.GET_USER_SONG_DISKS, GetUserSongDisksMessageComposer);
        this._composers.set(OutgoingHeader.REMOVE_JUKEBOX_DISK, RemoveJukeboxDiskComposer);

        // HELPER
        this._composers.set(OutgoingHeader.HELPER_TALENT_TRACK, TalentTrackComposer);
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
