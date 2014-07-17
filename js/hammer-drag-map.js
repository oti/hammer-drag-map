// 必要な値たち
var map = {
    size: {
        x: 1113,
        y: 1600,
    },
    start: {
        x: -556,
        y: -800,
    },
    end: {
        x: -556,
        y: -800,
    },
    max: {
        x: 0,
        y: 0,
    },
    min: {
        x: -793,
        y: -1280,
    },
    transition   : "transform .075s ease-in-out",
    extra        : 25,
    bounce       : true,
    restrict     : true,
    restrictClass:{
        top   : "shield__t--restrict",
        right : "shield__r--restrict",
        bottom: "shield__b--restrict",
        left  : "shield__l--restrict",
    },
};

// 処理のかたまり
var dragMap = {
    dom: {
        $map: $("#map"),
        $tp: $(".shield__t"),
        $rt: $(".shield__r"),
        $bt: $(".shield__b"),
        $lt: $(".shield__l"),
    },
    view: {
        setMap: function(){
            // もし背景画像を JS 側で操作したい場合はここに書くといいかも
            dragMap.dom.$map.css({
                "width" : map.size.x,
                "height": map.size.y
            });
        },
        translate: function(_pos, _trans){
            // マップ座標移動
            // 実行場所によって _pos は map.start だったり map.end だったりする

            // console.log(_pos, _translate);

            dragMap.dom.$map.css({
                "transition": _trans,
                "transform" : "translate3d("+ _pos.x +"px, "+ _pos.y +"px, 0)"
            });
        },
        removeRestrict: function(){
            // ドラッグ限界のクラスを消すだけの清掃業者
            dragMap.dom.$tp.removeClass(map.restrictClass.top);
            dragMap.dom.$rt.removeClass(map.restrictClass.right);
            dragMap.dom.$bt.removeClass(map.restrictClass.bottom);
            dragMap.dom.$lt.removeClass(map.restrictClass.left);
        }
    },
    ctrl: {
        dragEventsOn: function(){
            // 対象要素に hammer.js を適応
            dragMap.dom.$map.hammer().on({
                "scroll"   : dragMap.ctrl.preventEv,
                "touchmove": dragMap.ctrl.preventEv,
                "dragstart": dragMap.ctrl.dragStart,
                "drag"     : dragMap.ctrl.dragging,
                "dragend"  : dragMap.ctrl.dragEnd,
            });
        },
        preventEv: function(ev){
            // .drag を触ってる間は画面をスクロールさせない
            ev.preventDefault();
        },
        dragStart: function(ev){
            // ドラッグ開始時に .drag 内のイベントを発火させない
            ev.preventDefault();
            dragMap.view.translate(map.start, "none");
        },
        dragging: function(ev){
            // ぐりぐり動かす時に初期化
            map.start.x = map.end.x;
            map.start.y = map.end.y;

            // ドラッグした分を取得
            map.start.x += parseInt(ev.gesture.deltaX);
            map.start.y += parseInt(ev.gesture.deltaY);

            // ドラッグ中の座標チェック（ドラッグした方向の正負なので注意）
            // console.log(map.start.x, map.start.y);

            if(map.restrict){
                dragMap.ctrl.restrict(map);
            }

            // グリグリしてる時は transition なし
            dragMap.view.translate(map.start, "none");
        },
        dragEnd: function(ev){
            // 動かし終わった時の値を取っておく
            map.end.x = map.start.x;
            map.end.y = map.start.y;
            // console.log(map.end);

            // ドラッグ制限をかけていたら、ドラッグ終了時にリミットのクラスを消す
            if(map.restrict){
                dragMap.view.removeRestrict();
            }

            // オーバードラッグを戻す
            if(map.bounce){
                dragMap.ctrl.bounce(map);
            }

            // transition つきで再配置
            dragMap.view.translate(map.end, map.transition);
        },
        bounce: function(map){
            // オーバードラッグからの復帰
            // オーバードラッグの大きさは map.extra で指定

            // 上側
            if(map.end.y > map.max.y){
                map.end.y = map.max.y;
            }

            // 右側
            if(map.end.x < map.min.x){
                map.end.x = map.min.x;
            }

            // 下側
            if(map.end.y < map.min.y){
                map.end.y = map.min.y;
            }

            // 左側
            if(map.end.x > map.max.x){
                map.end.x = map.max.x;
            }
        },
        restrict: function(map){
            // ドラッグ量の制限
            // bounce が true だった時、extra 分のオーバードラッグを許容する

            // 上側
            if(map.start.y > map.max.y + map.extra){
                map.start.y = map.max.y + map.extra;
                dragMap.dom.$tp.addClass(map.restrictClass.top);
            } else {
                dragMap.dom.$tp.removeClass(map.restrictClass.top);
            }

            // 右側
            if(map.start.x < map.min.x - map.extra){
                map.start.x = map.min.x - map.extra;
                dragMap.dom.$rt.addClass(map.restrictClass.right);
            } else {
                dragMap.dom.$rt.removeClass(map.restrictClass.right);
            }

            // 下側
            if(map.start.y < map.min.y - map.extra){
                map.start.y = map.min.y - map.extra;
                dragMap.dom.$bt.addClass(map.restrictClass.bottom);
            } else {
                dragMap.dom.$bt.removeClass(map.restrictClass.bottom);
            }

            // 左側
            if(map.start.x > map.max.x + map.extra){
                map.start.x = map.max.x + map.extra;
                dragMap.dom.$lt.addClass(map.restrictClass.left);
            } else {
                dragMap.dom.$lt.removeClass(map.restrictClass.left);
            }
        },
        init: function(){
            // マップのサイズを設定
            dragMap.view.setMap();

            // マップの初期座標を設定
            dragMap.view.translate(map.start, "none");

            // マップに Hammer.js のドラッグイベントをはる
            dragMap.ctrl.dragEventsOn();
        }
    }
};

$(function(){
    dragMap.ctrl.init();
});
