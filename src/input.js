        // デフォルトセッティング
        var defaults = {
            crop: {
                w: 320,
                h: 320
            },
            size: {
                w: 1600,
                h: 1600
            },
            max: {
                x: 0,
                y: 0
            },
            transition   : "transform .075s ease-in-out",
            extra        : 25,
            bounce       : true,
            restrict     : true,
            restrictName : "__restrict",
            dragmapName  : "dragmap",
            shieldName   : {
                top   : "_t",
                right : "_r",
                bottom: "_b",
                left  : "_l"
            }
        };

        // オプションをマージ
        var map = $.extend(true, {}, defaults, options);

        // startがなかったら設定
        if(!map.start){
            map.start = {
                x: parseInt(map.size.w, 10) / -2,
                y: parseInt(map.size.h, 10) / -2
            };
        }

        // endを作る。startと同値でないとドラッグした時に挙動が変
        if(!map.end){
            map.end = {
                x: map.start.x,
                y: map.start.y
            };
        }

        // minがなかったら算出して設定
        if(!map.min){
            map.min = {
                x: (parseInt(map.size.w, 10) - map.crop.w) * -1,
                y: (parseInt(map.size.h, 10) - map.crop.h) * -1
            };
        }

        console.log(map);

        // 自分をとっとく
        var _this = $(this);

        // ドラッグ要素を設定
        var _dragmap = _this.find("." + map.dragmapName);

        // 
        if(map.shieldName){
            var shield = {
                $tp:  _this.find("." + map.shieldName.top),
                $rt:  _this.find("." + map.shieldName.right),
                $bt:  _this.find("." + map.shieldName.bottom),
                $lt:  _this.find("." + map.shieldName.left)
            };
        }
