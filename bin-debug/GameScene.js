var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.gameStatue = GameStatue.GAME_END;
        _this.currentScore = 0;
        _this.createGameScene();
        return _this;
    }
    GameScene.getInstance = function () {
        if (!this.ins) {
            this.ins = new GameScene();
        }
        return this.ins;
    };
    GameScene.prototype.createGameScene = function () {
        var _this = this;
        var bgScene = new BackgroundScene();
        this.bgScene = bgScene;
        this.addChild(bgScene);
        var bird = new Bird();
        // bird.visible = false;
        this.bird = bird;
        this.addChild(bird);
        //游戏结束
        var gameOverPic = App.commons.getBitmap("text_game_over_png", App.stageWidth / 2, App.stageHeight / 3);
        this.gameOverPic = gameOverPic;
        gameOverPic.visible = false;
        this.addChild(gameOverPic);
        //重新开始
        var restartBt = App.commons.getBitmap("button_restart_png", App.stageWidth / 2, App.stageHeight / 2 - 40);
        this.restartBt = restartBt;
        restartBt.visible = false;
        this.addChild(restartBt);
        restartBt.touchEnabled = true;
        restartBt.addEventListener(egret.TouchEvent.TOUCH_END, this.restartCB, this);
        //主菜单
        var mainMenuBt = App.commons.getBitmap("button_menu_png", App.stageWidth / 2, App.stageHeight / 2);
        this.mainMenuBt = mainMenuBt;
        mainMenuBt.visible = false;
        this.addChild(mainMenuBt);
        mainMenuBt.touchEnabled = true;
        mainMenuBt.addEventListener(egret.TouchEvent.TOUCH_END, this.mainMenuCB, this);
        //开始游戏
        var playBt = App.commons.getBitmap("button_play_png", App.stageWidth / 2, App.stageHeight / 2);
        this.playBt = playBt;
        playBt.visible = false;
        this.addChild(playBt);
        playBt.touchEnabled = true;
        playBt.addEventListener(egret.TouchEvent.TOUCH_END, this.gameStart, this);
        //暂停
        var pauseBt = App.commons.getBitmap("button_pause_png", App.stageWidth - 20, App.stageHeight - 20);
        this.pauseBt = pauseBt;
        pauseBt.visible = false;
        this.addChild(pauseBt);
        pauseBt.touchEnabled = true;
        pauseBt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pauseCB, this, true, 10);
        //分享
        var shareBt = App.commons.getBitmap("button_share_png", App.stageWidth / 2, App.stageHeight - 20);
        this.shareBt = shareBt;
        shareBt.visible = false;
        this.addChild(shareBt);
        shareBt.touchEnabled = true;
        shareBt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareCB, this, true, 10);
        //开挂
        var cheatBt = App.commons.getBitmap("cheat_normal_png", 50, App.stageHeight - 50);
        this.addChild(cheatBt);
        cheatBt.touchEnabled = true;
        cheatBt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            App.isCheat = !App.isCheat;
            _this.cheatAnimation(cheatBt);
        }, this, true, 10);
        this.cheatAnimation(cheatBt);
        //加速
        var speedBt = App.commons.getBitmap("X1_png", App.stageWidth / 2, App.stageHeight - 20);
        this.addChild(speedBt);
        this.speedBt = speedBt;
        speedBt.visible = false;
        speedBt.touchEnabled = true;
        speedBt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            App.isSpeedUp = !App.isSpeedUp;
            if (App.isSpeedUp) {
                _this.bgScene.checkOffset();
                App.bgOffset = App.bgSpeedUpOffset;
                _this.speedBt.texture = RES.getRes("X2_png");
            }
            else {
                App.bgOffset = App.bgSpeedNormalOffset;
                _this.speedBt.texture = RES.getRes("X1_png");
            }
        }, this, true, 10);
        //得分
        this.score = new egret.TextField();
        this.score.text = "得分";
        this.score.anchorOffsetX = this.score.width / 2;
        this.score.x = App.stageWidth / 2;
        this.score.y = 10;
        this.addChild(this.score);
        this.scoreNum = new egret.TextField();
        this.scoreNum.text = "0";
        this.scoreNum.anchorOffsetX = this.scoreNum.width / 2;
        this.scoreNum.x = App.stageWidth / 2;
        this.scoreNum.y = 50;
        this.addChild(this.scoreNum);
        this.scoreNum.strokeColor = 0x555555;
        this.scoreNum.stroke = 2;
        this.setMainmenu(true);
        this.touchEnabled = true;
        Commons.getInstance().addHandShakeShake(); //添加摇一摇
        var shareLayer = ShareLayer.getInstance();
        this.addChild(shareLayer);
    };
    GameScene.prototype.cheatAnimation = function (cheatBt) {
        if (App.isCheat) {
            egret.Tween.removeTweens(cheatBt);
            cheatBt.rotation = 0;
            console.log("坐稳，开挂啦！");
        }
        else {
            egret.Tween.get(cheatBt, { loop: true }).to({ rotation: 20 }, 200).to({ rotation: -20 }, 400).to({ rotation: 0 }, 200);
        }
    };
    //分享到QQ空间
    GameScene.prototype.shareCB = function () {
        // var container: string = '德玛西亚';
        // var url: string = 'www.baidu.com';
        // var imgUrl: string = 'http://avatar.csdn.net/9/A/0/1_kenkao.jpg';
        // ShareLayer.getInstance().share(3, container, url, imgUrl);
        ShareLayer.getInstance().show();
    };
    GameScene.prototype.mainMenuCB = function () {
        this.setMainmenu(true);
    };
    GameScene.prototype.setMainmenu = function (isvisible) {
        if (isvisible) {
            this.setGameOvermenu(false);
            this.setGameingMenu(false);
        }
        this.playBt.visible = isvisible;
        this.shareBt.visible = isvisible;
    };
    GameScene.prototype.setGameOvermenu = function (isvisible) {
        if (isvisible) {
            this.setGameingMenu(false);
            this.setMainmenu(false);
        }
        this.gameOverPic.visible = isvisible;
        this.restartBt.visible = isvisible;
        this.mainMenuBt.visible = isvisible;
    };
    GameScene.prototype.setGameingMenu = function (isvisible) {
        if (isvisible) {
            this.setGameOvermenu(false);
            this.setMainmenu(false);
        }
        this.pauseBt.visible = isvisible;
        this.speedBt.visible = isvisible;
    };
    GameScene.prototype.addScoreNum = function () {
        this.currentScore++;
        this.scoreNum.text = this.currentScore.toString();
        this.scoreNum.anchorOffsetX = this.scoreNum.width / 2;
    };
    GameScene.prototype.setScoreVisible = function (isvisible) {
        this.scoreNum.visible = isvisible;
        this.score.visible = isvisible;
    };
    GameScene.prototype.initScoreNum = function () {
        this.scoreNum.text = "0";
        this.currentScore = 0;
    };
    GameScene.prototype.gameStart = function () {
        // location.reload();
        if (this.gameStatue == GameStatue.GAME_START) {
            return;
        }
        if (this.hasEventListener(egret.Event.ENTER_FRAME) == false) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        }
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == false) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        }
        this.gameStatue = GameStatue.GAME_START;
        this.initScoreNum();
        this.setGameingMenu(true);
        this.bird.init();
        this.bgScene.init();
    };
    GameScene.prototype.touchBegin = function () {
        this.bird.fuckflying();
    };
    GameScene.prototype.Update = function () {
        if (this.gameStatue != GameStatue.GAME_START) {
            return;
        }
        if (App.isCheat && this.getBirdPos()[1] + this.getBirdOffset() + 10 >= this.bgScene.getNextDeadLine()) {
            this.touchBegin();
        }
        if (this.bgScene.Update()) {
            this.addScoreNum();
        }
        if (!this.bird.Update()) {
            this.gameOver();
            return;
        }
    };
    GameScene.prototype.restartCB = function (e) {
        this.gameStart();
    };
    GameScene.prototype.pauseCB = function (e) {
        if (this.gameStatue == GameStatue.GAME_PAUSE) {
            this.resumeMenu();
        }
        else if (this.gameStatue == GameStatue.GAME_START) {
            this.pauseMenu();
        }
        else {
            console.log("wrong gameStatue：" + this.gameStatue);
        }
        e.stopPropagation();
    };
    GameScene.prototype.pauseMenu = function () {
        if (this.hasEventListener(egret.Event.ENTER_FRAME) == true) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        }
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == true) {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        }
        this.gameStatue = GameStatue.GAME_PAUSE;
        this.pauseBt.texture = RES.getRes("button_resume_png");
    };
    GameScene.prototype.resumeMenu = function () {
        if (this.hasEventListener(egret.Event.ENTER_FRAME) == false) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        }
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == false) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        }
        this.gameStatue = GameStatue.GAME_START;
        this.pauseBt.texture = RES.getRes("button_pause_png");
    };
    GameScene.prototype.gameOver = function () {
        if (this.gameStatue == GameStatue.GAME_END) {
            return;
        }
        if (this.hasEventListener(egret.Event.ENTER_FRAME) == true) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        }
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == true) {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        }
        this.gameStatue = GameStatue.GAME_END;
        Commons.getInstance().mobileShake(500);
        this.setGameOvermenu(true);
        console.log("Game Over");
    };
    GameScene.prototype.getBirdPos = function () {
        return this.bird.getBirdPos();
    };
    GameScene.prototype.getBirdOffset = function () {
        return this.bird.getBirdOffset();
    };
    GameScene.prototype.getBackgroundScene = function () {
        return this.bgScene;
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map