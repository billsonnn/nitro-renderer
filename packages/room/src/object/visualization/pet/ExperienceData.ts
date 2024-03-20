import { TextureUtils } from '@nitrots/utils';
import { Container, Sprite, Text, TextStyle, Texture } from 'pixi.js';

export class ExperienceData
{
    private _sprite: Sprite;
    private _texture: Texture;
    private _amount: number;
    private _alpha: number;

    constructor(texture: Texture)
    {
        this._sprite = new Sprite(texture);
        this._texture = null;
        this._amount = -1;
        this._alpha = 0;
    }

    public renderBubble(amount: number): Texture
    {
        if(!this._sprite || (this._amount === amount)) return null;

        const container = new Container();

        container.addChild(this._sprite);

        const text = new Text({
            text: ('+' + amount),
            style: new TextStyle({
                fontFamily: 'Arial',
                fontSize: 9,
                fill: 0xFFFFFF,
                align: 'center'
            })
        });

        text.anchor.x = 0.5;

        text.x = (this._sprite.width / 2);
        text.y = 19;

        container.addChild(text);

        if(!this._texture)
        {
            this._texture = TextureUtils.generateTexture(container);
        }
        else
        {
            TextureUtils.writeToTexture(container, this._texture, true);
        }

        return this._texture;
    }

    public get amount(): number
    {
        return this._amount;
    }

    public set amount(amount: number)
    {
        this._amount = amount;
    }

    public get alpha(): number
    {
        return this._alpha;
    }

    public set alpha(alpha: number)
    {
        this._alpha = alpha;
    }
}
