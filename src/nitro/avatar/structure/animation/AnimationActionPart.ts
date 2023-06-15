import { AvatarAnimationFrame } from '@/nitro'

export class AnimationActionPart {
  constructor(data: any) {
    this._frames = []

    if (data.frames && (data.frames.length > 0)) {
      for (const frame of data.frames) {
        if (!frame) continue

        this._frames.push(new AvatarAnimationFrame(frame))

        let repeats = frame.repeats || 0

        if (repeats > 1) while (--repeats > 0) this._frames.push(this._frames[(this._frames.length - 1)])
      }
    }
  }

  private _frames: AvatarAnimationFrame[]

  public get frames(): AvatarAnimationFrame[] {
    return this._frames
  }
}
