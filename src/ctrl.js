
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
