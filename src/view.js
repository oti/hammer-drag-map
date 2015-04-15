
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
