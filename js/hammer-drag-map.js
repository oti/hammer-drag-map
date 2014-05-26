// UA判定
var _ua = (function(){
    return {
        Gecko:'MozAppearance' in document.documentElement.style,
        Presto:window.opera,
        Blink:window.chrome,
        Webkit:typeof window.chrome == "undefined" && 'WebkitAppearance' in document.documentElement.style
    }
})();

var TRANSITION_PROP = '';
var TRANSITION_VAL = '';
var TRANSFORM_PROP = '';

if(_ua.Gecko){
    TRANSITION_PROP = '-moz-transition';
    TRANSITION_VAL  = '-moz-transform .075s ease-in-out';
    TRANSFORM_PROP  = '-moz-transform';
} else if(_ua.Presto){
    TRANSITION_PROP = '-o-transition';
    TRANSITION_VAL  = '-o-transform .075s ease-in-out';
    TRANSFORM_PROP  = '-o-transform';
} else if(_ua.Webkit || _ua.Blink){
    TRANSITION_PROP = '-webkit-transition';
    TRANSITION_VAL  = '-webkit-transform .075s ease-in-out';
    TRANSFORM_PROP  = '-webkit-transform';
} else {
    TRANSITION_PROP = 'transition';
    TRANSITION_VAL  = 'transform .075s ease-in-out';
    TRANSFORM_PROP  = 'transform';
}

// 必要な値たち
var drag = {
    'mapSize': {
        'x': 1113,
        'y': 1600
    },
    'start': {
        'x': -556,
        'y': -800
    },
    'end': {
        'x': -556,
        'y': -800
    },
    'max': {
        'x': 0,
        'y': 0
    },
    'min': {
        'x': -793,
        'y': -1280
    },
    'rate': 1,
    'extra': 25,
    'restrict': true,
    'bounce': true,
};

// 処理のかたまり
var dragMap = {
    // 必要要素
    'dom': {
        $drag: $('.drag'),
        $tp: $('.shield__t'),
        $rt: $('.shield__r'),
        $bt: $('.shield__b'),
        $lt: $('.shield__l'),
    },

    // 表示系
    'view': {
        'setMap': function(){
            // もし背景画像を JS 側で操作したい場合はここに書くといいかも
            dragMap.dom.$drag.css({
                'width' : drag.mapSize.x,
                'height': drag.mapSize.y
            });
        },
        // マップ座標移動
        'translate': function(_pos, _transitions){
            // 実行場所によって _pos は drag.start だったり drag.end だったりする

            var _translate = {};
                _translate[TRANSITION_PROP] = _transitions;
                _translate[TRANSFORM_PROP]  = 'translate3d('+ _pos.x*drag.rate +'px, '+ _pos.y*drag.rate +'px, 0)';

            // console.log(_translate);
            // console.log(_pos);

            dragMap.dom.$drag.css(_translate);
        },
        'removeRestrict': function(){
            // ドラッグ限界のクラスを消すだけの清掃業者
            dragMap.dom.$tp.removeClass('shield__t--restrict');
            dragMap.dom.$rt.removeClass('shield__r--restrict');
            dragMap.dom.$bt.removeClass('shield__b--restrict');
            dragMap.dom.$lt.removeClass('shield__l--restrict');
        }
    },

    'ctrl': {
        'dragEventsOn': function(){
            // 対象要素に hammer.js を適応
            dragMap.dom.$drag.hammer().on({
                'scroll'   : dragMap.ctrl.preventEv,
                'touchmove': dragMap.ctrl.preventEv,
                'dragstart': dragMap.ctrl.dragStart,
                'drag'     : dragMap.ctrl.dragging,
                'dragend'  : dragMap.ctrl.dragEnd
            });
        },
        'preventEv': function(ev){
            // .drag を触ってる間は画面をスクロールさせない
            ev.preventDefault();
        },
        'dragStart': function(ev){
            // ドラッグ開始時に .drag 内のイベントを発火させない
            ev.preventDefault();
            dragMap.view.translate(drag.start, 'none');
        },
        'dragging': function(ev){
            // ぐりぐり動かす時に初期化
            drag.start.x = drag.end.x;
            drag.start.y = drag.end.y;

            // ドラッグした分を取得
            drag.start.x += parseInt(ev.gesture.deltaX);
            drag.start.y += parseInt(ev.gesture.deltaY);

            // ドラッグ中の座標チェック（ドラッグした方向の正負なので注意）
            // console.log(drag.start.x, drag.start.y);

            if(drag.restrict){
                dragMap.ctrl.restrict(drag);
            }

            // グリグリしてる時は transition なし
            dragMap.view.translate(drag.start, 'none');
        },
        'dragEnd': function(ev){
            // 動かし終わった時の値を取っておく
            drag.end.x = drag.start.x;
            drag.end.y = drag.start.y;
            // console.log(drag.end);

            // ドラッグ制限をかけていたら、ドラッグ終了時にリミットのクラスを消す
            if(drag.restrict){
                dragMap.view.removeRestrict();
            }

            // オーバードラッグを戻す
            if(drag.bounce){
                dragMap.ctrl.bounce(drag);
            }

            // transition つきで再配置
            dragMap.view.translate(drag.end, TRANSITION_VAL);
        },
        'bounce': function(drag){
            // オーバードラッグからの復帰
            // オーバードラッグの大きさは drag.extra で指定

            // 上側
            if(drag.end.y > drag.max.y){
                drag.end.y = drag.max.y;
            }

            // 右側
            if(drag.end.x < drag.min.x){
                drag.end.x = drag.min.x;
            }

            // 下側
            if(drag.end.y < drag.min.y){
                drag.end.y = drag.min.y;
            }

            // 左側
            if(drag.end.x > drag.max.x){
                drag.end.x = drag.max.x;
            }
        },
        'restrict': function(drag){
            // ドラッグ量の制限
            // bounce が true だった時、extra 分のオーバードラッグを許容する

            // 上側
            if(drag.start.y > drag.max.y + drag.extra){
                drag.start.y = drag.max.y + drag.extra;
                dragMap.dom.$tp.addClass('shield__t--restrict');
            } else {
                dragMap.dom.$tp.removeClass('shield__t--restrict');
            }

            // 右側
            if(drag.start.x < drag.min.x - drag.extra){
                drag.start.x = drag.min.x - drag.extra;
                dragMap.dom.$rt.addClass('shield__r--restrict');
            } else {
                dragMap.dom.$rt.removeClass('shield__r--restrict');
            }

            // 下側
            if(drag.start.y < drag.min.y - drag.extra){
                drag.start.y = drag.min.y - drag.extra;
                dragMap.dom.$bt.addClass('shield__b--restrict');
            } else {
                dragMap.dom.$bt.removeClass('shield__b--restrict');
            }

            // 左側
            if(drag.start.x > drag.max.x + drag.extra){
                drag.start.x = drag.max.x + drag.extra;
                dragMap.dom.$lt.addClass('shield__l--restrict');
            } else {
                dragMap.dom.$lt.removeClass('shield__l--restrict');
            }
        },
        'init': function(){
            // マップのサイズを設定
            dragMap.view.setMap();

            // マップの初期座標を設定
            dragMap.view.translate(drag.start, 'none');

            // マップに Hammer.js のドラッグイベントをはる
            dragMap.ctrl.dragEventsOn();
        }
    }
};

$(function(){
    dragMap.ctrl.init();
});