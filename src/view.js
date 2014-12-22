view.setMap = function(){
    // もし背景画像を JS 側で操作したい場合はここに書くといいかも
    dragMap.dom.$map.css({
        "width" : map.size.x,
        "height": map.size.y
    });
};

view.translate = function(_pos, _trans){
    // マップ座標移動
    // 実行場所によって _pos は map.start だったり map.end だったりする

    // console.log(_pos, _translate);

    dragMap.dom.$map.css({
        "transition": _trans,
        "transform" : "translate3d("+ _pos.x +"px, "+ _pos.y +"px, 0)"
    });
};

view.removeRestrict = function(){
    // ドラッグ限界のクラスを消すだけの清掃業者
    dragMap.dom.$tp.removeClass(map.restrictClass.top);
    dragMap.dom.$rt.removeClass(map.restrictClass.right);
    dragMap.dom.$bt.removeClass(map.restrictClass.bottom);
    dragMap.dom.$lt.removeClass(map.restrictClass.left);
};