import { IMessageConfiguration } from '../../api';
import { AcceptFriendMessageComposer, AcceptFriendResultEvent, AcceptGameInviteMessageComposer, AcceptQuestMessageComposer, AccountSafetyLockStatusChangeMessageEvent, AchievementEvent, AchievementNotificationMessageEvent, AchievementResolutionCompletedMessageEvent, AchievementResolutionProgressMessageEvent, AchievementResolutionsMessageEvent, AchievementsEvent, AchievementsScoreEvent, ActivateQuestMessageComposer, ActivityPointNotificationMessageEvent, AddFavouriteRoomMessageComposer, AddJukeboxDiskComposer, AddSpamWallPostItMessageComposer, ApplySnapshotMessageComposer, ApplyTonerComposer, ApproveAllMembershipRequestsMessageComposer, ApproveNameMessageComposer, ApproveNameMessageEvent, AuthenticatedEvent, AuthenticationMessageComposer, AvailabilityStatusMessageEvent, AvailabilityTimeMessageEvent, AvatarEffectActivatedComposer, AvatarEffectActivatedEvent, AvatarEffectAddedEvent, AvatarEffectExpiredEvent, AvatarEffectSelectedComposer, AvatarEffectSelectedEvent, AvatarEffectsEvent, BadgePointLimitsEvent, BadgeReceivedEvent, BadgesEvent, BannedUsersFromRoomEvent, BonusRareInfoMessageEvent, BotAddedToInventoryEvent, BotCommandConfigurationEvent, BotErrorEvent, BotForceOpenContextMenuEvent, BotInventoryMessageEvent, BotPlaceComposer, BotReceivedMessageEvent, BotRemoveComposer, BotRemovedFromInventoryEvent, BotSkillListUpdateEvent, BotSkillSaveComposer, BreedPetsMessageComposer, BuildersClubFurniCountMessageEvent, BuildersClubPlaceRoomItemMessageComposer, BuildersClubPlaceWallItemMessageComposer, BuildersClubQueryFurniCountMessageComposer, BuildersClubSubscriptionStatusMessageEvent, BundleDiscountRulesetMessageEvent, BuyMarketplaceOfferMessageComposer, BuyMarketplaceTokensMessageComposer, CallForHelpDisabledNotifyMessageEvent, CallForHelpFromForumMessageMessageComposer, CallForHelpFromForumThreadMessageComposer, CallForHelpFromIMMessageComposer, CallForHelpFromPhotoMessageComposer, CallForHelpFromSelfieMessageComposer, CallForHelpMessageComposer, CallForHelpPendingCallsDeletedMessageEvent, CallForHelpPendingCallsMessageEvent, CallForHelpReplyMessageEvent, CallForHelpResultMessageEvent, CameraPublishStatusMessageEvent, CameraPurchaseOKMessageEvent, CameraSnapshotMessageEvent, CameraStorageUrlMessageEvent, CampaignCalendarDataMessageEvent, CampaignCalendarDoorOpenedMessageEvent, CancelEventMessageComposer, CancelMarketplaceOfferMessageComposer, CancelMysteryBoxWaitMessageEvent, CancelPetBreedingComposer, CancelQuestMessageComposer, CanCreateRoomEvent, CanCreateRoomEventEvent, CanCreateRoomMessageComposer, CatalogGroupsComposer, CatalogPageExpirationEvent, CatalogPageMessageEvent, CatalogPagesListEvent, CatalogPageWithEarliestExpiryMessageEvent, CatalogPublishedMessageEvent, CategoriesWithVisitorCountEvent, CfhChatlogEvent, CfhSanctionMessageEvent, CfhTopicsInitEvent, ChangeEmailComposer, ChangeEmailResultEvent, ChangeQueueMessageComposer, ChangeUserNameMessageComposer, ChangeUserNameResultMessageEvent, ChatReviewGuideDecidesOnOfferMessageComposer, ChatReviewGuideDetachedMessageComposer, ChatReviewGuideVoteMessageComposer, ChatReviewSessionCreateMessageComposer, ChatReviewSessionDetachedMessageEvent, ChatReviewSessionOfferedToGuideMessageEvent, ChatReviewSessionResultsMessageEvent, ChatReviewSessionStartedMessageEvent, ChatReviewSessionVotingStatusMessageEvent, CheckUserNameMessageComposer, CheckUserNameResultMessageEvent, ClientHelloMessageComposer, ClientPingEvent, CloseIssueDefaultActionMessageComposer, CloseIssuesMessageComposer, ClubGiftInfoEvent, ClubGiftNotificationEvent, ClubGiftSelectedEvent, CommunityGoalEarnedPrizesMessageEvent, CommunityGoalHallOfFameMessageEvent, CommunityGoalProgressMessageEvent, CommunityGoalVoteMessageComposer, CommunityGoalVoteMessageEvent, CompetitionEntrySubmitResultEvent, CompetitionRoomsDataMessageEvent, CompetitionRoomsSearchMessageComposer, CompetitionStatusMessageEvent, CompetitionVotingInfoMessageEvent, CompleteDiffieHandshakeEvent, CompleteDiffieHandshakeMessageComposer, CompostPlantMessageComposer, ConcurrentUsersGoalProgressMessageEvent, ConfirmPetBreedingComposer, ConnectionErrorEvent, ControlYoutubeDisplayPlaybackMessageComposer, ConvertedRoomIdEvent, ConvertGlobalRoomIdMessageComposer, CraftableProductsEvent, CraftComposer, CraftingRecipeEvent, CraftingRecipesAvailableEvent, CraftingResultEvent, CraftSecretComposer, CreateFlatMessageComposer, CurrentTimingCodeMessageEvent, CustomUserNotificationMessageEvent, DeclineFriendMessageComposer, DefaultSanctionMessageComposer, DeleteFavouriteRoomMessageComposer, DeletePendingCallsForHelpMessageComposer, DesktopViewComposer, DesktopViewEvent, DiceValueMessageEvent, DirectSMSClubBuyAvailableMessageEvent, DisconnectMessageComposer, DisconnectReasonEvent, DoorbellMessageEvent, EditEventMessageComposer, ElementPointerMessageEvent, EmailStatusResultEvent, EpicPopupMessageEvent, ExtendedProfileChangedMessageEvent, ExtendRentOrBuyoutFurniMessageComposer, ExtendRentOrBuyoutStripItemMessageComposer, FavoriteMembershipUpdateMessageEvent, FavouriteChangedEvent, FavouritesEvent, FigureSetIdsMessageEvent, FigureUpdateEvent, FindFriendsProcessResultEvent, FindNewFriendsMessageComposer, FireworkChargeDataEvent, FlatAccessDeniedMessageEvent, FlatControllerAddedEvent, FlatControllerRemovedEvent, FlatControllersEvent, FlatCreatedEvent, FloodControlEvent, FloorHeightMapEvent, FollowFriendFailedEvent, FollowFriendMessageComposer, ForumDataMessageEvent, ForumsListMessageEvent, ForwardToACompetitionRoomMessageComposer, ForwardToARandomPromotedRoomMessageComposer, ForwardToASubmittableRoomMessageComposer, ForwardToRandomCompetitionRoomMessageComposer, ForwardToSomeRoomMessageComposer, FriendFurniConfirmLockMessageComposer, FriendListFragmentEvent, FriendListUpdateComposer, FriendListUpdateEvent, FriendNotificationEvent, FriendRequestQuestCompleteMessageComposer, FriendRequestsEvent, FurniRentOrBuyoutOfferMessageEvent, FurnitureAliasesComposer, FurnitureAliasesEvent, FurnitureColorWheelComposer, FurnitureDataEvent, FurnitureDiceActivateComposer, FurnitureDiceDeactivateComposer, FurnitureExchangeComposer, FurnitureFloorAddEvent, FurnitureFloorEvent, FurnitureFloorRemoveEvent, FurnitureFloorUpdateComposer, FurnitureFloorUpdateEvent, FurnitureGroupInfoComposer, FurnitureListAddOrUpdateEvent, FurnitureListComposer, FurnitureListEvent, FurnitureListInvalidateEvent, FurnitureListRemovedEvent, FurnitureMannequinSaveLookComposer, FurnitureMannequinSaveNameComposer, FurnitureMultiStateComposer, FurnitureOneWayDoorComposer, FurniturePickupComposer, FurniturePlaceComposer, FurniturePlacePaintComposer, FurniturePostItPlaceComposer, FurniturePostItPlacedEvent, FurnitureRandomStateComposer, FurnitureStackHeightComposer, FurnitureStackHeightEvent, FurnitureWallAddEvent, FurnitureWallEvent, FurnitureWallMultiStateComposer, FurnitureWallRemoveEvent, FurnitureWallUpdateComposer, FurnitureWallUpdateEvent, Game2AccountGameStatusMessageEvent, Game2CheckGameDirectoryStatusMessageComposer, Game2ExitGameMessageComposer, Game2GameChatMessageComposer, Game2GameDirectoryStatusMessageEvent, Game2GetAccountGameStatusMessageComposer, Game2GetWeeklyFriendsLeaderboardComposer, Game2GetWeeklyLeaderboardComposer, Game2InArenaQueueMessageEvent, Game2JoiningGameFailedMessageEvent, Game2LoadStageReadyMessageComposer, Game2PlayAgainMessageComposer, Game2RequestFullStatusUpdateMessageComposer, Game2StartingGameFailedMessageEvent, Game2StopCounterMessageEvent, Game2UserLeftGameMessageEvent, Game2WeeklyFriendsLeaderboardEvent, Game2WeeklyLeaderboardEvent, GameAchievementsMessageEvent, GameInviteMessageEvent, GameListMessageEvent, GameStatusMessageEvent, GameUnloadedMessageComposer, GenericErrorEvent, GetBadgePointLimitsComposer, GetBonusRareInfoMessageComposer, GetBotInventoryComposer, GetBundleDiscountRulesetComposer, GetCatalogIndexComposer, GetCatalogPageComposer, GetCatalogPageExpirationComposer, GetCatalogPageWithEarliestExpiryComposer, GetCategoriesWithUserCountMessageComposer, GetCfhChatlogMessageComposer, GetCfhStatusMessageComposer, GetClubGiftInfo, GetClubOffersMessageComposer, GetCommunityGoalEarnedPrizesMessageComposer, GetCommunityGoalHallOfFameMessageComposer, GetCommunityGoalProgressMessageComposer, GetConcurrentUsersGoalProgressMessageComposer, GetConcurrentUsersRewardMessageComposer, GetCraftableProductsComposer, GetCraftingRecipeComposer, GetCraftingRecipesAvailableComposer, GetCurrentTimingCodeMessageComposer, GetCustomRoomFilterMessageComposer, GetDailyQuestMessageComposer, GetDirectClubBuyAvailableComposer, GetEmailStatusComposer, GetExtendedProfileByNameMessageComposer, GetFaqCategoryMessageComposer, GetFaqTextMessageComposer, GetForumsListMessageComposer, GetForumStatsMessageComposer, GetFriendRequestsComposer, GetGameAchievementsMessageComposer, GetGameListMessageComposer, GetGameStatusMessageComposer, GetGiftMessageComposer, GetGiftWrappingConfigurationComposer, GetGuestRoomMessageComposer, GetGuestRoomResultEvent, GetGuideReportingStatusMessageComposer, GetHabboBasicMembershipExtendOfferComposer, GetHabboClubExtendOfferMessageComposer, GetHabboGroupBadgesMessageComposer, GetIgnoredUsersComposer, GetInterstitialMessageComposer, GetIsBadgeRequestFulfilledComposer, GetIsOfferGiftableComposer, GetIsUserPartOfCompetitionMessageComposer, GetItemDataComposer, GetJukeboxPlayListMessageComposer, GetLimitedOfferAppearingNextComposer, GetMarketplaceCanMakeOfferComposer, GetMarketplaceConfigurationMessageComposer, GetMarketplaceItemStatsComposer, GetMarketplaceOffersMessageComposer, GetMarketplaceOwnOffersMessageComposer, GetMessagesMessageComposer, GetModeratorRoomInfoMessageComposer, GetModeratorUserInfoMessageComposer, GetNextTargetedOfferComposer, GetNowPlayingMessageComposer, GetOccupiedTilesMessageComposer, GetOfficialRoomsMessageComposer, GetOfficialSongIdMessageComposer, GetPendingCallsForHelpMessageComposer, GetPetCommandsComposer, GetPopularRoomTagsMessageComposer, GetProductOfferComposer, GetPromoArticlesComposer, GetQuestsMessageComposer, GetQuizQuestionsComposer, GetRecyclerStatusMessageComposer, GetRentOrBuyoutOfferMessageComposer, GetResolutionAchievementsMessageComposer, GetRoomAdPurchaseInfoComposer, GetRoomChatlogMessageComposer, GetRoomEntryDataMessageComposer, GetRoomEntryTileMessageComposer, GetRoomVisitsMessageComposer, GetSeasonalCalendarDailyOfferComposer, GetSeasonalQuestsOnlyMessageComposer, GetSecondsUntilMessageComposer, GetSellablePetPalettesComposer, GetSongInfoMessageComposer, GetSoundMachinePlayListMessageComposer, GetSoundSettingsComposer, GetTalentTrackLevelMessageComposer, GetTargetedOfferComposer, GetThreadMessageComposer, GetThreadsMessageComposer, GetUnreadForumsCountMessageComposer, GetUserChatlogMessageComposer, GetUserEventCatsMessageComposer, GetUserFlatCatsMessageComposer, GetUserGameAchievementsMessageComposer, GetUserSongDisksMessageComposer, GetUserTagsComposer, GetWardrobeMessageComposer, GetWeeklyGameRewardComposer, GetWeeklyGameRewardWinnersComposer, GetYoutubeDisplayStatusMessageComposer, GiftReceiverNotFoundEvent, GiftWrappingConfigurationEvent, GotMysteryBoxPrizeMessageEvent, GoToFlatMessageComposer, GroupAdminGiveComposer, GroupAdminTakeComposer, GroupBadgePartsComposer, GroupBadgePartsEvent, GroupBuyComposer, GroupBuyDataComposer, GroupBuyDataEvent, GroupConfirmMemberRemoveEvent, GroupConfirmRemoveMemberComposer, GroupDeleteComposer, GroupDetailsChangedMessageEvent, GroupFavoriteComposer, GroupFurniContextMenuInfoMessageEvent, GroupInformationComposer, GroupInformationEvent, GroupJoinComposer, GroupMembersComposer, GroupMembersEvent, GroupMembershipAcceptComposer, GroupMembershipDeclineComposer, GroupMembershipRequestedMessageEvent, GroupPurchasedEvent, GroupRemoveMemberComposer, GroupSaveBadgeComposer, GroupSaveColorsComposer, GroupSaveInformationComposer, GroupSavePreferencesComposer, GroupSettingsComposer, GroupSettingsEvent, GroupUnfavoriteComposer, GuestRoomSearchResultEvent, GuideOnDutyStatusMessageEvent, GuideReportingStatusMessageEvent, GuideSessionAttachedMessageEvent, GuideSessionCreateMessageComposer, GuideSessionDetachedMessageEvent, GuideSessionEndedMessageEvent, GuideSessionErrorMessageEvent, GuideSessionFeedbackMessageComposer, GuideSessionGetRequesterRoomMessageComposer, GuideSessionGuideDecidesMessageComposer, GuideSessionInvitedToGuideRoomMessageEvent, GuideSessionInviteRequesterMessageComposer, GuideSessionIsTypingMessageComposer, GuideSessionMessageMessageComposer, GuideSessionMessageMessageEvent, GuideSessionOnDutyUpdateMessageComposer, GuideSessionPartnerIsTypingMessageEvent, GuideSessionReportMessageComposer, GuideSessionRequesterCancelsMessageComposer, GuideSessionRequesterRoomMessageEvent, GuideSessionResolvedMessageComposer, GuideSessionStartedMessageEvent, GuideTicketCreationResultMessageEvent, GuideTicketResolutionMessageEvent, GuildBaseSearchMessageComposer, GuildEditFailedMessageEvent, GuildForumThreadsEvent, GuildMemberMgmtFailedMessageEvent, GuildMembershipsMessageEvent, HabboBroadcastMessageEvent, HabboClubExtendOfferMessageEvent, HabboClubOffersMessageEvent, HabboGroupBadgesMessageEvent, HabboGroupDeactivatedMessageEvent, HabboGroupJoinFailedMessageEvent, HabboSearchComposer, HabboSearchResultEvent, HarvestPetMessageComposer, HotelClosedAndOpensEvent, HotelClosesAndWillOpenAtEvent, HotelMergeNameChangeEvent, HotelWillCloseInMinutesEvent, IdentityAccountsEvent, IgnoredUsersEvent, IgnoreResultEvent, IgnoreUserComposer, IgnoreUserIdComposer, InClientLinkEvent, IncomingHeader, InfoFeedEnableMessageEvent, InfoRetrieveMessageComposer, InitCameraMessageEvent, InitDiffieHandshakeEvent, InitDiffieHandshakeMessageComposer, InstantMessageErrorEvent, InterstitialMessageEvent, InterstitialShownMessageComposer, IsBadgeRequestFulfilledEvent, IsOfferGiftableMessageEvent, IssueCloseNotificationMessageEvent, IssueDeletedMessageEvent, IssueInfoMessageEvent, IssuePickFailedMessageEvent, IsUserPartOfCompetitionMessageEvent, ItemDataUpdateMessageEvent, JoinedQueueMessageEvent, JoiningQueueFailedMessageEvent, JoinQueueMessageComposer, JukeboxPlayListFullMessageEvent, JukeboxSongDisksMessageEvent, LagWarningReportMessageComposer, LeaveQueueMessageComposer, LeftQueueMessageEvent, LimitedEditionSoldOutEvent, LimitedOfferAppearingNextMessageEvent, LoadGameMessageEvent, LoadGameUrlEvent, LoveLockFurniFinishedEvent, LoveLockFurniFriendConfirmedEvent, LoveLockFurniStartEvent, MaintenanceStatusMessageEvent, MakeOfferMessageComposer, MarkCatalogNewAdditionsPageOpenedComposer, MarketplaceBuyOfferResultEvent, MarketplaceCancelOfferResultEvent, MarketplaceCanMakeOfferResult, MarketplaceConfigurationEvent, MarketplaceItemStatsEvent, MarketplaceMakeOfferResult, MarketPlaceOffersEvent, MarketplaceOwnOffersEvent, MessageErrorEvent, MessengerInitComposer, MessengerInitEvent, MiniMailNewMessageEvent, MiniMailUnreadCountEvent, ModAlertMessageComposer, ModBanMessageComposer, ModerateMessageMessageComposer, ModerateRoomMessageComposer, ModerateThreadMessageComposer, ModeratorActionMessageComposer, ModeratorActionResultMessageEvent, ModeratorCautionEvent, ModeratorInitMessageEvent, ModeratorMessageEvent, ModeratorRoomInfoEvent, ModeratorToolPreferencesEvent, ModeratorUserInfoEvent, ModKickMessageComposer, ModMessageMessageComposer, ModMuteMessageComposer, ModToolPreferencesComposer, ModToolSanctionComposer, ModTradingLockMessageComposer, MoodlightSettingsComposer, MoodlightSettingsSaveComposer, MoodlightTogggleStateComposer, MOTDNotificationEvent, MuteAllInRoomEvent, MyFavouriteRoomsSearchMessageComposer, MyFrequentRoomHistorySearchMessageComposer, MyFriendsRoomsSearchMessageComposer, MyGuildBasesSearchMessageComposer, MyRecommendedRoomsMessageComposer, MyRoomHistorySearchMessageComposer, MyRoomRightsSearchMessageComposer, MyRoomsSearchMessageComposer, MysteryBoxKeysEvent, MysteryBoxWaitingCanceledMessageComposer, NavigatorCategoryListModeComposer, NavigatorCollapsedEvent, NavigatorDeleteSavedSearchComposer, NavigatorHomeRoomEvent, NavigatorInitComposer, NavigatorLiftedEvent, NavigatorMetadataEvent, NavigatorOpenRoomCreatorEvent, NavigatorSearchCloseComposer, NavigatorSearchComposer, NavigatorSearchesEvent, NavigatorSearchEvent, NavigatorSearchOpenComposer, NavigatorSearchSaveComposer, NavigatorSettingsEvent, NavigatorSettingsSaveComposer, NewConsoleMessageEvent, NewFriendRequestEvent, NewUserExperienceGetGiftsComposer, NewUserExperienceGiftOfferMessageEvent, NewUserExperienceNotCompleteEvent, NewUserExperienceScriptProceedComposer, NoobnessLevelMessageEvent, NoOwnedRoomsAlertMessageEvent, NoSuchFlatEvent, NotEnoughBalanceMessageEvent, NotificationDialogMessageEvent, NowPlayingMessageEvent, ObjectsDataUpdateEvent, ObjectsRollingEvent, OfferRewardDeliveredMessageEvent, OfficialSongIdMessageEvent, OneWayDoorStatusMessageEvent, OpenCampaignCalendarDoorAsStaffComposer, OpenCampaignCalendarDoorComposer, OpenMessageComposer, OpenMysteryTrophyMessageComposer, OpenPetPackageMessageComposer, OpenPetPackageRequestedMessageEvent, OpenPetPackageResultMessageEvent, OpenPresentComposer, OpenQuestTrackerMessageComposer, OpenWelcomeGiftComposer, OutgoingHeader, PeerUsersClassificationMessageComposer, PerformanceLogMessageComposer, PerkAllowancesMessageEvent, PetAddedToInventoryEvent, PetBreedingResultEvent, PetExperienceEvent, PetFigureUpdateEvent, PetInfoEvent, PetInventoryEvent, PetLevelNotificationEvent, PetLevelUpdateMessageEvent, PetMountComposer, PetMoveComposer, PetPlaceComposer, PetPlacingErrorEvent, PetReceivedMessageEvent, PetRemoveComposer, PetRemovedFromInventory, PetRespectComposer, PetRespectNoficationEvent, PetScratchFailedMessageEvent, PetSelectedMessageComposer, PetStatusUpdateEvent, PetSupplementComposer, PetSupplementedNotificationEvent, PetTrainingPanelMessageEvent, PhoneCollectionStateMessageEvent, PhotoCompetitionMessageComposer, PickIssuesMessageComposer, PlayListMessageEvent, PlayListSongAddedMessageEvent, PollAnswerComposer, PollContentsEvent, RoomPollResultEvent, PollErrorEvent, PollOfferEvent, PollRejectComposer, PollStartComposer, PongMessageComposer, PopularRoomsSearchMessageComposer, PopularRoomTagsResultEvent, PostMessageMessageComposer, PostMessageMessageEvent, PostQuizAnswersComposer, PostThreadMessageEvent, PresentOpenedMessageEvent, ProductOfferEvent, PromoArticlesMessageEvent, PublishPhotoMessageComposer, PurchaseBasicMembershipExtensionComposer, PurchaseErrorMessageEvent, PurchaseFromCatalogAsGiftComposer, PurchaseFromCatalogComposer, PurchaseNotAllowedMessageEvent, PurchaseOKMessageEvent, PurchasePhotoMessageComposer, PurchaseRoomAdMessageComposer, PurchaseTargetedOfferComposer, PurchaseVipMembershipExtensionComposer, QuestCancelledMessageEvent, QuestCompletedMessageEvent, QuestDailyMessageEvent, QuestionAnsweredEvent, QuestionEvent, QuestionFinishedEvent, QuestMessageEvent, QuestsMessageEvent, QuizDataMessageEvent, QuizResultsMessageEvent, RateFlatMessageComposer, RecycleItemsMessageComposer, RecyclerFinishedMessageEvent, RecyclerStatusMessageEvent, RedeemCommunityGoalPrizeMessageComposer, RedeemItemClothingComposer, RedeemMarketplaceOfferCreditsMessageComposer, RedeemVoucherMessageComposer, RejectQuestMessageComposer, RelationshipStatusInfoEvent, ReleaseIssuesMessageComposer, RemainingMuteEvent, RemoveAllRightsMessageComposer, RemoveFriendComposer, RemoveJukeboxDiskComposer, RemoveOwnRoomRightsRoomMessageComposer, RemovePetSaddleComposer, RemoveWallItemComposer, RenderRoomMessageComposer, RenderRoomThumbnailMessageComposer, RentableSpaceCancelRentMessageComposer, RentableSpaceRentFailedMessageEvent, RentableSpaceRentMessageComposer, RentableSpaceRentOkMessageEvent, RentableSpaceStatusMessageComposer, RentableSpaceStatusMessageEvent, RequestABadgeComposer, RequestAchievementsMessageComposer, RequestBadgesComposer, RequestBotCommandConfigurationComposer, RequestCameraConfigurationComposer, RequestFriendComposer, RequestFurniInventoryWhenNotInRoomComposer, RequestPetInfoComposer, RequestPetsComposer, RequestSpamWallPostItMessageEvent, ResetPhoneNumberStateMessageComposer, ResetResolutionAchievementMessageComposer, RespectReceivedEvent, RestoreClientMessageEvent, RoomAdErrorEvent, RoomAdEventTabAdClickedComposer, RoomAdEventTabViewedComposer, RoomAdPurchaseInfoEvent, RoomAdPurchaseInitiatedComposer, RoomAdSearchMessageComposer, RoomAmbassadorAlertComposer, RoomBannedUsersComposer, RoomBanUserComposer, RoomChatlogEvent, RoomChatSettingsEvent, RoomCompetitionInitMessageComposer, RoomDeleteComposer, RoomDimmerPresetsEvent, RoomDoorbellAcceptedEvent, RoomDoorbellAccessComposer, RoomEnterComposer, RoomEnterErrorEvent, RoomEnterEvent, RoomEntryInfoMessageEvent, RoomEntryTileMessageEvent, RoomEventCancelEvent, RoomEventEvent, RoomFilterSettingsMessageEvent, RoomForwardEvent, RoomGiveRightsComposer, RoomHeightMapEvent, RoomHeightMapUpdateEvent, RoomInviteErrorEvent, RoomInviteEvent, RoomKickUserComposer, RoomMessageNotificationMessageEvent, RoomMuteComposer, RoomMuteUserComposer, RoomNetworkOpenConnectionMessageComposer, RoomOccupiedTilesMessageEvent, RoomPaintEvent, RoomReadyMessageEvent, RoomRightsClearEvent, RoomRightsEvent, RoomRightsOwnerEvent, RoomScoreEvent, RoomSettingsComposer, RoomSettingsDataEvent, RoomSettingsErrorEvent, RoomSettingsSavedEvent, RoomSettingsSaveErrorEvent, RoomSettingsUpdatedEvent, RoomsWhereMyFriendsAreSearchMessageComposer, RoomsWithHighestScoreSearchMessageComposer, RoomTakeRightsComposer, RoomTextSearchMessageComposer, RoomThumbnailUpdateResultEvent, RoomUnbanUserComposer, RoomUnitActionComposer, RoomUnitChatComposer, RoomUnitChatEvent, RoomUnitChatShoutComposer, RoomUnitChatShoutEvent, RoomUnitChatStyleComposer, RoomUnitChatWhisperComposer, RoomUnitChatWhisperEvent, RoomUnitDanceComposer, RoomUnitDanceEvent, RoomUnitDropHandItemComposer, RoomUnitEffectEvent, RoomUnitEvent, RoomUnitExpressionEvent, RoomUnitGiveHandItemComposer, RoomUnitGiveHandItemPetComposer, RoomUnitHandItemEvent, RoomUnitHandItemReceivedEvent, RoomUnitIdleEvent, RoomUnitInfoEvent, RoomUnitLookComposer, RoomUnitNumberEvent, RoomUnitPostureComposer, RoomUnitRemoveEvent, RoomUnitSignComposer, RoomUnitStatusEvent, RoomUnitTypingEvent, RoomUnitTypingStartComposer, RoomUnitTypingStopComposer, RoomUnitWalkComposer, RoomUsersClassificationMessageComposer, RoomUsersWithRightsComposer, RoomVisitsEvent, RoomVisualizationSettingsEvent, SanctionStatusEvent, SaveRoomSettingsComposer, SaveWardrobeOutfitMessageComposer, ScrGetKickbackInfoMessageComposer, ScrSendKickbackInfoMessageEvent, SearchFaqsMessageComposer, SeasonalCalendarDailyOfferMessageEvent, SeasonalQuestsMessageEvent, SecondsUntilMessageEvent, SelectClubGiftComposer, SellablePetPalettesMessageEvent, SendMessageComposer, SendRoomInviteComposer, SetActivatedBadgesComposer, SetClothingChangeDataMessageComposer, SetItemDataMessageComposer, SetObjectDataMessageComposer, SetPhoneNumberVerificationStatusMessageComposer, SetRelationshipStatusComposer, SetRoomSessionTagsMessageComposer, SetTargetedOfferStateComposer, SetYoutubeDisplayPlaylistMessageComposer, ShopTargetedOfferViewedComposer, ShowEnforceRoomCategoryDialogEvent, ShowMysteryBoxWaitMessageEvent, SimpleAlertMessageEvent, SSOTicketMessageComposer, StartCampaignMessageComposer, StartRoomPollEvent, SubmitRoomToCompetitionMessageComposer, TalentLevelUpEvent, TalentTrackComposer, TalentTrackLevelMessageEvent, TalentTrackMessageEvent, TargetedOfferEvent, TargetedOfferNotFoundEvent, ThreadMessagesMessageEvent, ThumbnailStatusMessageEvent, TogglePetBreedingComposer, TogglePetRidingComposer, ToggleStaffPickMessageComposer, TradingAcceptComposer, TradingAcceptEvent, TradingCancelComposer, TradingCloseComposer, TradingCloseEvent, TradingCompletedEvent, TradingConfirmationComposer, TradingConfirmationEvent, TradingListAddItemComposer, TradingListAddItemsComposer, TradingListItemEvent, TradingListItemRemoveComposer, TradingNoSuchItemEvent, TradingNotOpenEvent, TradingOpenComposer, TradingOpenEvent, TradingOpenFailedEvent, TradingOtherNotAllowedEvent, TradingUnacceptComposer, TradingYouAreNotAllowedEvent, TraxSongInfoMessageEvent, TryPhoneNumberMessageComposer, TryPhoneNumberResultMessageEvent, TryVerificationCodeResultMessageEvent, UnblockGroupMemberMessageComposer, UnignoreUserComposer, UniqueIDMessageComposer, UnloadGameMessageEvent, UnreadForumsCountMessageEvent, UnseenItemsEvent, UnseenResetCategoryComposer, UnseenResetItemsComposer, UpdateActionMessageComposer, UpdateConditionMessageComposer, UpdateFloorPropertiesMessageComposer, UpdateForumReadMarkerMessageComposer, UpdateForumSettingsMessageComposer, UpdateHomeRoomMessageComposer, UpdateMessageMessageEvent, UpdateRoomCategoryAndTradeSettingsComposer, UpdateRoomFilterMessageComposer, UpdateRoomThumbnailMessageComposer, UpdateThreadMessageComposer, UpdateThreadMessageEvent, UpdateTriggerMessageComposer, UsePetProductComposer, UserBannedMessageEvent, UserChatlogEvent, UserClassificationMessageEvent, UserCreditsEvent, UserCurrencyComposer, UserCurrencyEvent, UserCurrentBadgesComposer, UserCurrentBadgesEvent, UserEventCatsEvent, UserFigureComposer, UserFlatCatsEvent, UserGameAchievementsMessageEvent, UserInfoEvent, UserMottoComposer, UserNameChangeMessageEvent, UserPermissionsEvent, UserProfileComposer, UserProfileEvent, UserRelationshipsComposer, UserRespectComposer, UserSettingsCameraFollowComposer, UserSettingsEvent, UserSettingsOldChatComposer, UserSettingsRoomInvitesComposer, UserSettingsSoundComposer, UserSongDisksInventoryMessageEvent, UserSubscriptionComposer, UserSubscriptionEvent, UserTagsMessageEvent, UserUnbannedFromRoomEvent, UserWardrobePageEvent, VerifyCodeMessageComposer, VersionCheckMessageComposer, VisitUserComposer, VoteForRoomMessageComposer, VoucherRedeemErrorMessageEvent, VoucherRedeemOkMessageEvent, WardrobeMessageEvent, WeeklyCompetitiveFriendsLeaderboardEvent, WeeklyCompetitiveLeaderboardEvent, WeeklyGameRewardEvent, WeeklyGameRewardWinnersEvent, WelcomeGiftChangeEmailComposer, WelcomeGiftChangeEmailResultEvent, WelcomeGiftStatusEvent, WiredFurniActionEvent, WiredFurniConditionEvent, WiredFurniTriggerEvent, WiredOpenEvent, WiredRewardResultMessageEvent, WiredSaveSuccessEvent, WiredValidationErrorEvent, YouArePlayingGameEvent, YouAreSpectatorMessageEvent, YoutubeControlVideoMessageEvent, YoutubeDisplayPlaylistsEvent, YoutubeDisplayVideoMessageEvent, VotePollCounterMessageComposer } from './messages';

