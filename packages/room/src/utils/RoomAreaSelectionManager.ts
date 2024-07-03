import { IRoomAreaSelectionManager, IRoomEngine, IRoomObject } from '@nitrots/api';
import { GetEventDispatcher, RoomEngineObjectEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent } from '@nitrots/events';
import { ColorMatrixFilter } from 'pixi.js';
import { FurnitureVisualization, RoomVisualization } from '../object';

export class RoomAreaSelectionManager implements IRoomAreaSelectionManager
{
    public static NOT_ACTIVE: number = 0;
    public static NOT_SELECTING_AREA: number = 1;
    public static AWAITING_MOUSE_DOWN: number = 2;
    public static SELECTING: number = 3;
    public static HIGHLIGHT_DARKEN = 'highlight_darken';
    public static HIGHLIGHT_BRIGHTEN = 'highlight_brighten';
    public static HIGHLIGHT_BLUE = 'highlight_blue';

    private static HIGHLIGHT_FILTERS: { [key: string]: ColorMatrixFilter } = {};

    private _roomEngine: IRoomEngine = null;
    private _state: number = RoomAreaSelectionManager.NOT_ACTIVE;
    private _tileXInit: number = 0;
    private _tileYInit: number = 0;
    private _tileXEnd: number = 0;
    private _tileYEnd: number = 0;
    private _highlightRootX: number = 0;
    private _highlightRootY: number = 0;
    private _highlightWidth: number = 0;
    private _highlightHeight: number = 0;
    private _callback: (rootX: number, rootY: number, width: number, height: number) => void;
    private _highlightType: string = RoomAreaSelectionManager.HIGHLIGHT_BRIGHTEN;

