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

    var hdm = {};

    hdm.dom = {
        $map: $("#hammer-drag-map"),
        $tp:  $(".shield__t"),
        $rt:  $(".shield__r"),
        $bt:  $(".shield__b"),
        $lt:  $(".shield__l"),
    };