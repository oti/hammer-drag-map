
        var defaults = {
            size: {
                x: 1113,
                y: 1600
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
            restrictSuffix : "--restrict",
            dragmapName: "dragmap",
            shieldName: {
                top   : "shield__t",
                right : "shield__r",
                bottom: "shield__b",
                left  : "shield__l"
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
            top: map.shieldName.top + map.restrictSuffix,
            right: map.shieldName.right + map.restrictSuffix,
            bottom: map.shieldName.bottom + map.restrictSuffix,
            left: map.shieldName.left + map.restrictSuffix,
        };
