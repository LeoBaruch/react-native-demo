import { Dimensions, PixelRatio, Platform } from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;

const pxToDp = function(uiElementPx, isInt = true, uiWidth = 750) {
    if (typeof uiElementPx === "string") {
      uiElementPx = Number(uiElementPx);
    }
    if (uiElementPx <= 3) {
      return uiElementPx;
    }
    const mathResult = uiElementPx * deviceWidthDp / uiWidth;
    const resultInt = isInt ? Math.ceil(mathResult) : mathResult;
    return mathResult > (1 / PixelRatio.get()) ? resultInt : 1 / PixelRatio.get();
};

export {
    pxToDp,
}