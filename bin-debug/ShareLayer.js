var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareLayer = (function (_super) {
    __extends(ShareLayer, _super);
    function ShareLayer() {
        var _this = _super.call(this) || this;
        _this.container = '德玛西亚';
        _this.url = 'www.baidu.com';
        _this.imgUrl = 'http://avatar.csdn.net/9/A/0/1_kenkao.jpg';
        _this.init();
        return _this;
    }
    ShareLayer.getInstance = function () {
        if (!this.ins) {
            this.ins = new ShareLayer();
        }
        return this.ins;
    };
    ShareLayer.prototype.init = function () {
        var _this = this;
        var shape = new egret.Shape();
        this.shape = shape;
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawRect(0, 0, App.stageWidth, App.stageHeight);
        shape.graphics.endFill();
        shape.alpha = 0.5;
        shape.visible = false;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            _this.hide();
        }, this);
        this.addChild(shape);
        var qqZone = App.commons.getBitmap("QQZone_png", App.stageWidth / 3 * 1 - App.stageWidth / 6, App.stageHeight + 50);
        this.addChild(qqZone);
        this.qqZone = qqZone;
        qqZone.touchEnabled = true;
        qqZone.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            _this.share(3);
        }, this);
        var tencentWeibo = App.commons.getBitmap("TencentWeibo_png", App.stageWidth / 3 * 2 - App.stageWidth / 6, App.stageHeight + 50);
        this.addChild(tencentWeibo);
        this.tencentWeibo = tencentWeibo;
        tencentWeibo.touchEnabled = true;
        tencentWeibo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            _this.share(2);
        }, this);
        var sina = App.commons.getBitmap("sina_png", App.stageWidth - App.stageWidth / 6, App.stageHeight + 50);
        this.addChild(sina);
        this.sina = sina;
        sina.touchEnabled = true;
        sina.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            _this.share(1);
        }, this);
    };
    ShareLayer.prototype.show = function () {
        this.shape.visible = true;
        egret.Tween.get(this.shape).to({ alpha: 0.5 }, 500);
        egret.Tween.get(this.qqZone).to({ y: App.stageHeight - 50 }, 300, egret.Ease.backOut);
        egret.Tween.get(this.tencentWeibo).to({ y: App.stageHeight - 50 }, 400, egret.Ease.backOut);
        egret.Tween.get(this.sina).to({ y: App.stageHeight - 50 }, 500, egret.Ease.backOut);
    };
    ShareLayer.prototype.hide = function () {
        var _this = this;
        egret.Tween.get(this.shape).to({ alpha: 0 }, 500).call(function () { _this.shape.visible = false; });
        egret.Tween.get(this.qqZone).to({ y: App.stageHeight + 50 }, 300, egret.Ease.backIn);
        egret.Tween.get(this.tencentWeibo).to({ y: App.stageHeight + 50 }, 400, egret.Ease.backIn);
        egret.Tween.get(this.sina).to({ y: App.stageHeight + 50 }, 500, egret.Ease.backIn);
    };
    ShareLayer.prototype.share = function (type, container, url, imgUrl) {
        container && (this.container = container);
        url && (this.url = url);
        imgUrl && (this.imgUrl = imgUrl);
        switch (type) {
            case 1:
                this.shareWeibo();
                break;
            case 2:
                this.shareTencentWeibo();
                break;
            case 3:
                this.shareQQZone();
                break;
        }
    };
    //分享到新浪微博、腾讯微博、QQ空间
    ShareLayer.prototype.shareWeibo = function () {
        //分享到新浪微博
        var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.container + '&url=' + this.url + '&content=utf-8&sourceUrl=' + this.url + '&pic=' + this.imgUrl;
        window.open(sharesinastring, 'newwindow1', 'height=400,width=400,top=100,left=100');
    };
    ShareLayer.prototype.shareTencentWeibo = function () {
        //分享到疼讯微博
        var shareqqstring = 'http://v.t.qq.com/share/share.php?title=' + this.container + '&url=' + this.url + '&pic=' + this.imgUrl;
        window.open(shareqqstring, 'newwindow2', 'height=100,width=100,top=100,left=100');
    };
    ShareLayer.prototype.shareQQZone = function () {
        //分享到QQ空间
        var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + this.container + '&url=' + this.url + '&pics=' + this.imgUrl;
        window.open(shareqqzonestring, 'newwindow3', 'height=400,width=400,top=100,left=100');
    };
    return ShareLayer;
}(egret.DisplayObjectContainer));
__reflect(ShareLayer.prototype, "ShareLayer");
//# sourceMappingURL=ShareLayer.js.map