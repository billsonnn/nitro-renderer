import { IAnimation, IAnimationLayerData, IAnimationManager, IAssetAnimation } from '@/api'
import { Animation, AvatarStructure } from '@/nitro'

export class AnimationManager implements IAnimationManager {
  constructor() {
    this._animations = new Map()
  }

  private _animations: Map<string, Animation>

  public get animations(): Map<string, IAnimation> {
    return this._animations
  }

  public registerAnimation(structure: AvatarStructure, _arg_2: { [index: string]: IAssetAnimation }): boolean {
    if (!_arg_2) return false

    const animationData = _arg_2[Object.keys(_arg_2)[0]]

    const animation = new Animation(structure, animationData)

    this._animations.set(animationData.name, animation)

    return true
  }

  public getAnimation(animation: string): Animation {
    const existing = this._animations.get(animation)

    if (!existing) return null

    return existing
  }

  public getLayerData(animation: string, frameCount: number, spriteId: string): IAnimationLayerData {
    const existing = this.getAnimation(animation)

    if (!existing) return null

    return existing.getLayerData(frameCount, spriteId)
  }
}
