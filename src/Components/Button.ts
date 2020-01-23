import { ValidMeasurement } from "../types";
import {parseLengthMeasurements} from "../utils";
import {StyleOptionsParams} from "./TextInput/TextField";

import { PixiElement } from "../Element";

export interface ButtonStyleStateOptions {
    width?: number,
    height?: number,
    textColor?: number,
    backgroundTexture?: PIXI.Texture,
    backgroundOpacity?: number,
    backgroundColor?: number,
    borderColor?: number,
    borderWidth?: number,
    borderOpacity?: number,
    borderRadius?: number,
}
export interface ButtonStyleOptions {
    defaultStyle: ButtonStyleStateOptions,
    hoverStyle?: ButtonStyleStateOptions,
    pressedStyle?: ButtonStyleStateOptions,
    font: string,
}

const stateStylesToValidate = ["hoverStyle", "defaultStyle", "pressedStyle"];

enum BtnState {
    NONE,
    HOVER,
    PRESSED,
}
export class Button extends PixiElement {
    private _text: string;
    private txtSprite: PIXI.extras.BitmapText;
    private bgGraphic: PIXI.Graphics;
    private bgSprite: PIXI.Sprite;
    private styleOptions: ButtonStyleOptions = { defaultStyle: {}, font: '' };
    private _currentStyleState: ButtonStyleStateOptions;
    private _btnState: BtnState = BtnState.NONE;
    constructor(text: string, styleOptions: ButtonStyleOptions) {
        super();
        this._text = text;
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', () => this.btnState = BtnState.PRESSED);
        this.on('pointerup', () => this.btnState = BtnState.NONE);
        this.on('pointerupoutside', () => this.btnState = BtnState.NONE);
        this.on('pointerover', () => this.btnState = BtnState.HOVER);
        this.on('pointerout', () => this.btnState = BtnState.NONE);
        this.updateStyle(styleOptions);
    }

    set btnState(newState) {
        if(newState !== this._btnState) {
            this._btnState = newState;
            this.redraw();
        }
    }

    set text(value) {
        this._text = value;
        this.redrawText();
    }

    public updateStyle(styleOptions: ButtonStyleOptions) {
        Object.keys(styleOptions).forEach(key => {
            this.styleOptions[key] = styleOptions[key];
        });
        this.redraw();
    }

    public redraw() {
        this.clear();
        this.redrawBg();
        this.redrawText();
    }

    public redrawText() {
        if(!this.txtSprite) {
            this.txtSprite = new PIXI.extras.BitmapText('', {font: this.styleOptions.font, align: 'center'});
            this.addChild(this.txtSprite)
        }
        if(this.currentStyleState.textColor || this.currentStyleState.textColor == 0) {
            this.txtSprite.tint = this.currentStyleState.textColor;
        }
        this.txtSprite.text = this._text;
        this.txtSprite.maxWidth = this.width;
        this.txtSprite.x = this.currentStyleState.width / 2 - this.txtSprite.width / 2;
        this.txtSprite.y = this.currentStyleState.height / 2 - this.txtSprite.height / 2;
    }

    public redrawBg() {
        let {backgroundColor, borderRadius, borderColor, borderWidth, width, height, backgroundTexture, backgroundOpacity, borderOpacity} = this.currentStyleState;

        if(backgroundColor || backgroundColor === 0) {
            if(!this.bgGraphic) {
                this.bgGraphic = new PIXI.Graphics();
                this.addChild(this.bgGraphic);
            } else {
                this.bgGraphic.clear();
            }
            backgroundOpacity = backgroundOpacity || backgroundOpacity == 0 ? backgroundOpacity : 1;
            this.bgGraphic.beginFill(backgroundColor, backgroundOpacity);
            if(borderWidth) {
                borderOpacity = borderOpacity || borderOpacity == 0 ? borderOpacity : 1;
                this.bgGraphic.lineStyle(borderWidth, borderColor, borderOpacity);
            }

            if(borderRadius) {
                const computedBorderRadius =  borderRadius / 100 * height;
                this.bgGraphic.drawRoundedRect(0, 0, width, height, computedBorderRadius);
            } else {
                this.bgGraphic.drawRect(0, 0, width, height);
            }
            this.bgGraphic.endFill();
        }

        if(backgroundTexture) {
            if(!this.bgSprite) {
                this.bgSprite = new PIXI.Sprite();
                this.addChild(this.bgSprite);
            }
            this.bgSprite.texture = backgroundTexture;
            this.bgSprite.x = width / 2 - this.bgSprite.x / 2;
            this.bgSprite.y = height / 2 - this.bgSprite.y / 2;
        }
        this.hitArea = new PIXI.Rectangle(0, 0, width, height);
    }

    private clear() {
        if(this.txtSprite) {
            this.removeChild(this.txtSprite);
            this.txtSprite.destroy({ children: true });
            this.txtSprite = null;
        }
        if(this.bgGraphic) {
            this.removeChild(this.bgGraphic);
            this.bgGraphic.destroy();
            this.bgGraphic = null;
        }
        if(this.bgSprite) {
            this.removeChild(this.bgSprite);
            this.bgSprite.destroy();
            this.bgSprite = null;
        }
    }

    get currentStyleState() {
        switch(this._btnState) {
            case BtnState.NONE:
                return this.styleOptions.defaultStyle;
                break;
            case BtnState.HOVER:
                return this.styleOptions.hoverStyle ? this.styleOptions.hoverStyle : this.styleOptions.defaultStyle;
                break;
            case BtnState.PRESSED:
                // cascade to check if we have pressedStyle defined, if so use it, otherwise use hover, otherwise use default
                return this.styleOptions.pressedStyle ? this.styleOptions.pressedStyle :
                    this.styleOptions.hoverStyle ? this.styleOptions.hoverStyle :
                        this.styleOptions.defaultStyle;
                break;
        }
    }
}