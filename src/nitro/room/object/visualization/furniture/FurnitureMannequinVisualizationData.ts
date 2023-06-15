import { IAvatarEffectListener, IAvatarImage, IAvatarImageListener, IAvatarRenderManager } from '@/api'
import { AvatarVisualizationData, FurnitureVisualizationData } from '@/nitro'

export class FurnitureMannequinVisualizationData extends FurnitureVisualizationData {
  private _avatarData: AvatarVisualizationData

  constructor() {
    super()

    this._avatarData = new AvatarVisualizationData()
  }

  public set avatarManager(renderer: IAvatarRenderManager) {
    this._avatarData.avatarManager = renderer
  }

  public dispose(): void {
    super.dispose()

    if (this._avatarData) {
      this._avatarData.dispose()

      this._avatarData = null
    }
  }

  public createAvatarImage(figure: string, size: number, gender: string = null, avatarListener: IAvatarImageListener = null, effectListener: IAvatarEffectListener = null): IAvatarImage {
    return this._avatarData.createAvatarImage(figure, size, gender, avatarListener, effectListener)
  }
}
