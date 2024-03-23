import { Container, ExtractImageOptions, ExtractOptions, ExtractSystem, GenerateTextureOptions, GetPixelsOutput, ICanvas, Matrix, RenderTexture, Renderer, Sprite, Texture } from 'pixi.js';
import { GetRenderer } from './GetRenderer';

export class TextureUtils
{
    public static generateTexture(options: GenerateTextureOptions | Container): Texture
    {
        return this.getRenderer().textureGenerator.generateTexture(options);
    }

    public static generateTextureFromImage(image: HTMLImageElement): Texture
    {
        return Texture.from(image);
    }

    public static async generateImage(options: ExtractImageOptions | Container | Texture): Promise<HTMLImageElement>
    {
        return this.getExtractor().image(options);
    }

    public static async generateImageUrl(options: ExtractImageOptions | Container | Texture): Promise<string>
    {
        return this.getExtractor().base64(options);
    }

    public static generateCanvas(options: ExtractOptions | Container | Texture): ICanvas
    {
        return this.getExtractor().canvas(options);
    }

    public static clearRenderTexture(texture: Texture): Texture
    {
        return this.writeToTexture(new Sprite(Texture.EMPTY), texture);
    }

    public static createRenderTexture(width: number, height: number): Texture
    {
        if((width < 0) || (height < 0)) return null;

        return RenderTexture.create({ width, height });
    }

    public static createAndFillRenderTexture(width: number, height: number, color: number = 16777215): Texture
    {
        if((width < 0) || (height < 0)) return null;

        return this.clearAndFillRenderTexture(this.createRenderTexture(width, height), color);
    }

    public static createAndWriteRenderTexture(width: number, height: number, container: Container, transform: Matrix = null): Texture
    {
        if((width < 0) || (height < 0)) return null;

        return this.writeToTexture(container, this.createRenderTexture(width, height), true, transform);
    }

    public static clearAndFillRenderTexture(texture: Texture, color: number = 16777215): Texture
    {
        if(!texture) return null;

        const sprite = new Sprite(Texture.WHITE);

        sprite.tint = color;

        sprite.width = texture.width;
        sprite.height = texture.height;

        return this.writeToTexture(sprite, texture);
    }

    public static writeToTexture(container: Container, target: Texture, clear: boolean = true, transform: Matrix = null): Texture
    {
        if(!container || !target) return null;

        this.getRenderer().render({
            container,
            target,
            clear,
            transform
        });

        return target;
    }

    public static flipTextureHorizontal(texture: Texture): Texture
    {
        if(!texture) return null;

        const matrix = new Matrix();

        matrix.scale(-1, 1);
        matrix.translate(texture.width, 0);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static flipTextureVertical(texture: Texture): Texture
    {
        if(!texture) return null;

        const matrix = new Matrix();

        matrix.scale(1, -1);
        matrix.translate(0, texture.height);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static flipTextureHorizontalAndVertical(texture: Texture): Texture
    {
        if(!texture) return null;

        const matrix = new Matrix();

        matrix.scale(-1, -1);
        matrix.translate(texture.width, texture.height);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static getPixels(options: ExtractOptions | Container | Texture): GetPixelsOutput
    {
        return this.getExtractor().pixels(options);
    }

    public static getRenderer(): Renderer
    {
        return GetRenderer();
    }

    public static getExtractor(): ExtractSystem
    {
        return this.getRenderer().extract;
    }
}
