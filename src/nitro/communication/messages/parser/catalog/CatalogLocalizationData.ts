import { IMessageDataWrapper } from '@/api'

export class CatalogLocalizationData {
  constructor(wrapper: IMessageDataWrapper) {
    this._images = []
    this._texts = []

    let totalImages = wrapper.readInt()

    while (totalImages > 0) {
      this._images.push(wrapper.readString())

      totalImages--
    }

    let totalTexts = wrapper.readInt()

    while (totalTexts > 0) {
      this._texts.push(wrapper.readString())

      totalTexts--
    }
  }

  private _images: string[]

  public get images(): string[] {
    return this._images
  }

  private _texts: string[]

  public get texts(): string[] {
    return this._texts
  }
}
