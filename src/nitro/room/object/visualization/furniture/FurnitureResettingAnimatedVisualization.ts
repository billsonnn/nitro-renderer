import { FurnitureAnimatedVisualization } from '@/nitro'

export class FurnitureResettingAnimatedVisualization extends FurnitureAnimatedVisualization {
  protected usesAnimationResetting(): boolean {
    return true
  }
}