export class NitroMessages implements IMessageConfiguration
{
    private _events: Map<number, Function>;
    private _composers: Map<number, Function>;

    constructor()
    {
        this._events = new Map();
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
        this._events.set(IncomingHeader.CAMERA_SNAPSHOT, CameraSnapshotMessageEvent);

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
        this._events.set(IncomingHeader.ACHIEVEMENTRESOLUTIONCOMPLETED, AchievementResolutionCompletedMessageEvent);
        this._events.set(IncomingHeader.ACHIEVEMENTRESOLUTIONPROGRESS, AchievementResolutionProgressMessageEvent);
        this._events.set(IncomingHeader.ACHIEVEMENTRESOLUTIONS, AchievementResolutionsMessageEvent);
        this._events.set(IncomingHeader.LOAD_GAME_URL, LoadGameUrlEvent);
        this._events.set(IncomingHeader.LOADGAME, LoadGameMessageEvent);
        this._events.set(IncomingHeader.UNLOADGAME, UnloadGameMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_GAME_LIST, GameListMessageEvent);
        this._events.set(IncomingHeader.GAMESTATUSMESSAGE, GameStatusMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_ACHIEVEMENTS, UserGameAchievementsMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_STATUS, Game2AccountGameStatusMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_IN_ARENA_QUEUE, Game2InArenaQueueMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_STOP_COUNTER, Game2StopCounterMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_USER_LEFT_GAME, Game2UserLeftGameMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_DIRECTORY_STATUS, Game2GameDirectoryStatusMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_STARTING_GAME_FAILED, Game2StartingGameFailedMessageEvent);
        this._events.set(IncomingHeader.GAME_CENTER_JOINING_FAILED, Game2JoiningGameFailedMessageEvent);
        this._events.set(IncomingHeader.GAMEACHIEVEMENTS, GameAchievementsMessageEvent);
        this._events.set(IncomingHeader.GAMEINVITE, GameInviteMessageEvent);
        this._events.set(IncomingHeader.JOINEDQUEUEMESSAGE, JoinedQueueMessageEvent);
        this._events.set(IncomingHeader.JOININGQUEUEFAILED, JoiningQueueFailedMessageEvent);
        this._events.set(IncomingHeader.LEFTQUEUE, LeftQueueMessageEvent);
        this._events.set(IncomingHeader.WEEKLY_GAME_REWARD, WeeklyGameRewardEvent);
        this._events.set(IncomingHeader.WEEKLY_GAME_REWARD_WINNERS, WeeklyGameRewardWinnersEvent);
        this._events.set(IncomingHeader.WEEKLY_COMPETITIVE_LEADERBOARD, WeeklyCompetitiveLeaderboardEvent);
        this._events.set(IncomingHeader.WEEKLY_COMPETITIVE_FRIENDS_LEADERBOARD, WeeklyCompetitiveFriendsLeaderboardEvent);
        this._events.set(IncomingHeader.WEEKLY_GAME2_FRIENDS_LEADERBOARD, Game2WeeklyFriendsLeaderboardEvent);
        this._events.set(IncomingHeader.WEEKLY_GAME2_LEADERBOARD, Game2WeeklyLeaderboardEvent);

        // GROUP
        this._events.set(IncomingHeader.GROUP_INFO, GroupInformationEvent);
        this._events.set(IncomingHeader.GROUP_MEMBER_REMOVE_CONFIRM, GroupConfirmMemberRemoveEvent);
        this._events.set(IncomingHeader.GROUP_MEMBERS, GroupMembersEvent);
        this._events.set(IncomingHeader.GROUP_CREATE_OPTIONS, GroupBuyDataEvent);
        this._events.set(IncomingHeader.GROUP_BADGE_PARTS, GroupBadgePartsEvent);
        this._events.set(IncomingHeader.GROUP_SETTINGS, GroupSettingsEvent);
        this._events.set(IncomingHeader.GROUP_PURCHASED, GroupPurchasedEvent);
        this._events.set(IncomingHeader.GROUP_BADGES, HabboGroupBadgesMessageEvent);
        this._events.set(IncomingHeader.GROUP_DEACTIVATE, HabboGroupDeactivatedMessageEvent);
        this._events.set(IncomingHeader.GROUP_MEMBERSHIP_REQUESTED, GroupMembershipRequestedMessageEvent);
        this._events.set(IncomingHeader.GROUP_DETAILS_CHANGED, GroupDetailsChangedMessageEvent);
        this._events.set(IncomingHeader.GROUP_HABBO_JOIN_FAILED, HabboGroupJoinFailedMessageEvent);

        // GROUP FORUMS
        this._events.set(IncomingHeader.GROUP_FORUM_DATA, ForumDataMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_LIST, ForumsListMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_THREADS, GuildForumThreadsEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_POST, PostMessageMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_POST_THREAD, PostThreadMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_THREAD_MESSAGES, ThreadMessagesMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_UNREAD_COUNT, UnreadForumsCountMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_UPDATE_MESSAGE, UpdateMessageMessageEvent);
        this._events.set(IncomingHeader.GROUP_FORUM_UPDATE_THREAD, UpdateThreadMessageEvent);

        // HELP
        this._events.set(IncomingHeader.CFH_DISABLED_NOTIFY, CallForHelpDisabledNotifyMessageEvent);
        this._events.set(IncomingHeader.CFH_PENDING_CALLS_DELETED, CallForHelpPendingCallsDeletedMessageEvent);
        this._events.set(IncomingHeader.CFH_PENDING_CALLS, CallForHelpPendingCallsMessageEvent);
        this._events.set(IncomingHeader.CFH_REPLY, CallForHelpReplyMessageEvent);
        this._events.set(IncomingHeader.CFH_RESULT_MESSAGE, CallForHelpResultMessageEvent);
        this._events.set(IncomingHeader.GUIDE_ON_DUTY_STATUS, GuideOnDutyStatusMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_ATTACHED, GuideSessionAttachedMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_DETACHED, GuideSessionDetachedMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_ENDED, GuideSessionEndedMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_ERROR, GuideSessionErrorMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_INVITED_TO_GUIDE_ROOM, GuideSessionInvitedToGuideRoomMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_MESSAGE, GuideSessionMessageMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_PARTNER_IS_TYPING, GuideSessionPartnerIsTypingMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_REQUESTER_ROOM, GuideSessionRequesterRoomMessageEvent);
        this._events.set(IncomingHeader.GUIDE_SESSION_STARTED, GuideSessionStartedMessageEvent);
        this._events.set(IncomingHeader.GUIDE_TICKET_CREATION_RESULT, GuideTicketCreationResultMessageEvent);
        this._events.set(IncomingHeader.GUIDE_TICKET_RESOLUTION, GuideTicketResolutionMessageEvent);
        this._events.set(IncomingHeader.GUIDE_REPORTING_STATUS, GuideReportingStatusMessageEvent);
        this._events.set(IncomingHeader.HOTEL_MERGE_NAME_CHANGE, HotelMergeNameChangeEvent);
        this._events.set(IncomingHeader.ISSUE_CLOSE_NOTIFICATION, IssueCloseNotificationMessageEvent);
        this._events.set(IncomingHeader.QUIZ_DATA, QuizDataMessageEvent);
        this._events.set(IncomingHeader.QUIZ_RESULTS, QuizResultsMessageEvent);
        this._events.set(IncomingHeader.CHAT_REVIEW_SESSION_DETACHED, ChatReviewSessionDetachedMessageEvent);
        this._events.set(IncomingHeader.CHAT_REVIEW_SESSION_OFFERED_TO_GUIDE, ChatReviewSessionOfferedToGuideMessageEvent);
        this._events.set(IncomingHeader.CHAT_REVIEW_SESSION_RESULTS, ChatReviewSessionResultsMessageEvent);
        this._events.set(IncomingHeader.CHAT_REVIEW_SESSION_STARTED, ChatReviewSessionStartedMessageEvent);
        this._events.set(IncomingHeader.CHAT_REVIEW_SESSION_VOTING_STATUS, ChatReviewSessionVotingStatusMessageEvent);

        // INVENTORY
        this._events.set(IncomingHeader.ACHIEVEMENT_PROGRESSED, AchievementEvent);
        this._events.set(IncomingHeader.ACHIEVEMENT_LIST, AchievementsEvent);
        this._events.set(IncomingHeader.USER_ACHIEVEMENT_SCORE, AchievementsScoreEvent);
        this._events.set(IncomingHeader.USER_EFFECT_ACTIVATE, AvatarEffectActivatedEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST_ADD, AvatarEffectAddedEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST_REMOVE, AvatarEffectExpiredEvent);
        this._events.set(IncomingHeader.USER_EFFECT_LIST, AvatarEffectsEvent);
        this._events.set(IncomingHeader.AVATAR_EFFECT_SELECTED, AvatarEffectSelectedEvent);
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
        this._events.set(IncomingHeader.TRADE_NO_SUCH_ITEM, TradingNoSuchItemEvent);

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
        this._events.set(IncomingHeader.USER_BANNED, UserBannedMessageEvent);
        this._events.set(IncomingHeader.MODERATION_CAUTION, ModeratorCautionEvent);
        this._events.set(IncomingHeader.MODTOOL_ROOM_INFO, ModeratorRoomInfoEvent);
        this._events.set(IncomingHeader.MODTOOL_USER_CHATLOG, UserChatlogEvent);
        this._events.set(IncomingHeader.MODTOOL_ROOM_CHATLOG, RoomChatlogEvent);
        this._events.set(IncomingHeader.MODERATION_USER_INFO, ModeratorUserInfoEvent);
        this._events.set(IncomingHeader.MODERATION_TOOL, ModeratorInitMessageEvent);
        this._events.set(IncomingHeader.MODTOOL_VISITED_ROOMS_USER, RoomVisitsEvent);
        this._events.set(IncomingHeader.CFH_CHATLOG, CfhChatlogEvent);
        this._events.set(IncomingHeader.ISSUE_DELETED, IssueDeletedMessageEvent);
        this._events.set(IncomingHeader.ISSUE_INFO, IssueInfoMessageEvent);
        this._events.set(IncomingHeader.ISSUE_PICK_FAILED, IssuePickFailedMessageEvent);
        this._events.set(IncomingHeader.MODERATOR_ACTION_RESULT, ModeratorActionResultMessageEvent);
        this._events.set(IncomingHeader.MODERATOR_MESSAGE, ModeratorMessageEvent);
        this._events.set(IncomingHeader.MODERATOR_TOOL_PREFERENCES, ModeratorToolPreferencesEvent);

        // MYSTERY BOX
        this._events.set(IncomingHeader.MYSTERY_BOX_KEYS, MysteryBoxKeysEvent);
        this._events.set(IncomingHeader.GOTMYSTERYBOXPRIZEMESSAGE, GotMysteryBoxPrizeMessageEvent);
        this._events.set(IncomingHeader.CANCELMYSTERYBOXWAITMESSAGE, CancelMysteryBoxWaitMessageEvent);
        this._events.set(IncomingHeader.SHOWMYSTERYBOXWAITMESSAGE, ShowMysteryBoxWaitMessageEvent);

        // NAVIGATOR
        this._events.set(IncomingHeader.CAN_CREATE_ROOM, CanCreateRoomEvent);
        this._events.set(IncomingHeader.CAN_CREATE_ROOM_EVENT, CanCreateRoomEventEvent);
        this._events.set(IncomingHeader.CATEGORIES_WITH_VISITOR_COUNT, CategoriesWithVisitorCountEvent);
        this._events.set(IncomingHeader.COMPETITION_ROOMS_DATA, CompetitionRoomsDataMessageEvent);
        this._events.set(IncomingHeader.CONVERTED_ROOM_ID, ConvertedRoomIdEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL, DoorbellMessageEvent);
        this._events.set(IncomingHeader.USER_FAVORITE_ROOM, FavouriteChangedEvent);
        this._events.set(IncomingHeader.USER_FAVORITE_ROOM_COUNT, FavouritesEvent);
        this._events.set(IncomingHeader.ROOM_DOORBELL_REJECTED, FlatAccessDeniedMessageEvent);
        this._events.set(IncomingHeader.ROOM_CREATED, FlatCreatedEvent);
        this._events.set(IncomingHeader.ROOM_INFO, GetGuestRoomResultEvent);
        this._events.set(IncomingHeader.GUEST_ROOM_SEARCH_RESULT, GuestRoomSearchResultEvent);
        this._events.set(IncomingHeader.USER_HOME_ROOM, NavigatorHomeRoomEvent);
        this._events.set(IncomingHeader.ROOM_EVENT_CANCEL, RoomEventCancelEvent);
        this._events.set(IncomingHeader.ROOM_EVENT, RoomEventEvent);
        this._events.set(IncomingHeader.ROOM_INFO_UPDATED, RoomSettingsUpdatedEvent);
        this._events.set(IncomingHeader.THUMBNAIL_UPDATE_RESULT, RoomThumbnailUpdateResultEvent);
        this._events.set(IncomingHeader.NAVIGATOR_EVENT_CATEGORIES, UserEventCatsEvent);
        this._events.set(IncomingHeader.NAVIGATOR_CATEGORIES, UserFlatCatsEvent);

        this._events.set(IncomingHeader.NAVIGATOR_COLLAPSED, NavigatorCollapsedEvent);
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
        this._events.set(IncomingHeader.ACTIVITY_POINT_NOTIFICATION, ActivityPointNotificationMessageEvent);
        this._events.set(IncomingHeader.BOT_ERROR, BotErrorEvent);
        this._events.set(IncomingHeader.PET_LEVEL_NOTIFICATION, PetLevelNotificationEvent);
        this._events.set(IncomingHeader.NOTIFICATION_OFFER_REWARD_DELIVERED, OfferRewardDeliveredMessageEvent);
        this._events.set(IncomingHeader.NOTIFICATION_SIMPLE_ALERT, SimpleAlertMessageEvent);
        this._events.set(IncomingHeader.NOTIFICATION_ELEMENT_POINTER, ElementPointerMessageEvent);

        // PERK
        this._events.set(IncomingHeader.USER_PERKS, PerkAllowancesMessageEvent);

        // PETS
        this._events.set(IncomingHeader.PET_TRAINING_PANEL, PetTrainingPanelMessageEvent);
        this._events.set(IncomingHeader.PET_LEVEL_UPDATE, PetLevelUpdateMessageEvent);
        this._events.set(IncomingHeader.PET_SCRATCH_FAILED, PetScratchFailedMessageEvent);
        this._events.set(IncomingHeader.PET_OPEN_PACKAGE_REQUESTED, OpenPetPackageRequestedMessageEvent);
        this._events.set(IncomingHeader.PET_OPEN_PACKAGE_RESULT, OpenPetPackageResultMessageEvent);
        this._events.set(IncomingHeader.PET_BREEDING_RESULT, PetBreedingResultEvent);

        // POLL
        this._events.set(IncomingHeader.QUESTION, QuestionEvent);
        this._events.set(IncomingHeader.POLL_CONTENTS, PollContentsEvent);
        this._events.set(IncomingHeader.POLL_ERROR, PollErrorEvent);
        this._events.set(IncomingHeader.POLL_OFFER, PollOfferEvent);
        this._events.set(IncomingHeader.POLL_START_ROOM, StartRoomPollEvent);
        this._events.set(IncomingHeader.QUESTION_ANSWERED, QuestionAnsweredEvent);
        this._events.set(IncomingHeader.QUESTION_FINISHED, QuestionFinishedEvent);
        this._events.set(IncomingHeader.POLL_ROOM_RESULT, RoomPollResultEvent);

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
        this._events.set(IncomingHeader.ROOM_DOORBELL_ACCEPTED, RoomDoorbellAcceptedEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_CLEAR, RoomRightsClearEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_OWNER, RoomRightsOwnerEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS, RoomRightsEvent);
        this._events.set(IncomingHeader.BOT_COMMAND_CONFIGURATION, BotCommandConfigurationEvent);
        this._events.set(IncomingHeader.BOT_SKILL_LIST_UPDATE, BotSkillListUpdateEvent);
        this._events.set(IncomingHeader.BOT_FORCE_OPEN_CONTEXT_MENU, BotForceOpenContextMenuEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_CHAT, RoomChatSettingsEvent);
        this._events.set(IncomingHeader.ROOM_INFO_OWNER, RoomEntryInfoMessageEvent);
        this._events.set(IncomingHeader.ROOM_SCORE, RoomScoreEvent);
        this._events.set(IncomingHeader.ROOM_ROLLING, ObjectsRollingEvent);
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
        this._events.set(IncomingHeader.FURNITURE_ITEMDATA, ItemDataUpdateMessageEvent);
        this._events.set(IncomingHeader.ITEM_STACK_HELPER, FurnitureStackHeightEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE, OneWayDoorStatusMessageEvent);
        this._events.set(IncomingHeader.ITEM_DIMMER_SETTINGS, RoomDimmerPresetsEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE_2, DiceValueMessageEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_FINISHED, LoveLockFurniFinishedEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_FRIEND_COMFIRMED, LoveLockFurniFriendConfirmedEvent);
        this._events.set(IncomingHeader.LOVELOCK_FURNI_START, LoveLockFurniStartEvent);
        this._events.set(IncomingHeader.OBJECTS_DATA_UPDATE, ObjectsDataUpdateEvent);
        this._events.set(IncomingHeader.FURNITURE_GROUP_CONTEXT_MENU_INFO, GroupFurniContextMenuInfoMessageEvent);
        this._events.set(IncomingHeader.FURNITURE_POSTIT_STICKY_POLE_OPEN, RequestSpamWallPostItMessageEvent);
        this._events.set(IncomingHeader.ROOM_SPECTATOR, YouAreSpectatorMessageEvent);
        this._events.set(IncomingHeader.CUSTOM_USER_NOTIFICATION, CustomUserNotificationMessageEvent);
        this._events.set(IncomingHeader.ROOM_MESSAGE_NOTIFICATION, RoomMessageNotificationMessageEvent);
        this._events.set(IncomingHeader.ROOM_POPULAR_TAGS_RESULT, PopularRoomTagsResultEvent);

        // ROOM SETTINGS
        this._events.set(IncomingHeader.ROOM_RIGHTS_LIST, FlatControllersEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_LIST_ADD, FlatControllerAddedEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_LIST_REMOVE, FlatControllerRemovedEvent);
        this._events.set(IncomingHeader.ROOM_BAN_LIST, BannedUsersFromRoomEvent);

        this._events.set(IncomingHeader.ROOM_SETTINGS_SAVE_ERROR, RoomSettingsSaveErrorEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS, RoomSettingsDataEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_SAVE, RoomSettingsSavedEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_ERROR, RoomSettingsErrorEvent);
        this._events.set(IncomingHeader.SHOW_ENFORCE_ROOM_CATEGORY, ShowEnforceRoomCategoryDialogEvent);
        this._events.set(IncomingHeader.ROOM_BAN_REMOVE, UserUnbannedFromRoomEvent);

        this._events.set(IncomingHeader.ROOM_MUTED, MuteAllInRoomEvent);
        this._events.set(IncomingHeader.NO_SUCH_FLAT, NoSuchFlatEvent);

        this._events.set(IncomingHeader.FAVORITE_GROUP_UDPATE, FavoriteMembershipUpdateMessageEvent);

        // MAPPING
        this._events.set(IncomingHeader.ROOM_MODEL_DOOR, RoomEntryTileMessageEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP, RoomHeightMapEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP_UPDATE, RoomHeightMapUpdateEvent);
        this._events.set(IncomingHeader.ROOM_MODEL, FloorHeightMapEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_NAME, RoomReadyMessageEvent);
        this._events.set(IncomingHeader.ROOM_PAINT, RoomPaintEvent);
        this._events.set(IncomingHeader.ROOM_THICKNESS, RoomVisualizationSettingsEvent);
        this._events.set(IncomingHeader.ROOM_GET_FILTER_WORDS, RoomFilterSettingsMessageEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_BLOCKED_TILES, RoomOccupiedTilesMessageEvent);
        this._events.set(IncomingHeader.PET_FIGURE_UPDATE, PetFigureUpdateEvent);
        this._events.set(IncomingHeader.PET_INFO, PetInfoEvent);
        this._events.set(IncomingHeader.PET_STATUS, PetStatusUpdateEvent);
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

        // TALENT
        this._events.set(IncomingHeader.HELPER_TALENT_TRACK, TalentTrackMessageEvent);
        this._events.set(IncomingHeader.TALENT_TRACK_LEVEL, TalentTrackLevelMessageEvent);
        this._events.set(IncomingHeader.TALENT_TRACK_LEVEL_UP, TalentLevelUpEvent);

        // USER
        this._events.set(IncomingHeader.IN_CLIENT_LINK, InClientLinkEvent);
        this._events.set(IncomingHeader.USER_IGNORED, IgnoredUsersEvent);
        this._events.set(IncomingHeader.USER_IGNORED_RESULT, IgnoreResultEvent);
        this._events.set(IncomingHeader.USER_RESPECT, RespectReceivedEvent);
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
        this._events.set(IncomingHeader.USER_CLASSIFICATION, UserClassificationMessageEvent);
        this._events.set(IncomingHeader.GET_USER_TAGS, UserTagsMessageEvent);
        this._events.set(IncomingHeader.SCR_SEND_KICKBACK_INFO, ScrSendKickbackInfoMessageEvent);
        this._events.set(IncomingHeader.PET_RESPECTED, PetRespectNoficationEvent);
        this._events.set(IncomingHeader.PET_SUPPLEMENT, PetSupplementedNotificationEvent);
        this._events.set(IncomingHeader.ACCOUNT_SAFETY_LOCK_STATUS_CHANGE, AccountSafetyLockStatusChangeMessageEvent);

        this._events.set(IncomingHeader.GENERIC_ERROR, GenericErrorEvent);
        this._events.set(IncomingHeader.GROUP_LIST, GuildMembershipsMessageEvent);
        this._events.set(IncomingHeader.CATALOG_APPROVE_NAME_RESULT, ApproveNameMessageEvent);
        this._events.set(IncomingHeader.CONNECTION_ERROR, ConnectionErrorEvent);

        // GUILD
        this._events.set(IncomingHeader.GUILD_EDIT_FAILED, GuildEditFailedMessageEvent);
        this._events.set(IncomingHeader.GUILD_MEMBER_MGMT_FAILED, GuildMemberMgmtFailedMessageEvent);
        this._events.set(IncomingHeader.EXTENDED_PROFILE_CHANGED, ExtendedProfileChangedMessageEvent);

        // HANDSHAKE
        this._events.set(IncomingHeader.NOOBNESS_LEVEL, NoobnessLevelMessageEvent);
        this._events.set(IncomingHeader.DISCONNECT_REASON, DisconnectReasonEvent);
        this._events.set(IncomingHeader.HANDSHAKE_INIT_DIFFIE, InitDiffieHandshakeEvent);
        this._events.set(IncomingHeader.HANDSHAKE_COMPLETE_DIFFIE, CompleteDiffieHandshakeEvent);
        this._events.set(IncomingHeader.HANDSHAKE_IDENTITY_ACCOUNT, IdentityAccountsEvent);

        // NUX
        this._events.set(IncomingHeader.NEW_USER_EXPERIENCE_GIFT_OFFER, NewUserExperienceGiftOfferMessageEvent);
        this._events.set(IncomingHeader.NEW_USER_EXPERIENCE_NOT_COMPLETE, NewUserExperienceNotCompleteEvent);

        // RESTORE CLIENT
        this._events.set(IncomingHeader.RESTORE_CLIENT, RestoreClientMessageEvent);

        // FIREWORK
        this._events.set(IncomingHeader.FIREWORK_CHARGE_DATA, FireworkChargeDataEvent);

        // PHONE
        this._events.set(IncomingHeader.PHONE_COLLECTION_STATE, PhoneCollectionStateMessageEvent);
        this._events.set(IncomingHeader.PHONE_TRY_NUMBER_RESULT, TryPhoneNumberResultMessageEvent);
        this._events.set(IncomingHeader.PHONE_TRY_VERIFICATION_CODE_RESULT, TryVerificationCodeResultMessageEvent);

        // WELCOME
        this._events.set(IncomingHeader.WELCOME_GIFT_CHANGE_EMAIL_RESULT, WelcomeGiftChangeEmailResultEvent);
        this._events.set(IncomingHeader.WELCOME_GIFT_STATUS, WelcomeGiftStatusEvent);
        // RENTABLE SPACE
        this._events.set(IncomingHeader.RENTABLE_SPACE_RENT_OK, RentableSpaceRentOkMessageEvent);
        this._events.set(IncomingHeader.RENTABLE_SPACE_STATUS, RentableSpaceStatusMessageEvent);
        this._events.set(IncomingHeader.RENTABLE_SPACE_RENT_FAILED, RentableSpaceRentFailedMessageEvent);
        // RECYCLER
        this._events.set(IncomingHeader.RECYCLER_STATUS, RecyclerStatusMessageEvent);
        this._events.set(IncomingHeader.RECYCLER_FINISHED, RecyclerFinishedMessageEvent);
        // EMAIL
        this._events.set(IncomingHeader.EMAIL_STATUS, EmailStatusResultEvent);
        this._events.set(IncomingHeader.CHANGE_EMAIL_RESULT, ChangeEmailResultEvent);

        // RENTABLE FURNI
        this._events.set(IncomingHeader.RENTABLE_FURNI_RENT_OR_BUYOUT_OFFER, FurniRentOrBuyoutOfferMessageEvent);
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
        this._composers.set(OutgoingHeader.GET_CRAFTABLE_PRODUCTS, GetCraftingRecipeComposer);
        this._composers.set(OutgoingHeader.GET_CRAFTING_RECIPE, GetCraftableProductsComposer);
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

        // GAME
        this._composers.set(OutgoingHeader.ACHIEVEMENT_RESOLUTION_OPEN, GetResolutionAchievementsMessageComposer);
        this._composers.set(OutgoingHeader.ACCEPTGAMEINVITE, AcceptGameInviteMessageComposer);
        this._composers.set(OutgoingHeader.GAMEUNLOADEDMESSAGE, GameUnloadedMessageComposer);
        this._composers.set(OutgoingHeader.GETGAMEACHIEVEMENTSMESSAGE, GetGameAchievementsMessageComposer);
        this._composers.set(OutgoingHeader.GAMES_LIST, GetGameListMessageComposer);
        this._composers.set(OutgoingHeader.GETGAMESTATUSMESSAGE, GetGameStatusMessageComposer);
        this._composers.set(OutgoingHeader.GETUSERGAMEACHIEVEMENTSMESSAGE, GetUserGameAchievementsMessageComposer);
        this._composers.set(OutgoingHeader.JOINQUEUEMESSAGE, JoinQueueMessageComposer);
        this._composers.set(OutgoingHeader.LEAVEQUEUEMESSAGE, LeaveQueueMessageComposer);
        this._composers.set(OutgoingHeader.RESETRESOLUTIONACHIEVEMENTMESSAGE, ResetResolutionAchievementMessageComposer);
        this._composers.set(OutgoingHeader.GAMES_INIT, GetWeeklyGameRewardComposer);
        this._composers.set(OutgoingHeader.GETWEEKLYGAMEREWARDWINNERS, GetWeeklyGameRewardWinnersComposer);
        this._composers.set(OutgoingHeader.GAME2GETACCOUNTGAMESTATUSMESSAGE, Game2GetAccountGameStatusMessageComposer);
        this._composers.set(OutgoingHeader.GAME2CHECKGAMEDIRECTORYSTATUSMESSAGE, Game2CheckGameDirectoryStatusMessageComposer);
        this._composers.set(OutgoingHeader.GAME2EXITGAMEMESSAGE, Game2ExitGameMessageComposer);
        this._composers.set(OutgoingHeader.GAME2GAMECHATMESSAGE, Game2GameChatMessageComposer);
        this._composers.set(OutgoingHeader.GAME2LOADSTAGEREADYMESSAGE, Game2LoadStageReadyMessageComposer);
        this._composers.set(OutgoingHeader.GAME2PLAYAGAINMESSAGE, Game2PlayAgainMessageComposer);
        this._composers.set(OutgoingHeader.GAME2REQUESTFULLSTATUSUPDATEMESSAGE, Game2RequestFullStatusUpdateMessageComposer);
        this._composers.set(OutgoingHeader.GAME2GETWEEKLYFRIENDSLEADERBOARD, Game2GetWeeklyFriendsLeaderboardComposer);
        this._composers.set(OutgoingHeader.GAME2GETWEEKLYLEADERBOARD, Game2GetWeeklyLeaderboardComposer);

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

        // HANDSHAKE
        this._composers.set(OutgoingHeader.CLIENT_PONG, PongMessageComposer);
        this._composers.set(OutgoingHeader.RELEASE_VERSION, ClientHelloMessageComposer);
        this._composers.set(OutgoingHeader.SECURITY_TICKET, SSOTicketMessageComposer);
        this._composers.set(OutgoingHeader.USER_INFO, InfoRetrieveMessageComposer);
        this._composers.set(OutgoingHeader.DISCONNECT, DisconnectMessageComposer);
        this._composers.set(OutgoingHeader.SECURITY_MACHINE, UniqueIDMessageComposer);
        this._composers.set(OutgoingHeader.CLIENT_VARIABLES, VersionCheckMessageComposer);
        this._composers.set(OutgoingHeader.HANDSHAKE_INIT_DIFFIE, InitDiffieHandshakeMessageComposer);
        this._composers.set(OutgoingHeader.HANDSHAKE_COMPLETE_DIFFIE, CompleteDiffieHandshakeMessageComposer);

        // HELP
        this._composers.set(OutgoingHeader.CALL_FOR_HELP_FROM_FORUM_MESSAGE, CallForHelpFromForumMessageMessageComposer);
        this._composers.set(OutgoingHeader.CALL_FOR_HELP_FROM_FORUM_THREAD, CallForHelpFromForumThreadMessageComposer);
        this._composers.set(OutgoingHeader.CALL_FOR_HELP_FROM_IM, CallForHelpFromIMMessageComposer);
        this._composers.set(OutgoingHeader.CALL_FOR_HELP_FROM_PHOTO, CallForHelpFromPhotoMessageComposer);
        this._composers.set(OutgoingHeader.CALL_FOR_HELP_FROM_SELFIE, CallForHelpFromSelfieMessageComposer);
        this._composers.set(OutgoingHeader.CALL_FOR_HELP, CallForHelpMessageComposer);
        this._composers.set(OutgoingHeader.CHAT_REVIEW_GUIDE_DECIDES, ChatReviewGuideDecidesOnOfferMessageComposer);
        this._composers.set(OutgoingHeader.CHAT_REVIEW_GUIDE_DETACHED, ChatReviewGuideDetachedMessageComposer);
        this._composers.set(OutgoingHeader.CHAT_REVIEW_GUIDE_VOTE, ChatReviewGuideVoteMessageComposer);
        this._composers.set(OutgoingHeader.CHAT_REVIEW_SESSION_CREATE, ChatReviewSessionCreateMessageComposer);
        this._composers.set(OutgoingHeader.DELETE_PENDING_CALLS_FOR_HELP, DeletePendingCallsForHelpMessageComposer);
        this._composers.set(OutgoingHeader.GET_CFH_STATUS, GetCfhStatusMessageComposer);
        this._composers.set(OutgoingHeader.GET_FAQ_CATEGORY, GetFaqCategoryMessageComposer);
        this._composers.set(OutgoingHeader.GET_FAQ_TEXT, GetFaqTextMessageComposer);
        this._composers.set(OutgoingHeader.GET_GUIDE_REPORTING_STATUS, GetGuideReportingStatusMessageComposer);
        this._composers.set(OutgoingHeader.GET_PENDING_CALLS_FOR_HELP, GetPendingCallsForHelpMessageComposer);
        this._composers.set(OutgoingHeader.GET_QUIZ_QUESTIONS, GetQuizQuestionsComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_CREATE, GuideSessionCreateMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_FEEDBACK, GuideSessionFeedbackMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_GET_REQUESTER_ROOM, GuideSessionGetRequesterRoomMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_GUIDE_DECIDES, GuideSessionGuideDecidesMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_INVITE_REQUESTER, GuideSessionInviteRequesterMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_IS_TYPING, GuideSessionIsTypingMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_MESSAGE, GuideSessionMessageMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_ON_DUTY_UPDATE, GuideSessionOnDutyUpdateMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_REPORT, GuideSessionReportMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_REQUESTER_CANCELS, GuideSessionRequesterCancelsMessageComposer);
        this._composers.set(OutgoingHeader.GUIDE_SESSION_RESOLVED, GuideSessionResolvedMessageComposer);
        this._composers.set(OutgoingHeader.POST_QUIZ_ANSWERS, PostQuizAnswersComposer);
        this._composers.set(OutgoingHeader.SEARCH_FAQS, SearchFaqsMessageComposer);

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
        this._composers.set(OutgoingHeader.GROUP_UNFAVORITE, GroupUnfavoriteComposer);
        this._composers.set(OutgoingHeader.GROUP_BADGES, GetHabboGroupBadgesMessageComposer);
        this._composers.set(OutgoingHeader.APPROVE_ALL_MEMBERSHIP_REQUESTS, ApproveAllMembershipRequestsMessageComposer);
        this._composers.set(OutgoingHeader.GROUP_UNBLOCK_MEMBER, UnblockGroupMemberMessageComposer);

        // NAVIGATOR
        this._composers.set(OutgoingHeader.ROOM_FAVORITE, AddFavouriteRoomMessageComposer);
        this._composers.set(OutgoingHeader.CAN_CREATE_ROOM, CanCreateRoomMessageComposer);
        this._composers.set(OutgoingHeader.CANCEL_ROOM_EVENT, CancelEventMessageComposer);
        this._composers.set(OutgoingHeader.CONVERT_GLOBAL_ROOM_ID, ConvertGlobalRoomIdMessageComposer);
        this._composers.set(OutgoingHeader.COMPETITION_ROOM_SEARCH, CompetitionRoomsSearchMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_CREATE, CreateFlatMessageComposer);
        this._composers.set(OutgoingHeader.GET_USER_FLAT_CATS, GetUserFlatCatsMessageComposer);
        this._composers.set(OutgoingHeader.GET_USER_EVENT_CATS, GetUserEventCatsMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_FAVORITE_REMOVE, DeleteFavouriteRoomMessageComposer);
        this._composers.set(OutgoingHeader.EDIT_ROOM_EVENT, EditEventMessageComposer);
        this._composers.set(OutgoingHeader.FORWARD_TO_RANDOM_PROMOTED_ROOM, ForwardToARandomPromotedRoomMessageComposer);
        this._composers.set(OutgoingHeader.FORWARD_TO_SOME_ROOM, ForwardToSomeRoomMessageComposer);
        this._composers.set(OutgoingHeader.GET_CATEGORIES_WITH_USER_COUNT, GetCategoriesWithUserCountMessageComposer);
        this._composers.set(OutgoingHeader.GET_GUEST_ROOM, GetGuestRoomMessageComposer);
        this._composers.set(OutgoingHeader.GET_OFFICIAL_ROOMS, GetOfficialRoomsMessageComposer);
        this._composers.set(OutgoingHeader.GET_POPULAR_ROOM_TAGS, GetPopularRoomTagsMessageComposer);
        this._composers.set(OutgoingHeader.GUILD_BASE_SEARCH, GuildBaseSearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_FAVOURITE_ROOMS_SEARCH, MyFavouriteRoomsSearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_FREQUENT_ROOM_HISTORY_SEARCH, MyFrequentRoomHistorySearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_FRIENDS_ROOM_SEARCH, MyFriendsRoomsSearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_GUILD_BASES_SEARCH, MyGuildBasesSearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_RECOMMENDED_ROOMS, MyRecommendedRoomsMessageComposer);
        this._composers.set(OutgoingHeader.MY_ROOM_HISTORY_SEARCH, MyRoomHistorySearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_ROOM_RIGHTS_SEARCH, MyRoomRightsSearchMessageComposer);
        this._composers.set(OutgoingHeader.MY_ROOMS_SEARCH, MyRoomsSearchMessageComposer);
        this._composers.set(OutgoingHeader.POPULAR_ROOMS_SEARCH, PopularRoomsSearchMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_LIKE, RateFlatMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE_OWN, RemoveOwnRoomRightsRoomMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_AD_EVENT_TAB_CLICKED, RoomAdEventTabAdClickedComposer);
        this._composers.set(OutgoingHeader.ROOM_AD_EVENT_TAB_VIEWED, RoomAdEventTabViewedComposer);
        this._composers.set(OutgoingHeader.ROOM_AD_SEARCH, RoomAdSearchMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_TEXT_SEARCH, RoomTextSearchMessageComposer);
        this._composers.set(OutgoingHeader.ROOMS_WHERE_MY_FRIENDS_ARE, RoomsWhereMyFriendsAreSearchMessageComposer);
        this._composers.set(OutgoingHeader.ROOMS_WITH_HIGHEST_SCORE_SEARCH, RoomsWithHighestScoreSearchMessageComposer);
        this._composers.set(OutgoingHeader.SET_ROOM_SESSION_TAGS, SetRoomSessionTagsMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_STAFF_PICK, ToggleStaffPickMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_FILTER_WORDS, GetCustomRoomFilterMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_FILTER_WORDS_MODIFY, UpdateRoomFilterMessageComposer);
        this._composers.set(OutgoingHeader.USER_HOME_ROOM, UpdateHomeRoomMessageComposer);
        this._composers.set(OutgoingHeader.UPDATE_ROOM_THUMBNAIL, UpdateRoomThumbnailMessageComposer);
        // NEW NAVIGATOR
        this._composers.set(OutgoingHeader.NAVIGATOR_INIT, NavigatorInitComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_CLOSE, NavigatorSearchCloseComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH, NavigatorSearchComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_OPEN, NavigatorSearchOpenComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_SAVE, NavigatorSearchSaveComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SETTINGS_SAVE, NavigatorSettingsSaveComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_CATEGORY_LIST_MODE, NavigatorCategoryListModeComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_DELETE_SAVED_SEARCH, NavigatorDeleteSavedSearchComposer);

        // POLL
        this._composers.set(OutgoingHeader.POLL_ANSWER, PollAnswerComposer);
        this._composers.set(OutgoingHeader.POLL_REJECT, PollRejectComposer);
        this._composers.set(OutgoingHeader.POLL_START, PollStartComposer);
        this._composers.set(OutgoingHeader.POLL_VOTE_COUNTER, VotePollCounterMessageComposer);

        // INVENTORY

        // EFFECTS
        this._composers.set(OutgoingHeader.USER_EFFECT_ACTIVATE, AvatarEffectActivatedComposer);
        this._composers.set(OutgoingHeader.USER_EFFECT_ENABLE, AvatarEffectSelectedComposer);

        // BADGES
        this._composers.set(OutgoingHeader.USER_BADGES, RequestBadgesComposer);
        this._composers.set(OutgoingHeader.USER_BADGES_CURRENT_UPDATE, SetActivatedBadgesComposer);
        this._composers.set(OutgoingHeader.GET_BADGE_POINTS_LIMITS, GetBadgePointLimitsComposer);
        this._composers.set(OutgoingHeader.REQUESTABADGE, RequestABadgeComposer);
        this._composers.set(OutgoingHeader.GETISBADGEREQUESTFULFILLED, GetIsBadgeRequestFulfilledComposer);

        // BOTS
        this._composers.set(OutgoingHeader.USER_BOTS, GetBotInventoryComposer);

        // FURNI
        this._composers.set(OutgoingHeader.USER_FURNITURE, FurnitureListComposer);
        this._composers.set(OutgoingHeader.REQUESTFURNIINVENTORYWHENNOTINROOM, RequestFurniInventoryWhenNotInRoomComposer);

        // PETS
        this._composers.set(OutgoingHeader.USER_PETS, RequestPetsComposer);

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

        // UNSEEN
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
        this._composers.set(OutgoingHeader.GET_PET_TRAINING_PANEL, GetPetCommandsComposer);
        this._composers.set(OutgoingHeader.PET_OPEN_PACKAGE, OpenPetPackageMessageComposer);
        this._composers.set(OutgoingHeader.PET_SELECTED, PetSelectedMessageComposer);
        this._composers.set(OutgoingHeader.PETS_BREED, BreedPetsMessageComposer);
        this._composers.set(OutgoingHeader.PET_CANCEL_BREEDING, CancelPetBreedingComposer);
        this._composers.set(OutgoingHeader.PET_CONFIRM_BREEDING, ConfirmPetBreedingComposer);

        // ROOM

        // ACCESS
        this._composers.set(OutgoingHeader.ROOM_ENTER, RoomEnterComposer);
        this._composers.set(OutgoingHeader.ROOM_DOORBELL, RoomDoorbellAccessComposer);
        this._composers.set(OutgoingHeader.GO_TO_FLAT, GoToFlatMessageComposer);
        this._composers.set(OutgoingHeader.CHANGE_QUEUE, ChangeQueueMessageComposer);

        // ACTION
        this._composers.set(OutgoingHeader.ROOM_AMBASSADOR_ALERT, RoomAmbassadorAlertComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_GIVE, RoomBanUserComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_REMOVE, RoomUnbanUserComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_GIVE, RoomGiveRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_KICK, RoomKickUserComposer);
        this._composers.set(OutgoingHeader.ROOM_MUTE_USER, RoomMuteUserComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE, RoomTakeRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_REMOVE_ALL, RemoveAllRightsMessageComposer);

        this._composers.set(OutgoingHeader.ROOM_DELETE, RoomDeleteComposer);

        // DATA
        this._composers.set(OutgoingHeader.ROOM_SETTINGS, RoomSettingsComposer);
        this._composers.set(OutgoingHeader.ROOM_SETTINGS_SAVE, SaveRoomSettingsComposer);
        this._composers.set(OutgoingHeader.ROOM_RIGHTS_LIST, RoomUsersWithRightsComposer);
        this._composers.set(OutgoingHeader.ROOM_BAN_LIST, RoomBannedUsersComposer);
        this._composers.set(OutgoingHeader.ROOM_SETTINGS_UPDATE_ROOM_CATEGORY_AND_TRADE, UpdateRoomCategoryAndTradeSettingsComposer);

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
        this._composers.set(OutgoingHeader.COMPOST_PLANT, CompostPlantMessageComposer);
        this._composers.set(OutgoingHeader.HARVEST_PET, HarvestPetMessageComposer);
        this._composers.set(OutgoingHeader.SET_CLOTHING_CHANGE_DATA, SetClothingChangeDataMessageComposer);

        // FURNITURE
        this._composers.set(OutgoingHeader.FURNITURE_ALIASES, FurnitureAliasesComposer);
        this._composers.set(OutgoingHeader.FURNITURE_GROUP_INFO, FurnitureGroupInfoComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PICKUP, FurniturePickupComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PLACE, FurniturePlaceComposer);
        this._composers.set(OutgoingHeader.ITEM_PAINT, FurniturePlacePaintComposer);
        this._composers.set(OutgoingHeader.FURNITURE_POSTIT_PLACE, FurniturePostItPlaceComposer);
        this._composers.set(OutgoingHeader.FURNITURE_POSTIT_SAVE_STICKY_POLE, AddSpamWallPostItMessageComposer);
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

        // LAYOUT
        this._composers.set(OutgoingHeader.ROOM_MODEL, GetRoomEntryDataMessageComposer);
        this._composers.set(OutgoingHeader.GET_OCCUPIED_TILES, GetOccupiedTilesMessageComposer);
        this._composers.set(OutgoingHeader.GET_ROOM_ENTRY_TILE, GetRoomEntryTileMessageComposer);
        this._composers.set(OutgoingHeader.ROOM_MODEL_SAVE, UpdateFloorPropertiesMessageComposer);

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
        this._composers.set(OutgoingHeader.SCR_GET_KICKBACK_INFO, ScrGetKickbackInfoMessageComposer);

        // USER CLASSIFICATION
        this._composers.set(OutgoingHeader.PEER_USERS_CLASSIFICATION, PeerUsersClassificationMessageComposer);
        this._composers.set(OutgoingHeader.USER_CLASSIFICATION, RoomUsersClassificationMessageComposer);

        // DATA
        this._composers.set(OutgoingHeader.USER_IGNORED, GetIgnoredUsersComposer);
        this._composers.set(OutgoingHeader.USER_IGNORE, IgnoreUserComposer);
        this._composers.set(OutgoingHeader.USER_IGNORE_ID, IgnoreUserIdComposer);
        this._composers.set(OutgoingHeader.USER_UNIGNORE, UnignoreUserComposer);
        this._composers.set(OutgoingHeader.USER_BADGES_CURRENT, UserCurrentBadgesComposer);
        this._composers.set(OutgoingHeader.USER_FIGURE, UserFigureComposer);
        this._composers.set(OutgoingHeader.USER_MOTTO, UserMottoComposer);
        this._composers.set(OutgoingHeader.USER_PROFILE, UserProfileComposer);
        this._composers.set(OutgoingHeader.USER_PROFILE_BY_NAME, GetExtendedProfileByNameMessageComposer);
        this._composers.set(OutgoingHeader.USER_TAGS, GetUserTagsComposer);
        this._composers.set(OutgoingHeader.MESSENGER_RELATIONSHIPS, UserRelationshipsComposer);

        // MANNEQUIN
        this._composers.set(OutgoingHeader.MANNEQUIN_SAVE_NAME, FurnitureMannequinSaveNameComposer);
        this._composers.set(OutgoingHeader.MANNEQUIN_SAVE_LOOK, FurnitureMannequinSaveLookComposer);

        // GIFTS
        this._composers.set(OutgoingHeader.PRESENT_OPEN_PRESENT, OpenPresentComposer);

        // INVENTORY

        // MARKETPLACE
        this._composers.set(OutgoingHeader.MARKETPLACE_CONFIG, GetMarketplaceConfigurationMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_SELL_ITEM, MakeOfferMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_REQUEST_OWN_ITEMS, GetMarketplaceOwnOffersMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_TAKE_BACK_ITEM, CancelMarketplaceOfferMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_REQUEST_OFFERS, GetMarketplaceOffersMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_BUY_OFFER, BuyMarketplaceOfferMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_REDEEM_CREDITS, RedeemMarketplaceOfferCreditsMessageComposer);
        this._composers.set(OutgoingHeader.MARKETPLACE_BUY_TOKENS, BuyMarketplaceTokensMessageComposer);
        this._composers.set(OutgoingHeader.REQUEST_SELL_ITEM, GetMarketplaceCanMakeOfferComposer);
        this._composers.set(OutgoingHeader.REQUEST_MARKETPLACE_ITEM_STATS, GetMarketplaceItemStatsComposer);

        // BOTS
        this._composers.set(OutgoingHeader.USER_BOTS, GetBotInventoryComposer);

        // PETS
        this._composers.set(OutgoingHeader.USER_PETS, RequestPetsComposer);

        // CURRENCY
        this._composers.set(OutgoingHeader.USER_CURRENCY, UserCurrencyComposer);

        // SUBSCRIPTION
        this._composers.set(OutgoingHeader.USER_SUBSCRIPTION, UserSubscriptionComposer);

        // MODERATION
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_ROOM_INFO, GetModeratorRoomInfoMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_CHANGE_ROOM_SETTINGS, ModerateRoomMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_USER_CHATLOG, GetUserChatlogMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_ROOM_CHATLOG, GetRoomChatlogMessageComposer);
        this._composers.set(OutgoingHeader.MOD_TOOL_USER_INFO, GetModeratorUserInfoMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_ALERT, ModAlertMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_BAN, ModBanMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_KICK, ModKickMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_TRADELOCK, ModTradingLockMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_ALERTEVENT, ModMessageMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION_MUTE, ModMuteMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_REQUEST_USER_ROOMS, GetRoomVisitsMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_ROOM_ALERT, ModeratorActionMessageComposer);
        this._composers.set(OutgoingHeader.CLOSE_ISSUE_DEFAULT_ACTION, CloseIssueDefaultActionMessageComposer);
        this._composers.set(OutgoingHeader.CLOSE_ISSUES, CloseIssuesMessageComposer);
        this._composers.set(OutgoingHeader.DEFAULT_SANCTION, DefaultSanctionMessageComposer);
        this._composers.set(OutgoingHeader.GET_CFH_CHATLOG, GetCfhChatlogMessageComposer);
        this._composers.set(OutgoingHeader.MODTOOL_PREFERENCES, ModToolPreferencesComposer);
        this._composers.set(OutgoingHeader.MODTOOL_SANCTION, ModToolSanctionComposer);
        this._composers.set(OutgoingHeader.PICK_ISSUES, PickIssuesMessageComposer);
        this._composers.set(OutgoingHeader.RELEASE_ISSUES, ReleaseIssuesMessageComposer);

