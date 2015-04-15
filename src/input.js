
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
