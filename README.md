# hammer-drag-map

draggable map(element) with jquery.hammer.js

hammer-drag-map.jsは要素内にドラッグできる地図などを作成するJSです。

## 必要ライブラリ

+ jQuery v1.11.0 or v2.1.0
+ hammer.js
+ jquery.hammer.js

hammer.jsとjquery.hammer.jsが１つになった[jquery.hammer-full.js](https://github.com/EightMedia/jquery.hammer.js/blob/master/jquery.hammer-full.js)を使ってもいいです。

## HTML

```
<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">

<title>Hammer Drag Map</title>

<link rel="stylesheet" href="css/hammer-drag-map.css" media="screen">

<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery.hammer-full.min.js"></script>
</head>
<body>

<div class="hammer-drag-map">
    <div class="drag">
        <!-- some map icon elements -->
    </div>
    <div class="shield shield__t"></div>
    <div class="shield shield__r"></div>
    <div class="shield shield__b"></div>
    <div class="shield shield__l"></div>
</div>

<script src="js/hammer-drag-map.js"></script>
</body>
</html>
```

jqueryとjquery.hammer-full.jsを``<head>``内、実装スクリプトのhammer-drag-map.jsを``</body>``直前に置いてください。


```
<div class="hammer-drag-map">             // 包含要素です。地図がこの内部に置かれます。
    <div class="drag">                    // 地図画像が背景として差し込まれます。ドラッグイベントを貼る要素です。
        <!-- some map icon elements -->   // もし地図内にランドマークやその他の要素を置きたい時は .drag 内に書きます。
    </div>
    <div class="shield shield__t"></div>  // .shieldは画面の上下左右の端にできる「触れない壁」となります。
    <div class="shield shield__r"></div>  // 地図の端でドラッグできないようにするためのものです。
    <div class="shield shield__b"></div>  // サイズはCSSで変更できます。
    <div class="shield shield__l"></div>  // 地図がドラッグ限界に達した時にグラデーションを出す要素でもあります。
</div>
```
