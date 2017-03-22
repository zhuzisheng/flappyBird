class App {
    public static stageWidth: number = 288;
    public static stageHeight: number = 512;
    public static bgSpeedNormalOffset: number = 2;
    public static bgSpeedUpOffset: number = 4;
    public static bgOffset: number = App.bgSpeedNormalOffset;
    public static isSpeedUp: boolean = false;
	public static birdVelocity: number = 0;//当前速度 px/f
	public static birdAcceleration: number = 0.5;//加速度 px/f^2
	public static birdTouchV: number = -8;//点击加速度
	public static isCheat: boolean = false;//是否作弊
	public static testFlag: boolean = false;

	public constructor() {

	}

	public static get commons(): Commons {
		return Commons.getInstance();
	}
}
class GameStatue {
	public static GAME_END: number = 0;
	public static GAME_START: number = 1;
	public static GAME_PAUSE: number = 2;
}