class ShareLayer extends egret.DisplayObjectContainer {

    private static ins: ShareLayer;

	private container: string = '德玛西亚';
	private url: string = 'www.baidu.com';
	private imgUrl: string = 'http://avatar.csdn.net/9/A/0/1_kenkao.jpg';
	private shape: egret.Shape;

	private qqZone: egret.Bitmap;
	private tencentWeibo: egret.Bitmap;
	private sina: egret.Bitmap;


	public constructor() {
		super();
		this.init()
	}

    public static getInstance(): ShareLayer {
        if (!this.ins) {
            this.ins = new ShareLayer();
        }
        return this.ins;
    }

	private init() {
        var shape: egret.Shape = new egret.Shape();
		this.shape = shape;
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawRect(0, 0, App.stageWidth, App.stageHeight);
        shape.graphics.endFill();
		shape.alpha = 0.5;
		shape.visible = false;
		shape.touchEnabled = true;
		shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
			e.stopPropagation();
			this.hide();
		}, this);
        this.addChild(shape);


        var qqZone = App.commons.getBitmap("QQZone_png", App.stageWidth / 3 * 1 - App.stageWidth / 6, App.stageHeight + 50);
		this.addChild(qqZone);
		this.qqZone = qqZone;
		qqZone.touchEnabled = true;
        qqZone.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            e.stopPropagation();
			this.share(3);
		},this)

        var tencentWeibo = App.commons.getBitmap("TencentWeibo_png", App.stageWidth / 3 * 2 - App.stageWidth / 6, App.stageHeight + 50);
		this.addChild(tencentWeibo);
		this.tencentWeibo = tencentWeibo;
		tencentWeibo.touchEnabled = true;
        tencentWeibo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            e.stopPropagation();
			this.share(2);
		},this)

        var sina = App.commons.getBitmap("sina_png", App.stageWidth - App.stageWidth / 6, App.stageHeight + 50);
		this.addChild(sina);
		this.sina = sina;
		sina.touchEnabled = true;
        sina.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            e.stopPropagation();
			this.share(1);
		},this)

	}

	public show() {
		this.shape.visible = true;
		egret.Tween.get(this.shape).to({ alpha: 0.5 }, 500);
		egret.Tween.get(this.qqZone).to({ y: App.stageHeight - 50 }, 300, egret.Ease.backOut);
		egret.Tween.get(this.tencentWeibo).to({ y: App.stageHeight - 50 }, 400, egret.Ease.backOut);
		egret.Tween.get(this.sina).to({ y: App.stageHeight - 50 }, 500, egret.Ease.backOut);
	}

	private hide() {
		egret.Tween.get(this.shape).to({ alpha: 0 }, 500).call(() => { this.shape.visible = false });
		egret.Tween.get(this.qqZone).to({ y: App.stageHeight + 50 }, 300, egret.Ease.backIn);
		egret.Tween.get(this.tencentWeibo).to({ y: App.stageHeight + 50 }, 400, egret.Ease.backIn);
		egret.Tween.get(this.sina).to({ y: App.stageHeight + 50 }, 500, egret.Ease.backIn);
	}

	public share(type: number, container?: string, url?: string, imgUrl?: string) {
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
	}

    //分享到新浪微博、腾讯微博、QQ空间
    private shareWeibo() {
        //分享到新浪微博
        var sharesinastring: string = 'http://v.t.sina.com.cn/share/share.php?title=' + this.container + '&url=' + this.url + '&content=utf-8&sourceUrl=' + this.url + '&pic=' + this.imgUrl;
        window.open(sharesinastring, 'newwindow1', 'height=400,width=400,top=100,left=100');
    }

    private shareTencentWeibo() {
        //分享到疼讯微博
        var shareqqstring: string = 'http://v.t.qq.com/share/share.php?title=' + this.container + '&url=' + this.url + '&pic=' + this.imgUrl;
        window.open(shareqqstring, 'newwindow2', 'height=100,width=100,top=100,left=100');
	}

    private shareQQZone() {
        //分享到QQ空间
        var shareqqzonestring: string = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + this.container + '&url=' + this.url + '&pics=' + this.imgUrl;
        window.open(shareqqzonestring, 'newwindow3', 'height=400,width=400,top=100,left=100');
	}
}