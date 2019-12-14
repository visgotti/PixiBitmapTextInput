/// <reference types="pixi.js" />
export declare class PixiElement extends PIXI.Container {
    private elements;
    private dragPosition;
    private inDrag;
    private pointerIsDown;
    private _pointerdownHandler;
    private _pointermoveHandler;
    private _pointerupHandler;
    private _pointerupoutsideHandler;
    private _pointeroverHandler;
    private _pointeroutHandler;
    private _doubleclickHandler;
    private _dragmoveHandler;
    private _dragendHandler;
    private _dragstartHandler;
    private _swipeupHandler;
    private _swipedownHandler;
    private _swipeHandler;
    private doubleClickTimeout;
    private _addChild;
    private completedTriggerTimeout;
    private holdDragTriggerTime;
    private holdDragTriggerTimeout;
    private helddownCountHandlers;
    private helddownTimeouts;
    private mouseDownInElement;
    private swipeStartY;
    private swipeStartTs;
    private swipeEndY;
    maxSwipeTimeout: number;
    minSwipeDistance: number;
    constructor();
    pointerdownHandler: any;
    pointerupHandler: any;
    pointerupoutsideHandler: any;
    pointeroverHandler: any;
    pointermoveHandler: any;
    pointeroutHandler: any;
    doubleclickHandler: any;
    dragstartHandler: any;
    dragendHandler: any;
    dragmoveHandler: any;
    private _setHeldDownHandler;
    private _setEventNameHandler;
    centerX(): void;
    centerY(): void;
    center(): void;
    addElement(element: Element): void;
    removeElement(element: Element): void;
    onMouseDown(handler: any): void;
    onMouseUp(handler: any): void;
    onMouseUpOutside(handler: any): void;
    onMouseOver(handler: any): void;
    onMouseOut(handler: any): void;
    onMouseMove(handler: any): void;
    onHeldDown(handler: any, timeout: number): void;
    /**
     *
     * @param handler
     * @param hold - time in milliseconds needed to be held before triggering drag
     */
    onDragStart(handler: any, hold?: number): void;
    onDragEnd(handler: any): void;
    onDragMove(handler: any): void;
    onDoubleClick(handler: any): void;
    onSwipe(handler: any): void;
    onSwipeUp(handler: any): void;
    onSwipeDown(handler: any): void;
    private __doubleclick;
    private clearHelddownTimeouts;
    private registerDefaultIfNeeded;
    private __pointerdown;
    private __dragstart;
    private __dragmove;
    private __dragend;
    private __pointermove;
    private __pointerover;
    private __pointerout;
    private handleSwipeFinish;
    private __pointerupoutside;
    private __pointerup;
    private clearDragTimeouts;
    private repositionSelf;
    repositionChildren(): void;
}
