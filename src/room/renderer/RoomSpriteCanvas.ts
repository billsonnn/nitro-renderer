import { RenderTexture } from '@pixi/core';
import { Container, DisplayObject } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Matrix, Point, Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { IRoomCanvasMouseListener, IRoomGeometry, IRoomObject, IRoomObjectSprite, IRoomObjectSpriteVisualization, IRoomRenderingCanvas, IRoomSpriteCanvasContainer, IRoomSpriteMouseEvent, MouseEventType, RoomObjectSpriteData, RoomObjectSpriteType, Vector3d } from '../../api';
import { RoomSpriteMouseEvent } from '../../events';
import { Nitro } from '../../nitro/Nitro';
import { GetTicker, NitroContainer, NitroSprite, PixiApplicationProxy } from '../../pixi-proxy';
import { RoomEnterEffect, RoomGeometry, RoomRotatingEffect, RoomShakingEffect } from '../utils';
import { RoomObjectCache, RoomObjectCacheItem } from './cache';
import { ExtendedSprite, ObjectMouseData, SortableSprite } from './utils';

export class RoomSpriteCanvas implements IRoomRenderingCanvas
{
    private _id: number;
    private _container: IRoomSpriteCanvasContainer;

    private _geometry: RoomGeometry;
    private _animationFPS: number;
    private _renderTimestamp: number;
    private _totalTimeRunning: number;
    private _lastFrame: number;

    private _master: Sprite;
    private _display: Container;
    private _mask: Graphics;

    private _sortableSprites: SortableSprite[];
    private _spriteCount: number;
    private _activeSpriteCount: number;
    private _spritePool: ExtendedSprite[];
    private _skipObjectUpdate: boolean;
    private _runningSlow: boolean;

    private _width: number;
    private _height: number;
    private _renderedWidth: number;
    private _renderedHeight: number;
    private _screenOffsetX: number;
    private _screenOffsetY: number;
    private _mouseLocation: Point;
    private _mouseOldX: number;
    private _mouseOldY: number;
    private _mouseCheckCount: number;
    private _mouseSpriteWasHit: boolean;
    private _mouseActiveObjects: Map<string, ObjectMouseData>;
    private _eventCache: Map<string, IRoomSpriteMouseEvent>;
    private _eventId: number;
    private _scale: number;

    private _SafeStr_4507: boolean = false;
    private _rotation: number = 0;
    private _rotationOrigin: Vector3d = null;
    private _rotationRodLength: number = 0;
    private _effectDirection: Vector3d;
    private _effectLocation: Vector3d;
    private _SafeStr_795: number = 0;

    private _restrictsScaling: boolean;
    private _noSpriteVisibilityChecking: boolean;
    private _usesExclusionRectangles: boolean;
    private _usesMask: boolean;
    private _canvasUpdated: boolean;

    private _objectCache: RoomObjectCache;

    private _mouseListener: IRoomCanvasMouseListener;

    constructor(container: IRoomSpriteCanvasContainer, id: number, width: number, height: number, scale: number)
    {
        this._id = id;
        this._container = container;

        this._geometry = new RoomGeometry(scale, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5), new Vector3d(-135, 0.5, 0));
        this._animationFPS = Nitro.instance.getConfiguration<number>('system.fps.animation', 24);
        this._renderTimestamp = 0;
        this._totalTimeRunning = 0;
        this._lastFrame = 0;

        this._master = null;
        this._display = null;
        this._mask = null;

        this._sortableSprites = [];
        this._spriteCount = 0;
        this._activeSpriteCount = 0;
        this._spritePool = [];
        this._skipObjectUpdate = false;
        this._runningSlow = false;

        this._width = 0;
        this._height = 0;
        this._renderedWidth = 0;
        this._renderedHeight = 0;
        this._screenOffsetX = 0;
        this._screenOffsetY = 0;
        this._mouseLocation = new Point;
        this._mouseOldX = 0;
        this._mouseOldY = 0;
        this._mouseCheckCount = 0;
        this._mouseSpriteWasHit = false;
        this._mouseActiveObjects = new Map();
        this._eventCache = new Map();
        this._eventId = 0;
        this._scale = 1;

        this._restrictsScaling = false;
        this._noSpriteVisibilityChecking = false;
        this._usesExclusionRectangles = false;
        this._usesMask = true;
        this._canvasUpdated = false;

        this._objectCache = new RoomObjectCache(this._container.roomObjectVariableAccurateZ);

        this._mouseListener = null;

