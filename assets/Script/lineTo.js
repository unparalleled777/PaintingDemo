cc.Class({
    extends: cc.Component,

    properties: {
        graphics:{
            default:null,
            type:cc.Graphics,
        },
        picture:{
            default:null,
            type:cc.Node
        },
        lineWidth: 10
    },

    // use this for initialization
    onLoad: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.WHITE );
        }
        this.picture.on(cc.Node.EventType.TOUCH_START,this.plantingStart,this);
        this.picture.on(cc.Node.EventType.TOUCH_MOVE,this.plantingMove,this);
        this.picture.on(cc.Node.EventType.TOUCH_MOVE,this.plantingEnd,this);
        this.graphicsMoveTo = cc.v2(0, 0);
        // this.graphics = this.getComponent(cc.Graphics);
        this.strokeColor = new cc.Color(248, 93, 9,255);
        this.graphics.strokeColor = this.strokeColor;
        this.graphics.lineWidth = 20;
        // g.fillColor = cc.hexToColor('#f85d09');
        this.graphics.fillColor = this.strokeColor;
        //设置线条的结束端点样式
        this.graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this.graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this.graphics.miterLimit = 1;
        // this.graphics.moveTo(-20, 0);
        // this.graphics.lineTo(0, 500);
        // this.graphics.close();

        // this.graphics.stroke();
        // this.graphics.fill();
    },

    plantingStart:function (event) {
        cc.log('touch start ......');
        var point = event.touch.getLocation();
        this.graphicsMoveTo = this.node.convertToNodeSpaceAR(point);
    },
    plantingMove:function (event) {
        cc.log('touch move ......');
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this.graphics.moveTo(this.graphicsMoveTo.x,this.graphicsMoveTo.y);
        this.graphics.lineTo(point.x,point.y);
        this.graphics.close();
        this.graphics.stroke();
        this.graphics.fill();
    },
    plantingEnd:function (event) {
        cc.log('touch end ......');
        var point = event.touch.getLocation();
        this.graphicsMoveTo = this.node.convertToNodeSpaceAR(point);
    },
    onDisable: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.BLACK );
        }
        this.picture.off(cc.Node.EventType.TOUCH_START,this.plantingStart,this);
        this.picture.off(cc.Node.EventType.TOUCH_MOVE,this.plantingMove,this);
        this.picture.off(cc.Node.EventType.TOUCH_MOVE,this.plantingEnd,this);
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
