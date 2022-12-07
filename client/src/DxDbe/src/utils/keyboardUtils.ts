/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

const KEY_MAP = {
    backspace: "backspace",
    tab: "tab",
    enter: "enter",
    escape: "escape",
    pageup: "pageUp",
    pagedown: "pageDown",
    end: "end",
    home: "home",
    arrowleft: "leftArrow",
    arrowup: "upArrow",
    arrowright: "rightArrow",
    arrowdown: "downArrow",
    delete: "del",
    " ": "space",
    f: "F",
    a: "A",
    "*": "asterisk",
    "-": "minus",
    alt: "alt",
    control: "control",
    shift: "shift"
};
const LEGACY_KEY_CODES = {
    8: "backspace",
    9: "tab",
    13: "enter",
    27: "escape",
    33: "pageUp",
    34: "pageDown",
    35: "end",
    36: "home",
    37: "leftArrow",
    38: "upArrow",
    39: "rightArrow",
    40: "downArrow",
    46: "del",
    32: "space",
    70: "F",
    65: "A",
    106: "asterisk",
    109: "minus",
    189: "minus",
    173: "minus",
    16: "shift",
    17: "control",
    18: "alt"
};
const EVENT_SOURCES_REGEX = {
    dx: /^dx/i,
    mouse: /(mouse|wheel)/i,
    touch: /^touch/i,
    keyboard: /^key/i,
    pointer: /^(ms)?pointer/i
};

export const normalizeKeyName = event => {
    const isKeySupported = !!event.key;
    let key = isKeySupported ? event.key : event.which;
    if (key) {
        if (isKeySupported) {
            key = KEY_MAP[key.toLowerCase()] || key;
        } else {
            key = LEGACY_KEY_CODES[key] || String.fromCharCode(key);
        }
        return key;
    }
};

export const createKeyDownOptions = (e) => ({
    keyName: normalizeKeyName(e),
    key: e.key,
    code: e.code,
    ctrl: e.ctrlKey,
    location: e.location,
    metaKey: e.metaKey,
    shift: e.shiftKey,
    alt: e.altKey,
    which: e.which,
    originalEvent: e
});