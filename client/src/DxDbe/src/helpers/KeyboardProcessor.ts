/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import TFunction from "../models/Types/Types";
import {createKeyDownOptions} from "../utils/keyboardUtils";

export class ShortcutOptions {
    constructor(
        public code: string,
        public shift: boolean,
        public ctrl: boolean,
        public extraParams: any
    ) {}

    public isSameKey(keyOpt) {
        return this.code === keyOpt.code
            && this.ctrl === keyOpt.ctrl
            && this.shift === keyOpt.shift;
    }

    public toString() {
        return `${this.code}-${this.ctrl}-${this.shift}`;
    }
}

class KeyboardProcessor {
    public static instances: {[key: string]: KeyboardProcessor} = {};

    private keyListeners: Map<string, { [key: string]: any }> = new Map();
    public componentStorage: Map<string, object> = new Map();

    constructor(tableType) {
        if (!KeyboardProcessor.instances[tableType]) {
            this.listenKeyboardEvents();
            this.setComponentInstance = this.setComponentInstance.bind(this);

            KeyboardProcessor.instances[tableType] = this;
            return this;
        }
        return KeyboardProcessor.instances[tableType];

    }

    public setComponentInstance(buttonName, component) {
        this.componentStorage.set(buttonName, component);
    }

    private listenKeyboardEvents() {
        document.addEventListener("keyup", (event) => {
            if (event.isComposing || event.keyCode === 229) {
                return;
            }
            this.runListeners(createKeyDownOptions(event));
        });
    }

    public runListeners(keyDownOpt) {
        [...this.keyListeners.values()].forEach(({buttonName, shortcutOptions, handler}) => {
            if (shortcutOptions.isSameKey(keyDownOpt)) {
                const component = this.componentStorage.get(buttonName);
                handler({itemData: shortcutOptions.extraParams, component});
            }
        });
    }

    public registerShortcut(shortcutOptions: ShortcutOptions, handler: TFunction, buttonName: string) {
        this.keyListeners.set(shortcutOptions.toString(), {buttonName, shortcutOptions, handler});
    }

}

export default KeyboardProcessor;