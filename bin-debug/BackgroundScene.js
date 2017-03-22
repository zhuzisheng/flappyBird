var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BackgroundScene = (function (_super) {
    __extends(BackgroundScene, _super);
    function BackgroundScene() {
        var _this = _super.call(this) || this;
        _this.bgArr = new Array();
        _this.creatScene();
        return _this;
    }
    BackgroundScene.prototype.creatScene = function () {
        var bgSp1 = new Background();
        var bgSp2 = new Background();
        bgSp2.x = App.stageWidth;
        bgSp2.setPipe();
        this.addChild(bgSp1);
        this.addChild(bgSp2);
        this.bgArr.push(bgSp1, bgSp2);
    };
    BackgroundScene.prototype.init = function () {
        var bgSp1 = this.bgArr[0];
        var bgSp2 = this.bgArr[1];
        bgSp1.x = 0;
        bgSp1.setEnable(false);
        bgSp2.x = App.stageWidth;
        bgSp2.setPipe();
    };
    BackgroundScene.prototype.Update = function () {
        var offset = App.bgOffset;
        this.bgArr.forEach(function (background) {
            background.x = background.x - offset;
            if (background.x <= -App.stageWidth) {
                background.x = App.stageWidth;
                background.setPipe();
            }
        });
        return this.checkAddScore();
    };
    /**
     * 判断是否是4的约数，不然背景位移会错位
     */
    BackgroundScene.prototype.checkOffset = function () {
        if (this.bgArr[0].x % 4 != 0) {
            this.bgArr.forEach(function (background) {
                background.x = background.x - 2;
            });
        }
    };
    /**
     * 获取下一个起跳时间
     */
    BackgroundScene.prototype.getNextDeadLine = function () {
        if (this.bgArr[0].isPipeEnable && !this.bgArr[0].isChecked && (this.bgArr[1].isChecked || this.bgArr[0].x < this.bgArr[1].x)) {
            return this.bgArr[0].pipeup.y;
        }
        else {
            return this.bgArr[1].pipeup.y;
        }
    };
    BackgroundScene.prototype.isHit = function () {
        //几种数组遍历的写法，也可以用every
        // var ishit = false;
        var _this = this;
        // this.bgArr.forEach((background) => {
        // 	if (this.isPointInBg(background, GameScene.getinstance().getBirdPos()[0], GameScene.getinstance().getBirdPos()[1])) {
        // 		console.log("hited");
        // 		ishit = true;
        // 		return;
        // 	}
        // });
        // return ishit;
        //使用function，就是this有点烦
        // var self = this;
        // return this.bgArr.some(function(background){
        // 		return self.isPointInBg(background, GameScene.getinstance().getBirdPos()[0], GameScene.getinstance().getBirdPos()[1]);
        // });
        //使用箭头函数，不需要考虑this
        //some方法是碰到一个返回true的值时候就返回true,否则返回false
        return this.bgArr.some(function (background) {
            return _this.isPointInBg(background, GameScene.getInstance().getBirdPos()[0], GameScene.getInstance().getBirdPos()[1]);
        });
    };
    BackgroundScene.prototype.isPointInBg = function (bg, x, y) {
        if (!bg.isPipeEnable) {
            return false;
        }
        var recDown = new egret.Rectangle(bg.pipedown.x + bg.x, 0, bg.pipedown.width, bg.pipedown.y);
        if (this.isInRect(recDown, x, y)) {
            return true;
        }
        var recUp = new egret.Rectangle(bg.pipeup.x + bg.x, bg.pipeup.y, bg.pipeup.width, App.stageHeight);
        if (this.isInRect(recUp, x, y)) {
            return true;
        }
        return false;
    };
    BackgroundScene.prototype.isInRect = function (rec, x, y) {
        var birdOffset = GameScene.getInstance().getBirdOffset();
        if (x >= rec.x - birdOffset && x <= (rec.x + rec.width + birdOffset) && y >= rec.y - birdOffset && y <= rec.y + rec.height + birdOffset) {
            return true;
        }
        return false;
    };
    BackgroundScene.prototype.checkAddScore = function () {
        return this.bgArr.some(function (background) {
            if (background.checkAddScore()) {
                return true;
            }
            return false;
        });
    };
    return BackgroundScene;
}(egret.DisplayObjectContainer));
__reflect(BackgroundScene.prototype, "BackgroundScene");
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.stageWidth = App.stageWidth;
        _this.landHeight = 112;
        var bg = new egret.Bitmap(RES.getRes("bg_day_png"));
        var land = new egret.Bitmap(RES.getRes("land_png"));
        land.y = bg.height - land.height;
        _this.addChild(bg);
        var pipedown = new egret.Bitmap(RES.getRes("pipe_down_png"));
        // pipedown.anchorOffsetX = pipedown.width / 2;
        pipedown.anchorOffsetY = pipedown.height;
        pipedown.x = bg.width / 2;
        _this.pipedown = pipedown;
        _this.addChild(pipedown);
        var pipeup = new egret.Bitmap(RES.getRes("pipe_up_png"));
        // pipeup.anchorOffsetX = pipeup.width / 2;
        pipeup.x = bg.width / 2;
        _this.pipeup = pipeup;
        _this.addChild(pipeup);
        _this.addChild(land);
        _this.setEnable(false);
        return _this;
    }
    Background.prototype.checkAddScore = function () {
        if (!this.isPipeEnable || this.isChecked) {
            return false;
        }
        if (this.x + this.pipedown.x + this.pipedown.width + GameScene.getInstance().getBirdOffset() < App.stageWidth / 2) {
            this.isChecked = true;
            return true;
        }
        return false;
    };
    Background.prototype.setPipe = function () {
        this.setEnable(true);
        var randGap = Math.round(Math.random() * 50) + 100; //间隙
        var randPipedownHeight = Math.round(Math.random() * (App.stageHeight - this.landHeight - randGap - 100)) + 50;
        this.pipedown.y = randPipedownHeight;
        this.pipeup.y = randPipedownHeight + randGap;
    };
    Background.prototype.setEnable = function (isEnable) {
        this.pipedown.visible = isEnable;
        this.pipeup.visible = isEnable;
        this.isPipeEnable = isEnable;
        this.isChecked = false;
    };
    return Background;
}(egret.DisplayObjectContainer));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=BackgroundScene.js.map