        this.setupCanvas();
        this.initialize(width, height);
    }

    private setupCanvas(): void
    {
        if(!this._master)
        {
            this._master = new NitroSprite();

            this._master.interactiveChildren = false;
        }

        if(!this._display)
        {
            const display = new NitroContainer();

            this._master.addChild(display);

            this._display = display;
        }
    }

    public dispose(): void
    {
        this.cleanSprites(0, true);

        if(this._geometry)
        {
            this._geometry.dispose();

            this._geometry = null;
        }

        if(this._mask) this._mask = null;

        if(this._objectCache)
        {
            this._objectCache.dispose();

            this._objectCache = null;
        }

        if(this._master)
        {
            while(this._master.children.length)
            {
                const child = this._master.removeChildAt(0);

                child.destroy();
            }

            if(this._master.parent) this._master.parent.removeChild(this._master);

            this._master.destroy();

            this._master = null;
        }

        this._display = null;
        this._sortableSprites = [];

        if(this._mouseActiveObjects)
        {
            this._mouseActiveObjects.clear();

            this._mouseActiveObjects = null;
        }

        if(this._spritePool)
        {
            for(const sprite of this._spritePool)
            {
                this.cleanSprite(sprite, true);
            }

            this._spritePool = [];
        }

        if(this._eventCache)
        {
            this._eventCache.clear();

            this._eventCache = null;
        }

        this._mouseListener = null;
    }

    public initialize(width: number, height: number): void
    {
        width = width < 1 ? 1 : width;
        height = height < 1 ? 1 : height;

        if(this._usesMask)
        {
            if(!this._mask)
            {
                this._mask = new Graphics()
                    .beginFill(0xFF0000)
                    .drawRect(0, 0, width, height)
                    .endFill();

                if(this._master)
                {
                    this._master.addChild(this._mask);

                    if(this._display) this._display.mask = this._mask;
                }
            }
            else
            {
                this._mask
                    .clear()
                    .beginFill(0xFF0000)
                    .drawRect(0, 0, width, height)
                    .endFill();
            }
        }

        if(this._master)
        {
            if(this._master.hitArea)
            {
                const hitArea = (this._master.hitArea as Rectangle);

                hitArea.width = width;
                hitArea.height = height;
            }
            else
            {
                this._master.hitArea = new Rectangle(0, 0, width, height);
            }

            if(this._master.filterArea)
            {
                const filterArea = this._master.filterArea;

                filterArea.width = width;
                filterArea.height = height;
            }
            else
            {
                this._master.filterArea = new Rectangle(0, 0, width, height);
            }
        }

        this._width = width;
        this._height = height;
    }

    public setMask(flag: boolean): void
    {
        if(flag && !this._usesMask)
        {
            this._usesMask = true;

            if(this._mask && (this._mask.parent !== this._master))
            {
                this._master.addChild(this._mask);

                this._display.mask = this._mask;
            }
        }

        else if(!flag && this._usesMask)
        {
            this._usesMask = false;

            if(this._mask && (this._mask.parent === this._master))
            {
                this._master.removeChild(this._mask);

                this._display.mask = null;
            }
        }
    }

    public setScale(scale: number, point: Point = null, offsetPoint: Point = null, override: boolean = false, asDelta: boolean = false): void
    {
        if(!this._master || !this._display) return;

        if(this._restrictsScaling && !override) return;

        if(!point) point = new Point((this._width / 2), (this._height / 2));

        if(!offsetPoint) offsetPoint = point;

        point = this._display.toLocal(point);

        if(asDelta)
        {
            this._scale *= scale;
        }
        else
        {
            this._scale = scale;
        }

        this.screenOffsetX = (offsetPoint.x - (point.x * this._scale));
        this.screenOffsetY = (offsetPoint.y - (point.y * this._scale));
    }

    public render(time: number, update: boolean = false): void
    {
        this._canvasUpdated = false;

        this._totalTimeRunning += GetTicker().deltaTime;

        if(this._totalTimeRunning === this._renderTimestamp) return;

        if(time === -1) time = (this._renderTimestamp + 1);

        if(!this._container || !this._geometry) return;

        if((this._width !== this._renderedWidth) || (this._height !== this._renderedHeight)) update = true;

        if((this._display.x !== this._screenOffsetX) || (this._display.y !== this._screenOffsetY))
        {
            this._display.position.set(this._screenOffsetX, this._screenOffsetY);

            update = true;
        }

        if(this._display.scale.x !== this._scale)
        {
            this._display.scale.set(this._scale);

            update = true;
        }

        this.doMagic();

        const frame = Math.round(this._totalTimeRunning / (60 / this._animationFPS));

        let updateVisuals = false;

        if(frame !== this._lastFrame)
        {
            this._lastFrame = frame;

            updateVisuals = true;
        }

        let spriteCount = 0;

        const objects = this._container.objects;

        if(objects.size)
        {
            for(const object of objects.values())
            {
                if(!object) continue;

                spriteCount = (spriteCount + this.renderObject(object, object.instanceId.toString(), time, update, updateVisuals, spriteCount));
            }
        }

        this._sortableSprites.sort((a, b) => (b.z - a.z));

        if(spriteCount < this._sortableSprites.length) this._sortableSprites.splice(spriteCount);

        let iterator = 0;

        while(iterator < spriteCount)
        {
            const sprite = this._sortableSprites[iterator];

            if(sprite && sprite.sprite) this.renderSprite(iterator, sprite);

            iterator++;
        }

        this.cleanSprites(spriteCount);

        if(update || updateVisuals) this._canvasUpdated = true;

        this._renderTimestamp = this._totalTimeRunning;
        this._renderedWidth = this._width;
        this._renderedHeight = this._height;
    }

    public skipSpriteVisibilityChecking(): void
    {
        this._noSpriteVisibilityChecking = true;

        this.render(-1, true);
    }

    public resumeSpriteVisibilityChecking(): void
    {
        this._noSpriteVisibilityChecking = false;
    }

    public getSortableSpriteList(): RoomObjectSpriteData[]
    {
        return this._objectCache.getSortableSpriteList();
    }

    public getPlaneSortableSprites(): SortableSprite[]
    {
        return this._objectCache.getPlaneSortableSprites();
    }

    public removeFromCache(identifier: string): void
    {
        this._objectCache.removeObjectCache(identifier);
    }

    private renderObject(object: IRoomObject, identifier: string, time: number, update: boolean, updateVisuals: boolean, count: number): number
    {
        if(!object) return 0;

        const visualization = object.visualization as IRoomObjectSpriteVisualization;

        if(!visualization)
        {
            this.removeFromCache(identifier);

            return 0;
        }

        const cache = this.getCacheItem(identifier);
        cache.objectId = object.instanceId;

        const locationCache = cache.location;
        const sortableCache = cache.sprites;

        const vector = locationCache.updateLocation(object, this._geometry);

        if(!vector)
        {
            this.removeFromCache(identifier);

            return 0;
        }

        if(updateVisuals) visualization.update(this._geometry, time, (!sortableCache.isEmpty || update), (this._skipObjectUpdate && this._runningSlow));

        if(locationCache.locationChanged) update = true;

        if(!sortableCache.needsUpdate(visualization.instanceId, visualization.updateSpriteCounter) && !update)
        {
            return sortableCache.spriteCount;
        }

        let x = vector.x;
        let y = vector.y;
        let z = vector.z;

        if(x > 0) z = (z + (x * 1.2E-7));
        else z = (z + (-(x) * 1.2E-7));

        x = (x + Math.trunc(this._width / 2));
        y = (y + Math.trunc(this._height / 2));

        let spriteCount = 0;

        for(const sprite of visualization.sprites.values())
        {
            if(!sprite || !sprite.visible) continue;

            const texture = sprite.texture;
            const baseTexture = texture && texture.baseTexture;

            if(!texture || !baseTexture) continue;

            const spriteX = ((x + sprite.offsetX) + this._screenOffsetX);
            const spriteY = ((y + sprite.offsetY) + this._screenOffsetY);

            if(sprite.flipH)
            {
                const checkX = ((x + (-(texture.width + (-(sprite.offsetX))))) + this._screenOffsetX);

                if(!this.isSpriteVisible(checkX, spriteY, texture.width, texture.height)) continue;
            }

            else if(sprite.flipV)
            {
                const checkY = ((y + (-(texture.height + (-(sprite.offsetY))))) + this._screenOffsetY);

                if(!this.isSpriteVisible(spriteX, checkY, texture.width, texture.height)) continue;
            }

            else
            {
                if(!this.isSpriteVisible(spriteX, spriteY, texture.width, texture.height)) continue;
            }

            let sortableSprite = sortableCache.getSprite(spriteCount);

            if(!sortableSprite)
            {
                sortableSprite = new SortableSprite();

                sortableCache.addSprite(sortableSprite);

                this._sortableSprites.push(sortableSprite);

                sortableSprite.name = identifier;
            }

            sortableSprite.sprite = sprite;

            if((sprite.spriteType === RoomObjectSpriteType.AVATAR) || (sprite.spriteType === RoomObjectSpriteType.AVATAR_OWN))
            {
                sortableSprite.sprite.libraryAssetName = 'avatar_' + object.id;
            }

            sortableSprite.x = (spriteX - this._screenOffsetX);
            sortableSprite.y = (spriteY - this._screenOffsetY);
            sortableSprite.z = ((z + sprite.relativeDepth) + (3.7E-11 * count));

            spriteCount++;
            count++;
        }

        sortableCache.setSpriteCount(spriteCount);

        this._canvasUpdated = true;

        return spriteCount;
    }

    private getExtendedSprite(index: number): ExtendedSprite
    {
        if((index < 0) || (index >= this._spriteCount)) return null;

        const sprite = (this._display.getChildAt(index) as ExtendedSprite);

        if(!sprite) return null;

        return sprite;
    }

    protected getExtendedSpriteIdentifier(sprite: ExtendedSprite): string
    {
        if(!sprite) return '';

        return sprite.name;
    }

    private renderSprite(index: number, sprite: SortableSprite): boolean
    {
        if(index >= this._spriteCount)
        {
            this.createAndAddSprite(sprite);

            return true;
        }

        if(!sprite) return false;

        const objectSprite = sprite.sprite;
        const extendedSprite = this.getExtendedSprite(index);

        if(!objectSprite || !extendedSprite) return false;

        if(extendedSprite.varyingDepth !== objectSprite.varyingDepth)
        {
            if(extendedSprite.varyingDepth && !objectSprite.varyingDepth)
            {
                this._display.removeChildAt(index);

                this._spritePool.push(extendedSprite);

                return this.renderSprite(index, sprite);
            }

            this.createAndAddSprite(sprite, index);

            return true;
        }

        if(extendedSprite.needsUpdate(objectSprite.id, objectSprite.updateCounter) || RoomEnterEffect.isVisualizationOn())
        {
            extendedSprite.tag = objectSprite.tag;
            extendedSprite.alphaTolerance = objectSprite.alphaTolerance;
            extendedSprite.name = sprite.name;
            extendedSprite.varyingDepth = objectSprite.varyingDepth;
            extendedSprite.clickHandling = objectSprite.clickHandling;
            extendedSprite.filters = objectSprite.filters;

            const alpha = (objectSprite.alpha / 255);

            if(extendedSprite.alpha !== alpha) extendedSprite.alpha = alpha;

            if(extendedSprite.tint !== objectSprite.color) extendedSprite.tint = objectSprite.color;

            if(extendedSprite.blendMode !== objectSprite.blendMode) extendedSprite.blendMode = objectSprite.blendMode;

            if(extendedSprite.texture !== objectSprite.texture) extendedSprite.setTexture(objectSprite.texture);

            if(objectSprite.updateContainer)
            {
                const length = extendedSprite.children.length;

                if(length === 1) extendedSprite.removeChildAt(0);

                extendedSprite.addChild(objectSprite.container);

                objectSprite.updateContainer = false;
            }

            if(objectSprite.flipH)
            {
                if(extendedSprite.scale.x !== -1) extendedSprite.scale.x = -1;
            }
            else
            {
                if(extendedSprite.scale.x !== 1) extendedSprite.scale.x = 1;
            }

            if(objectSprite.flipV)
            {
                if(extendedSprite.scale.y !== -1) extendedSprite.scale.y = -1;
            }
            else
            {
                if(extendedSprite.scale.y !== 1) extendedSprite.scale.y = 1;
            }

            this.updateEnterRoomEffect(extendedSprite, objectSprite);
        }

        if(extendedSprite.x !== sprite.x) extendedSprite.x = sprite.x;
        if(extendedSprite.y !== sprite.y) extendedSprite.y = sprite.y;

        extendedSprite.offsetX = objectSprite.offsetX;
        extendedSprite.offsetY = objectSprite.offsetY;

        return true;
    }

    private createAndAddSprite(sortableSprite: SortableSprite, index: number = -1): void
    {
        const sprite = sortableSprite.sprite;

        if(!sprite) return;

        let extendedSprite: ExtendedSprite = null;

        if(this._spritePool.length > 0) extendedSprite = this._spritePool.pop();

        if(!extendedSprite) extendedSprite = new ExtendedSprite();

        if(extendedSprite.children.length) extendedSprite.removeChildren();

        extendedSprite.tag = sprite.tag;
        extendedSprite.alphaTolerance = sprite.alphaTolerance;
        extendedSprite.alpha = (sprite.alpha / 255);
        extendedSprite.tint = sprite.color;
        extendedSprite.x = sortableSprite.x;
        extendedSprite.y = sortableSprite.y;
        extendedSprite.offsetX = sprite.offsetX;
        extendedSprite.offsetY = sprite.offsetY;
        extendedSprite.name = sprite.name;
        extendedSprite.varyingDepth = sprite.varyingDepth;
        extendedSprite.clickHandling = sprite.clickHandling;
        extendedSprite.blendMode = sprite.blendMode;
        extendedSprite.filters = sprite.filters;

        extendedSprite.setTexture(sprite.texture);

        if(sprite.updateContainer)
        {
            extendedSprite.addChild(sprite.container);

            sprite.updateContainer = false;
        }

        if(sprite.flipH) extendedSprite.scale.x = -1;

        if(sprite.flipV) extendedSprite.scale.y = -1;

        this.updateEnterRoomEffect(extendedSprite, sprite);

        if((index < 0) || (index >= this._spriteCount))
        {
            this._display.addChild(extendedSprite);

            this._spriteCount++;
        }
        else
        {
            this._display.addChildAt(extendedSprite, index);
        }

        this._activeSpriteCount++;
    }

    private cleanSprites(spriteCount: number, _arg_2: boolean = false): void
    {
        if(!this._display) return;

        if(spriteCount < 0) spriteCount = 0;

        if((spriteCount < this._activeSpriteCount) || !this._activeSpriteCount)
        {
            let iterator = (this._spriteCount - 1);

            while(iterator >= spriteCount)
            {
                this.cleanSprite(this.getExtendedSprite(iterator), _arg_2);

                iterator--;
            }
        }

        this._activeSpriteCount = spriteCount;
    }

    private updateEnterRoomEffect(sprite: ExtendedSprite, _arg_2: IRoomObjectSprite): void
    {
        if(!RoomEnterEffect.isVisualizationOn() || !_arg_2) return;

        switch(_arg_2.spriteType)
        {
            case RoomObjectSpriteType.AVATAR_OWN:
                return;
            case RoomObjectSpriteType.ROOM_PLANE:
                sprite.alpha = RoomEnterEffect.getDelta(0.9);
                return;
            case RoomObjectSpriteType.AVATAR:
                sprite.alpha = RoomEnterEffect.getDelta(0.5);
                return;
            default:
                sprite.alpha = RoomEnterEffect.getDelta(0.1);
        }
    }

    private cleanSprite(sprite: ExtendedSprite, _arg_2: boolean): void
    {
        if(!sprite) return;

        if(!_arg_2)
        {
            sprite.setTexture(null);
        }
        else
        {
            if(sprite.parent) sprite.parent.removeChild(sprite);

            sprite.destroy({
                children: true
            });
        }
    }

    public update(): void
    {
        if(!this._mouseCheckCount)
        {
            //this.checkMouseHits(this._mouseLocation.x, this._mouseLocation.y, MouseEventType.MOUSE_MOVE);
        }

        this._mouseCheckCount = 0;

        this._eventId++;
    }

    public setMouseListener(listener: IRoomCanvasMouseListener): void
    {
        this._mouseListener = listener;
    }

    private getCacheItem(id: string): RoomObjectCacheItem
    {
        return this._objectCache.getObjectCache(id);
    }

    private isSpriteVisible(x: number, y: number, width: number, height: number): boolean
    {
        if(this._noSpriteVisibilityChecking) return true;

        x = (((x - this._screenOffsetX) * this._scale) + this._screenOffsetX);
        y = (((y - this._screenOffsetY) * this._scale) + this._screenOffsetY);
        width = (width * this._scale);
        height = (height * this._scale);

        if(((x < this._width) && ((x + width) >= 0)) && ((y < this._height) && ((y + height) >= 0)))
        {
            if(!this._usesExclusionRectangles) return true;
        }

        return false;
    }

    public handleMouseEvent(x: number, y: number, type: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, buttonDown: boolean): boolean
    {
        x = (x - this._screenOffsetX);
        y = (y - this._screenOffsetY);

        this._mouseLocation.x = (x / this._scale);
        this._mouseLocation.y = (y / this._scale);

        if((this._mouseCheckCount > 0) && (type == MouseEventType.MOUSE_MOVE)) return this._mouseSpriteWasHit;

        this._mouseSpriteWasHit = this.checkMouseHits(Math.trunc(x / this._scale), Math.trunc(y / this._scale), type, altKey, ctrlKey, shiftKey, buttonDown);

        this._mouseCheckCount++;

        return this._mouseSpriteWasHit;
    }

    private checkMouseHits(x: number, y: number, type: string, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false, buttonDown: boolean = false): boolean
    {
        const checkedSprites: string[] = [];

        let didHitSprite = false;
        let mouseEvent: IRoomSpriteMouseEvent = null;
        let spriteId = (this._activeSpriteCount - 1);

        while(spriteId >= 0)
        {
            const extendedSprite = this.getExtendedSprite(spriteId);

            if(extendedSprite && extendedSprite.containsPoint(new Point((x - extendedSprite.x), (y - extendedSprite.y))))
            {
                if(extendedSprite.clickHandling && ((type === MouseEventType.MOUSE_CLICK) || (type === MouseEventType.DOUBLE_CLICK)))
                {
                    //
                }
                else
                {
                    const identifier = this.getExtendedSpriteIdentifier(extendedSprite);

                    if(checkedSprites.indexOf(identifier) === -1)
                    {
                        const tag = extendedSprite.tag;

                        let mouseData = this._mouseActiveObjects.get(identifier);

                        if(mouseData)
                        {
                            if(mouseData.spriteTag !== tag)
                            {
                                mouseEvent = this.createMouseEvent(0, 0, 0, 0, MouseEventType.ROLL_OUT, mouseData.spriteTag, altKey, ctrlKey, shiftKey, buttonDown);

                                this.bufferMouseEvent(mouseEvent, identifier);
                            }
                        }

                        if((type === MouseEventType.MOUSE_MOVE) && (!mouseData || (mouseData.spriteTag !== tag)))
                        {
                            mouseEvent = this.createMouseEvent(x, y, (x - extendedSprite.x), (y - extendedSprite.y), MouseEventType.ROLL_OVER, tag, altKey, ctrlKey, shiftKey, buttonDown);
                        }
                        else
                        {
                            mouseEvent = this.createMouseEvent(x, y, (x - extendedSprite.x), (y - extendedSprite.y), type, tag, altKey, ctrlKey, shiftKey, buttonDown);

                            mouseEvent.spriteOffsetX = extendedSprite.offsetX;
                            mouseEvent.spriteOffsetY = extendedSprite.offsetY;
                        }

                        if(!mouseData)
                        {
                            mouseData = new ObjectMouseData();

                            mouseData.objectId = identifier;
                            this._mouseActiveObjects.set(identifier, mouseData);
                        }

                        mouseData.spriteTag = tag;

                        if(((type !== MouseEventType.MOUSE_MOVE) || (x !== this._mouseOldX)) || (y !== this._mouseOldY))
                        {
                            this.bufferMouseEvent(mouseEvent, identifier);
                        }

                        checkedSprites.push(identifier);
                    }

                    didHitSprite = true;
                }
            }

            spriteId--;
        }

        const keys: string[] = [];

        for(const key of this._mouseActiveObjects.keys()) key && keys.push(key);

        let index = 0;

        while(index < keys.length)
        {
            const key = keys[index];

            if(checkedSprites.indexOf(key) >= 0) keys[index] = null;

            index++;
        }

        index = 0;

        while(index < keys.length)
        {
            const key = keys[index];

            if(key !== null)
            {
                const existing = this._mouseActiveObjects.get(key);

                if(existing) this._mouseActiveObjects.delete(key);

                const mouseEvent = this.createMouseEvent(0, 0, 0, 0, MouseEventType.ROLL_OUT, existing.spriteTag, altKey, ctrlKey, shiftKey, buttonDown);

                this.bufferMouseEvent(mouseEvent, key);
            }

            index++;
        }

        this.processMouseEvents();
        this._mouseOldX = x;
        this._mouseOldY = y;

        return didHitSprite;
    }

    protected createMouseEvent(x: number, y: number, localX: number, localY: number, type: string, tag: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, buttonDown: boolean): IRoomSpriteMouseEvent
    {
        const screenX: number = (x - (this._width / 2));
        const screenY: number = (y - (this._height / 2));
        const canvasName = `canvas_${this._id}`;

        return new RoomSpriteMouseEvent(type, ((canvasName + '_') + this._eventId), canvasName, tag, screenX, screenY, localX, localY, ctrlKey, altKey, shiftKey, buttonDown);
    }

    protected bufferMouseEvent(k: IRoomSpriteMouseEvent, _arg_2: string): void
    {
        if(!k || !this._eventCache) return;

        this._eventCache.delete(_arg_2);
        this._eventCache.set(_arg_2, k);
    }

    protected processMouseEvents(): void
    {
        if(!this._container || !this._eventCache) return;

        for(const [key, event] of this._eventCache.entries())
        {
            if(!this._eventCache) return;

            if(!event) continue;

            const roomObject = this._container.getRoomObject(parseInt(key));

            if(!roomObject) continue;

            if(this._mouseListener)
            {
                this._mouseListener.processRoomCanvasMouseEvent(event, roomObject, this._geometry);
            }
            else
            {
                const logic = roomObject.mouseHandler;

                if(logic)
                {
                    logic.mouseEvent(event, this._geometry);
                }
            }
        }

        if(this._eventCache) this._eventCache.clear();
    }

    public getDisplayAsTexture(): RenderTexture
    {
        this._noSpriteVisibilityChecking = true;
        const k = this._scale;
        const _local_2 = this._screenOffsetX;
        const _local_3 = this._screenOffsetY;
        this.setScale(1, null, null, true);
        this._screenOffsetX = 0;
        this._screenOffsetY = 0;
        this.render(-1, true);

        this._display.mask = null;

        const bounds = this._display.getBounds();

        const renderTexture = RenderTexture.create({
            width: this._display.width,
            height: this._display.height
        });

        PixiApplicationProxy.instance.renderer.render(this._display, {
            renderTexture,
            clear: true,
            transform: new Matrix(1, 0, 0, 1, -(bounds.x), -(bounds.y))
        });

        this._display.mask = this._mask;

        this._noSpriteVisibilityChecking = false;
        this.setScale(k, null, null, true);
        this._screenOffsetX = _local_2;
        this._screenOffsetY = _local_3;

        return renderTexture;
    }

    private doMagic(): void
    {
        const geometry = (this.geometry as RoomGeometry);

        if(this._rotation !== 0)
        {
            let direction = this._effectDirection;

            geometry.direction = new Vector3d((direction.x + this._rotation), direction.y, direction.z);

            direction = (geometry.direction as Vector3d);

            geometry.setDepthVector(new Vector3d(direction.x, direction.y, 5));

            const location = new Vector3d();

            location.assign(this._rotationOrigin);

            location.x = (location.x + ((this._rotationRodLength * Math.cos((((direction.x + 180) / 180) * 3.14159265358979))) * Math.cos(((direction.y / 180) * 3.14159265358979))));
            location.y = (location.y + ((this._rotationRodLength * Math.sin((((direction.x + 180) / 180) * 3.14159265358979))) * Math.cos(((direction.y / 180) * 3.14159265358979))));
            location.z = (location.z + (this._rotationRodLength * Math.sin(((direction.y / 180) * 3.14159265358979))));

            geometry.location = location;

            this._effectLocation = new Vector3d();
            this._effectLocation.assign(location);
            this._effectDirection = new Vector3d();
            this._effectDirection.assign(geometry.direction);
        }

        if(RoomShakingEffect.isVisualizationOn() && !this._SafeStr_4507)
        {
            this.changeShaking();
        }
        else
        {
            if(!RoomShakingEffect.isVisualizationOn() && this._SafeStr_4507) this.changeShaking();
        }

        if(RoomRotatingEffect.isVisualizationOn()) this.changeRotation();

        if(this._SafeStr_4507)
        {
            this._SafeStr_795++;

            const _local_4 = this._effectDirection;
            const _local_1 = Vector3d.sum(_local_4, new Vector3d((Math.sin((((this._SafeStr_795 * 5) / 180) * 3.14159265358979)) * 2), (Math.sin(((this._SafeStr_795 / 180) * 3.14159265358979)) * 5), (Math.sin((((this._SafeStr_795 * 10) / 180) * 3.14159265358979)) * 2)));

            geometry.direction = _local_1;
        }
        else
        {
            this._SafeStr_795 = 0;

            geometry.direction = this._effectDirection;
        }
    }

    private changeShaking(): void
    {
        this._SafeStr_4507 = !this._SafeStr_4507;

        if(this._SafeStr_4507)
        {
            const direction = this.geometry.direction;

            this._effectDirection = new Vector3d(direction.x, direction.y, direction.z);
        }
    }

    private changeRotation(): void
    {
        if(this._SafeStr_4507) return;

        const geometry = (this.geometry as RoomGeometry);

        if(!geometry) return;

        if(this._rotation === 0)
        {
            const location = geometry.location;
            const directionAxis = geometry.directionAxis;

            this._effectLocation = new Vector3d();
            this._effectLocation.assign(location);
            this._effectDirection = new Vector3d();
            this._effectDirection.assign(geometry.direction);

            const intersection = RoomGeometry.getIntersectionVector(location, directionAxis, new Vector3d(0, 0, 0), new Vector3d(0, 0, 1));

            if(intersection !== null)
            {
                this._rotationOrigin = new Vector3d(intersection.x, intersection.y, intersection.z);
                this._rotationRodLength = Vector3d.dif(intersection, location).length;
                this._rotation = 1;
            }

            return;
        }

        this._rotation = 0;

        geometry.location = this._effectLocation;
        geometry.direction = this._effectDirection;
        geometry.setDepthVector(new Vector3d(this._effectDirection.x, this._effectDirection.y, 5));
    }

    public moveLeft(): void
    {
        if(this._rotation !== 0)
        {
            if(this._rotation === 1)
            {
                this._rotation = -1;
            }
            else
            {
                this._rotation = (this._rotation - 1);
            }

            return;
        }

        const geometry = (this.geometry as RoomGeometry);
        const direction = (((geometry.direction.x - 90) / 180) * 3.14159265358979);

        geometry.location = Vector3d.sum(geometry.location, new Vector3d((Math.cos(direction) * Math.sqrt(2)), (Math.sin(direction) * Math.sqrt(2))));
    }

    public moveRight(): void
    {
        if(this._rotation !== 0)
        {
            if(this._rotation === -1)
            {
                this._rotation = 1;
            }
            else
            {
                this._rotation = (this._rotation + 1);
            }

            return;
        }

        const geometry = (this.geometry as RoomGeometry);
        const direction = (((geometry.direction.x + 90) / 180) * 3.14159265358979);

        geometry.location = Vector3d.sum(geometry.location, new Vector3d((Math.cos(direction) * Math.sqrt(2)), (Math.sin(direction) * Math.sqrt(2))));
    }

    public moveUp(): void
    {
        if(this._rotation !== 0) return;

        const geometry = (this.geometry as RoomGeometry);
        const direction = ((geometry.direction.x / 180) * 3.14159265358979);

        geometry.location = Vector3d.sum(geometry.location, new Vector3d((Math.cos(direction) * Math.sqrt(2)), (Math.sin(direction) * Math.sqrt(2))));
    }

    public moveDown(): void
    {
        if(this._rotation !== 0) return;

        const geometry = (this.geometry as RoomGeometry);
        const direction = (((geometry.direction.x + 180) / 180) * 3.14159265358979);

        geometry.location = Vector3d.sum(geometry.location, new Vector3d((Math.cos(direction) * Math.sqrt(2)), (Math.sin(direction) * Math.sqrt(2))));
    }

    public get id(): number
    {
        return this._id;
    }

    public get geometry(): IRoomGeometry
    {
        return this._geometry;
    }

    public get master(): DisplayObject
    {
        return this._master;
    }

    public get display(): DisplayObject
    {
        return this._display;
    }

    public get screenOffsetX(): number
    {
        return this._screenOffsetX;
    }

    public set screenOffsetX(x: number)
    {
        x = Math.trunc(x);

        this._mouseLocation.x = (this._mouseLocation.x - (x - this._screenOffsetX));
        this._screenOffsetX = x;
    }

    public get screenOffsetY(): number
    {
        return this._screenOffsetY;
    }

    public set screenOffsetY(y: number)
    {
        y = Math.trunc(y);

        this._mouseLocation.y = (this._mouseLocation.y - (y - this._screenOffsetY));
        this._screenOffsetY = y;
    }

    public get scale(): number
    {
        return this._scale;
    }

    public get width(): number
    {
        return (this._width * this._scale);
    }

    public get height(): number
    {
        return (this._height * this._scale);
    }

    public get restrictsScaling(): boolean
    {
        return this._restrictsScaling;
    }

    public set restrictsScaling(flag: boolean)
    {
        this._restrictsScaling = flag;
    }

    public get canvasUpdated(): boolean
    {
        return this._canvasUpdated;
    }

    public set canvasUpdated(flag: boolean)
    {
        this._canvasUpdated = flag;
    }
}
