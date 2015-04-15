(function($) {
    $.fn.hdm = function(options){
        var defaults = {
            crop: {
                w: 320,
                h: 320
            },
            size: {
                w: 1113,
                h: 1600
            },
            start: {
                x: -556,
                y: -800
            },
            end: {
                x: -556,
                y: -800
            },
            max: {
                x: 0,
                y: 0
            },
            min: {
                x: -793,
                y: -1280
            },
            transition   : "transform .075s ease-in-out",
            extra        : 25,
            bounce       : true,
            restrict     : true,
            restrictName : "__restrict",
            dragmapName: "dragmap",
            shieldName: {
                top   : "_t",
                right : "_r",
                bottom: "_b",
                left  : "_l"
            }
        };

        var map = $.extend(true, {}, defaults, options);

        var _this = $(this);

        var _dragmap = _this.find("." + map.dragmapName);

        var shield = {
            $tp:  _this.find("." + map.shieldName.top),
            $rt:  _this.find("." + map.shieldName.right),
            $bt:  _this.find("." + map.shieldName.bottom),
            $lt:  _this.find("." + map.shieldName.left)
        };


        var restrictClass = {
            top: map.restrictName,
            right: map.restrictName,
            bottom: map.restrictName,
            left: map.restrictName,
        };

        var view = {
            setMap: function(){
                // クロップエリアのサイズ指定
                _this.css({
                    "width" : map.crop.w,
                    "height": map.crop.h
                });

                // 地図のサイズ指定
                _dragmap.css({
                    "width" : map.size.w,
                    "height": map.size.h
                });
            },
            translate: function(_pos, _trans){
                // マップ座標移動
                // 実行場所によって _pos は map.start だったり map.end だったりする
                // console.log(_pos, _translate);

                _dragmap.css({
                    "transition": _trans,
                    "transform" : "translate3d("+ _pos.x +"px, "+ _pos.y +"px, 0)"
                });
            },
            removeRestrict: function(){
                // ドラッグ限界のクラスを消すだけの清掃業者
                shield.$tp.removeClass(restrictClass.top);
                shield.$rt.removeClass(restrictClass.right);
                shield.$bt.removeClass(restrictClass.bottom);
                shield.$lt.removeClass(restrictClass.left);
            }
        };

        var ctrl = {
            dragEventsOn: function(){
                // 対象要素に hammer.js を適応
                _dragmap.hammer().on({
                    "scroll"   : ctrl.preventEv,
                    "touchmove": ctrl.preventEv,
                    "dragstart": ctrl.dragStart,
                    "drag"     : ctrl.dragging,
                    "dragend"  : ctrl.dragEnd
                });
            },
            preventEv: function(ev){
                // .drag を触ってる間は画面をスクロールさせない
                ev.preventDefault();
            },
            dragStart: function(ev){
                // ドラッグ開始時に .drag 内のイベントを発火させない
                ev.preventDefault();
                view.translate(map.start, "none");
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
                    ctrl.restrict(map);
                }

                // グリグリしてる時は transition なし
                view.translate(map.start, "none");
            },
            dragEnd: function(ev){
                // 動かし終わった時の値を取っておく
                map.end.x = map.start.x;
                map.end.y = map.start.y;
                // console.log(map.end);

                // ドラッグ制限をかけていたら、ドラッグ終了時にリミットのクラスを消す
                if(map.restrict){
                    view.removeRestrict();
                }

                // オーバードラッグを戻す
                if(map.bounce){
                    ctrl.bounce(map);
                }

                // transition つきで再配置
                view.translate(map.end, map.transition);
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
                    shield.$tp.addClass(restrictClass.top);
                } else {
                    shield.$tp.removeClass(restrictClass.top);
                }

                // 右側
                if(map.start.x < map.min.x - map.extra){
                    map.start.x = map.min.x - map.extra;
                    shield.$rt.addClass(restrictClass.right);
                } else {
                    shield.$rt.removeClass(restrictClass.right);
                }

                // 下側
                if(map.start.y < map.min.y - map.extra){
                    map.start.y = map.min.y - map.extra;
                    shield.$bt.addClass(restrictClass.bottom);
                } else {
                    shield.$bt.removeClass(restrictClass.bottom);
                }

                // 左側
                if(map.start.x > map.max.x + map.extra){
                    map.start.x = map.max.x + map.extra;
                    shield.$lt.addClass(restrictClass.left);
                } else {
                    shield.$lt.removeClass(restrictClass.left);
                }
            },
            init: function(){
                // マップのサイズを設定
                view.setMap();

                // マップの初期座標を設定
                view.translate(map.start, "none");

                // マップに Hammer.js のドラッグイベントをはる
                ctrl.dragEventsOn();
            }
        };

        // 実行！
        ctrl.init();
        return _this;
    };
})(jQuery);