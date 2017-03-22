class Commons extends BaseClass {
    public constructor() {
        super();
    }

    public getBitmap(imgName: string, x: number, y: number, isCenterAlign: boolean = true): egret.Bitmap {
        var bitmap = new egret.Bitmap(RES.getRes(imgName));
        if (isCenterAlign) {
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
        }
        bitmap.x = x;
        bitmap.y = y;
        return bitmap;
    }

    public mobileShake(time: number) {
        if (navigator["vibrate"]) {
            navigator.vibrate([time]);
        }
    }

    public addHandShakeShake() {
        if (window && window["DeviceMotionEvent"]) {
            var second = 2000;//秒
            var starttime = egret.getTimer();//开始时间
            var startX, startY, startZ, endX, endY, endZ;//开始坐标和结束坐标
            startX = startY = startZ = endX = endY = endZ = 0;
            window.addEventListener('devicemotion', (e) => {
                var acceleration = e.accelerationIncludingGravity;//
                var endtime = egret.getTimer();//结束时间
                if ((endtime - starttime) > 100) {
                    var diffTime = endtime - starttime;//时间差
                    startX = acceleration.x;
                    startY = acceleration.y;
                    startZ = acceleration.z;
                    var speed = Math.abs(startX + startY + startZ - endX - endY - endZ) / diffTime * 10000;
                    if (speed > second) {
                        this.mobileShake(500);
                        egret.Tween.get(this).wait(100).call(() => {
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
    }

    // public removeHandShakeShake(){
    //     if (window && window["DeviceMotionEvent"]) {
    //         window.removeEventListener('devicemotion',()=>{},false)
    //     }
    // }
}