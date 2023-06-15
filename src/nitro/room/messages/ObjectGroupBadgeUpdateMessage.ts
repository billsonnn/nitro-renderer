import { RoomObjectUpdateMessage } from '@/room'

export class ObjectGroupBadgeUpdateMessage extends RoomObjectUpdateMessage {
  public static BADGE_LOADED: string = 'ROGBUM_BADGE_LOADED'

  constructor(badgeId: string, assetName: string) {
    super(null, null)

    this._badgeId = badgeId
    this._assetName = assetName
  }

  private _badgeId: string

  public get badgeId(): string {
    return this._badgeId
  }

  private _assetName: string

  public get assetName(): string {
    return this._assetName
  }
}
