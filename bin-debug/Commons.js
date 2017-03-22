var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Commons = (function (_super) {
    __extends(Commons, _super);
    function Commons() {
        return _super.call(this) || this;
    }
    Commons.prototype.getBitmap = function (imgName, x, y, isCenterAlign) {
        if (isCenterAlign === void 0) { isCenterAlign = true; }
        var bitmap = new egret.Bitmap(RES.getRes(imgName));
        if (isCenterAlign) {
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
        }
        bitmap.x = x;
        bitmap.y = y;
        return bitmap;
    };
    Commons.prototype.mobileShake = function (time) {
        if (navigator["vibrate"]) {
            navigator.vibrate([time]);
        }
    };
    Commons.prototype.addHandShakeShake = function () {
        var _this = this;
        if (window && window["DeviceMotionEvent"]) {
            var second = 2000; //秒
            var starttime = egret.getTimer(); //开始时间
            var startX, startY, startZ, endX, endY, endZ; //开始坐标和结束坐标
            startX = startY = startZ = endX = endY = endZ = 0;
            window.addEventListener('devicemotion', function (e) {
                var acceleration = e.accelerationIncludingGravity; //
                var endtime = egret.getTimer(); //结束时间
                if ((endtime - starttime) > 100) {
                    var diffTime = endtime - starttime; //时间差
                    startX = acceleration.x;
                    startY = acceleration.y;
                    startZ = acceleration.z;
                    var speed = Math.abs(startX + startY + startZ - endX - endY - endZ) / diffTime * 10000;
                    if (speed > second) {
                        _this.mobileShake(500);
                        egret.Tween.get(_this).wait(100).call(function () {
                            alert("恭喜你触发摇一摇，然而并没有什么卵用！");
                        });
                    }
                    starttime = endtime;
                    endX = startX;
                    endY = startY;
                    endZ = startZ;
                }
            }, false);
        }
    };
    return Commons;
}(BaseClass));
__reflect(Commons.prototype, "Commons");
//# sourceMappingURL=Commons.js.map