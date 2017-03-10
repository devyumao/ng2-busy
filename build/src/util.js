/**
 * @file Util
 * @author yumao<yuzhang.lille@gmail.com>
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// from AngularJS
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}
exports.isDate = isDate;
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isWindow(obj) {
    return obj && obj.window === obj;
}
exports.isWindow = isWindow;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isDefined(value) {
    return typeof value !== 'undefined';
}
exports.isDefined = isDefined;
function equals(o1, o2) {
    if (o1 === o2) {
        return true;
    }
    ;
    if (o1 === null || o2 === null) {
        return false;
    }
    if (o1 !== o1 && o2 !== o2) {
        return true; // NaN === NaN
    }
    var t1 = typeof o1;
    var t2 = typeof o2;
    var length;
    var key;
    var keySet;
    if (t1 === t2 && t1 === 'object') {
        if (Array.isArray(o1)) {
            if (!Array.isArray(o2)) {
                return false;
            }
            if ((length = o1.length) === o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key])) {
                        return false;
                    }
                }
                return true;
            }
        }
        else if (isDate(o1)) {
            if (!isDate(o2)) {
                return false;
            }
            return equals(o1.getTime(), o2.getTime());
        }
        else if (isRegExp(o1)) {
            if (!isRegExp(o2)) {
                return false;
            }
            return o1.toString() === o2.toString();
        }
        else {
            if (isWindow(o1) || isWindow(o2)
                || Array.isArray(o2) || isDate(o2) || isRegExp(o2)) {
                return false;
            }
            ;
            keySet = Object.create(null);
            for (key in o1) {
                if (key.charAt(0) === '$' || isFunction(o1[key])) {
                    continue;
                }
                ;
                if (!equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet)
                    && key.charAt(0) !== '$'
                    && isDefined(o2[key])
                    && !isFunction(o2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
exports.equals = equals;
//# sourceMappingURL=util.js.map