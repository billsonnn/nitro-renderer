import { AdvancedMap, IAdvancedMap, IMessageDataWrapper, IMessageParser } from '@/api'
import { RelationshipStatusInfo } from '@/nitro'

export class RelationshipStatusInfoMessageParser implements IMessageParser {
  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _relationshipStatusMap: IAdvancedMap<number, RelationshipStatusInfo>

  public get relationshipStatusMap(): IAdvancedMap<number, RelationshipStatusInfo> {
    return this._relationshipStatusMap
  }

  public flush(): boolean {
    this._userId = 0
    this._relationshipStatusMap = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userId = wrapper.readInt()
    this._relationshipStatusMap = new AdvancedMap()

    const relationshipsCount = wrapper.readInt()

    for (let i = 0; i < relationshipsCount; i++) {
      const relationship = new RelationshipStatusInfo(wrapper)

      this._relationshipStatusMap.add(relationship.relationshipStatusType, relationship)
    }

    return true
  }
}
