var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "commons", {
        get: function () {
            return Commons.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    return App;
}());
App.stageWidth = 288;
App.stageHeight = 512;
App.bgSpeedNormalOffset = 2;
App.bgSpeedUpOffset = 4;
App.bgOffset = App.bgSpeedNormalOffset;
App.isSpeedUp = false;
App.birdVelocity = 0; //当前速度 px/f
App.birdAcceleration = 0.5; //加速度 px/f^2
App.birdTouchV = -8; //点击加速度
App.isCheat = false; //是否作弊
App.testFlag = false;
__reflect(App.prototype, "App");
var GameStatue = (function () {
    function GameStatue() {
    }
    return GameStatue;
}());
GameStatue.GAME_END = 0;
GameStatue.GAME_START = 1;
GameStatue.GAME_PAUSE = 2;
__reflect(GameStatue.prototype, "GameStatue");
//# sourceMappingURL=App.js.map