        // MYSTERYBOX
        this._composers.set(OutgoingHeader.MYSTERYBOXWAITINGCANCELEDMESSAGE, MysteryBoxWaitingCanceledMessageComposer);
        this._composers.set(OutgoingHeader.MYSTERYBOX_OPEN_TROPHY, OpenMysteryTrophyMessageComposer);

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

        // TALENT
        this._composers.set(OutgoingHeader.HELPER_TALENT_TRACK, TalentTrackComposer);
        this._composers.set(OutgoingHeader.TALENT_TRACK_GET_LEVEL, GetTalentTrackLevelMessageComposer);

        //NUX
        this._composers.set(OutgoingHeader.NEW_USER_EXPERIENCE_GET_GIFTS, NewUserExperienceGetGiftsComposer);
        this._composers.set(OutgoingHeader.NEW_USER_EXPERIENCE_SCRIPT_PROCEED, NewUserExperienceScriptProceedComposer);

        // WELCOME
        this._composers.set(OutgoingHeader.WELCOME_OPEN_GIFT, OpenWelcomeGiftComposer);
        this._composers.set(OutgoingHeader.WELCOME_GIFT_CHANGE_EMAIL, WelcomeGiftChangeEmailComposer);

        // EMAIL
        this._composers.set(OutgoingHeader.EMAIL_GET_STATUS, GetEmailStatusComposer);
        this._composers.set(OutgoingHeader.EMAIL_CHANGE, ChangeEmailComposer);
        // RENTABLE
        this._composers.set(OutgoingHeader.RENTABLE_SPACE_CANCEL_RENT, RentableSpaceCancelRentMessageComposer);
        this._composers.set(OutgoingHeader.RENTABLE_SPACE_RENT, RentableSpaceRentMessageComposer);
        this._composers.set(OutgoingHeader.RENTABLE_SPACE_STATUS, RentableSpaceStatusMessageComposer);
        // RECYCLER
        this._composers.set(OutgoingHeader.RECYCLER_STATUS, GetRecyclerStatusMessageComposer);
        this._composers.set(OutgoingHeader.RECYCLER_ITEMS, RecycleItemsMessageComposer);

        // TRACKING
        this._composers.set(OutgoingHeader.TRACKING_PERFORMANCE_LOG, PerformanceLogMessageComposer);
        this._composers.set(OutgoingHeader.TRACKING_LAG_WARNING_REPORT, LagWarningReportMessageComposer);

        // ROOM DIRECTORY
        this._composers.set(OutgoingHeader.ROOM_DIRECTORY_ROOM_NETWORK_OPEN_CONNECTION, RoomNetworkOpenConnectionMessageComposer);

        // RENTABLE
        this._composers.set(OutgoingHeader.RENTABLE_EXTEND_RENT_OR_BUYOUT_STRIP_ITEM, ExtendRentOrBuyoutStripItemMessageComposer);
        this._composers.set(OutgoingHeader.RENTABLE_EXTEND_RENT_OR_BUYOUT_FURNI, ExtendRentOrBuyoutFurniMessageComposer);
        this._composers.set(OutgoingHeader.RENTABLE_GET_RENT_OR_BUYOUT_OFFER, GetRentOrBuyoutOfferMessageComposer);
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
