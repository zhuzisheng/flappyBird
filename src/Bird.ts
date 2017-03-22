class Bird extends egret.DisplayObjectContainer {

	private bird: egret.Bitmap;

	public constructor() {
		super();
		this.creatBird();
	}

	private creatBird() {
		var bird = App.commons.getBitmap("bird0_0_png",App.stageWidth / 2,(App.stageHeight - 112) / 2);
		this.bird = bird;
		this.addChild(bird);
	}

	public init() {
		this.bird.x = App.stageWidth / 2;
		this.bird.y = (App.stageHeight - 112) / 2;
		App.birdVelocity = 0;
	}

	public Update() {
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
	}

	public fuckflying() {
		if (this.bird.y >= 0) {
			App.birdVelocity = App.birdTouchV;
		}
	}

    public getBirdPos(): Array<number> {
        return [this.bird.x, this.bird.y];
    }

    public getBirdOffset(): number {
        return this.bird.width / 4;
    }
}