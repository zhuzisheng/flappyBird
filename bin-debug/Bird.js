var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.creatBird();
        return _this;
    }
    Bird.prototype.creatBird = function () {
        var bird = App.commons.getBitmap("bird0_0_png", App.stageWidth / 2, (App.stageHeight - 112) / 2);
        this.bird = bird;
        this.addChild(bird);
    };
    Bird.prototype.init = function () {
        this.bird.x = App.stageWidth / 2;
        this.bird.y = (App.stageHeight - 112) / 2;
        App.birdVelocity = 0;
    };
    Bird.prototype.Update = function () {
        App.birdVelocity = App.birdVelocity + App.birdAcceleration;
        for (var i = 0; i < Math.abs(App.birdVelocity); i++) {
            this.bird.y += Math.abs(App.birdVelocity) / App.birdVelocity;
            var ishit = GameScene.getInstance().getBackgroundScene().isHit();
            if (ishit) {
                return false;
            }
            if (this.bird.y >= App.stageHeight - 112 - this.getBirdOffset()) {
                return false;
            }
        }
        return true;
    };
    Bird.prototype.fuckflying = function () {
        if (this.bird.y >= 0) {
            App.birdVelocity = App.birdTouchV;
        }
    };
    Bird.prototype.getBirdPos = function () {
        return [this.bird.x, this.bird.y];
    };
    Bird.prototype.getBirdOffset = function () {
        return this.bird.width / 4;
    };
    return Bird;
}(egret.DisplayObjectContainer));
__reflect(Bird.prototype, "Bird");
//# sourceMappingURL=Bird.js.map