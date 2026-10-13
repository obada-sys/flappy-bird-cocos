
import {
    _decorator,
    Component,
    Node,
    Vec3,
    UITransform,
    Canvas,
    director
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property(Node)
    public ground1: Node = null!;

    @property(Node)
    public ground2: Node = null!;

    @property(Node)
    public ground3: Node = null!;

    public groundWidth1: number = 0;
    public groundWidth2: number = 0;
    public groundWidth3: number = 0;

    public tempStartLocation1 = new Vec3();
    public tempStartLocation2 = new Vec3();
    public tempStartLocation3 = new Vec3();

    @property
    public gameSpeed: number = 200;

    onLoad() {
        this.startUp();
    }

    startUp() {
        this.groundWidth1 =
            this.ground1.getComponent(UITransform)!.width;

        this.groundWidth2 =
            this.ground2.getComponent(UITransform)!.width;

        this.groundWidth3 =
            this.ground3.getComponent(UITransform)!.width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x =
            this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    update(deltaTime: number) {

        this.tempStartLocation1 =
            this.ground1.position.clone();

        this.tempStartLocation2 =
            this.ground2.position.clone();

        this.tempStartLocation3 =
            this.ground3.position.clone();

        this.tempStartLocation1.x -=
            this.gameSpeed * deltaTime;

        this.tempStartLocation2.x -=
            this.gameSpeed * deltaTime;

        this.tempStartLocation3.x -=
            this.gameSpeed * deltaTime;

        const scene = director.getScene();
        if (!scene) return;

        const canvas = scene.getComponentInChildren(Canvas);
        if (!canvas) return;

        const canvasWidth =
            canvas.getComponent(UITransform)!.width;

        if (this.tempStartLocation1.x <= -this.groundWidth1) {
            this.tempStartLocation1.x = canvasWidth;
        }

        if (this.tempStartLocation2.x <= -this.groundWidth2) {
            this.tempStartLocation2.x = canvasWidth;
        }

        if (this.tempStartLocation3.x <= -this.groundWidth3) {
            this.tempStartLocation3.x = canvasWidth;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}