    constructor(roomEngine: IRoomEngine)
    {
        this._roomEngine = roomEngine;

        GetEventDispatcher().addEventListener<RoomEngineObjectEvent>(RoomEngineObjectEvent.ADDED, event =>
        {
            if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

            if(event.roomId !== this._roomEngine.activeRoomId) return;

            if(event.category !== 10 && event.category !== 20) return;

            const roomObject = this._roomEngine.getRoomObject(event.roomId, event.objectId, event.category);

            if(roomObject.visualization instanceof FurnitureVisualization) roomObject.visualization.lookThrough = true;
        });

        const brightenFilter = new ColorMatrixFilter();

        brightenFilter.matrix = [
            1.5, 0, 0, 0,
            0, 1.5, 0, 0,
            0, 0, 1.5, 0,
            0, 0, 0, 1,
            0, 0.0784, 0.0784, 0];

        const blueFilter = new ColorMatrixFilter();

        blueFilter.matrix = [
            1.05, 0, 0, 0,
            0, 1.3, 0, 0,
            0, 0, 1.8, 0,
            0, 0, 0, 1,
            0, 0.0314, 0.0784, 0];

        const darkenFilter = new ColorMatrixFilter();

        darkenFilter.matrix = [
            0.55, 0, 0, 0,
            0, 0.55, 0, 0,
            0, 0, 0.55, 0,
            0, 0, 0, 1,
            -0.0392, -0.0392, -0.0392, 0];

        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGHLIGHT_DARKEN] = darkenFilter;
        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGHLIGHT_BRIGHTEN] = brightenFilter;
        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGHLIGHT_BLUE] = blueFilter;
    }

    private getAllFurniture(): IRoomObject[]
    {
        return this._roomEngine.getRoomObjects(this._roomEngine.activeRoomId, 20).concat(this._roomEngine.getRoomObjects(this._roomEngine.activeRoomId, 10));
    }

    public startSelecting(): void
    {
        if(this._state !== RoomAreaSelectionManager.NOT_SELECTING_AREA) return;

        this.clearHighlightSilent();
        this._state = RoomAreaSelectionManager.AWAITING_MOUSE_DOWN;
        this._roomEngine.moveBlocked = true;
    }

    public handleTileMouseEvent(event: RoomObjectTileMouseEvent): void
    {
        let isWaitingForMouseDown = ((this._state === RoomAreaSelectionManager.AWAITING_MOUSE_DOWN) && (event.type == RoomObjectMouseEvent.MOUSE_DOWN));

        if(event.shiftKey && (this._state === RoomAreaSelectionManager.NOT_SELECTING_AREA) && (event.type == RoomObjectMouseEvent.MOUSE_DOWN))
        {
            this.startSelecting();

            isWaitingForMouseDown = true;
        };

        if(isWaitingForMouseDown)
        {
            this._state = RoomAreaSelectionManager.SELECTING;
            this._tileXInit = event.tileXAsInt;
            this._tileYInit = event.tileYAsInt;
            this._tileXEnd = event.tileXAsInt;
            this._tileYEnd = event.tileYAsInt;
            this.setHighlight(this._tileXInit, this._tileYInit, 1, 1);

            return;
        }

        if((this._state === RoomAreaSelectionManager.SELECTING) && (event.type === RoomObjectMouseEvent.MOUSE_MOVE))
        {
            if((event.tileXAsInt !== this._tileXEnd) || (event.tileYAsInt !== this._tileYEnd))
            {
                let rootX: number = 0;
                let rootY: number = 0;
                let width: number = 0;
                let height: number = 0;

                this._tileXEnd = event.tileXAsInt;
                this._tileYEnd = event.tileYAsInt;

                if(this._tileXEnd > this._tileXInit)
                {
                    rootX = this._tileXInit;
                    width = ((this._tileXEnd - this._tileXInit) + 1);
                }
                else
                {
                    rootX = this._tileXEnd;
                    width = ((this._tileXInit - this._tileXEnd) + 1);
                };

                if(this._tileYEnd > this._tileYInit)
                {
                    rootY = this._tileYInit;
                    height = ((this._tileYEnd - this._tileYInit) + 1);
                }
                else
                {
                    rootY = this._tileYEnd;
                    height = ((this._tileYInit - this._tileYEnd) + 1);
                };

                this.setHighlight(rootX, rootY, width, height);
            };
        };
    }

    public finishSelecting(): boolean
    {
        if(this._state !== RoomAreaSelectionManager.SELECTING) return false;

        this._state = RoomAreaSelectionManager.NOT_SELECTING_AREA;

        this._roomEngine.moveBlocked = false;

        if(this._callback) this._callback(this._highlightRootX, this._highlightRootY, this._highlightWidth, this._highlightHeight);

        return true;
    }

    private clearHighlightSilent():void
    {
        const roomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);

        if(!roomObject) return;

        (roomObject.visualization as RoomVisualization)?.clearHighlightArea();
    }

    public clearHighlight(): void
    {
        if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

        this.clearHighlightSilent();

        this._state = RoomAreaSelectionManager.NOT_SELECTING_AREA;

        this._roomEngine.moveBlocked = false;

        if(this._callback) this._callback(0, 0, 0, 0);
    }

    public setHighlight(rootX: number, rootY: number, width: number, height: number): void
    {
        if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

        this._highlightRootX = rootX;
        this._highlightRootY = rootY;
        this._highlightWidth = width;
        this._highlightHeight = height;

        const roomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);

        if(!roomObject) return;

        (roomObject.visualization as RoomVisualization)?.initializeHighlightArea(rootX, rootY, width, height, RoomAreaSelectionManager.HIGHLIGHT_FILTERS[this._highlightType]);
    }

    public activate(callback: (rootX: number, rootY: number, width: number, height: number) => void, highlightType: string): boolean
    {
        if(this._state !== RoomAreaSelectionManager.NOT_ACTIVE) return false;

        this._callback = callback;
        this._highlightType = highlightType;

        for(const roomObject of this.getAllFurniture())
        {
            const visualization = (roomObject.visualization as FurnitureVisualization);

            if(visualization) visualization.lookThrough = true;
        };

        this._state = RoomAreaSelectionManager.NOT_SELECTING_AREA;

        return true;
    }

    public deactivate(): void
    {
        if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

        this._callback = null;

        for(const roomObject of this.getAllFurniture())
        {
            const visualization = (roomObject.visualization as FurnitureVisualization);

            if(visualization) visualization.lookThrough = false;
        };

        this.clearHighlight();

        this._state = RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public get areaSelectionState(): number
    {
        return this._state;
    }
}
