import { RoomObjectVariable, VoteDataType } from '@/api'
import { RoomObjectUpdateMessage } from '@/room'
import { FurnitureMultiStateLogic, ObjectDataUpdateMessage } from '@/nitro'

export class FurnitureVoteMajorityLogic extends FurnitureMultiStateLogic {
  public processUpdateMessage(message: RoomObjectUpdateMessage): void {
    super.processUpdateMessage(message)

    if (!this.object) return

    if (message instanceof ObjectDataUpdateMessage) {
      const data = message.data

      if (data instanceof VoteDataType) this.object.model.setValue(RoomObjectVariable.FURNITURE_VOTE_MAJORITY_RESULT, data.result)
    }
  }
}
