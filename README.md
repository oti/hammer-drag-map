# hammer-drag-map

draggable map(element) with jquery.hammer.js

hammer-drag-map.jsは要素内にドラッグできる地図などを作成するJSです。

## 必要ライブラリ

+ jQuery v1.11.0 or v2.1.3
+ [jquery.hammer-full.js](https://github.com/EightMedia/jquery.hammer.js/blob/master/jquery.hammer-full.js)

## HTML

<pre><code>&lt;!doctype html&gt;
&lt;html lang="ja"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width"&gt;

&lt;title&gt;Hammer Drag Map&lt;/title&gt;

&lt;link rel="stylesheet" href="css/hammer-drag-map.css" media="screen"&gt;

&lt;script src="js/lib/jquery-2.1.2.min.js"&gt;&lt;/script&gt;
&lt;script src="js/lib/jquery.hammer-full.min.js"&gt;&lt;/script&gt;
&lt;script src="js/hammer-drag-map.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="hammer-drag-map"&gt;
    &lt;div class="dragmap"&gt;
        &lt;!-- some map icon elements --&gt;
    &lt;/div&gt;
    &lt;div class="shield __t"&gt;&lt;/div&gt;
    &lt;div class="shield __r"&gt;&lt;/div&gt;
    &lt;div class="shield __b"&gt;&lt;/div&gt;
    &lt;div class="shield __l"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    var myMap = {
        size: {
            w: 1113
        }
    };

    $("#hammer-drag-map").hdm(myMap);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

## HTMLの補足

<pre><code>&lt;div id="hammer-drag-map"&gt;               // 包含要素です。地図がこの内部に置かれます。
    &lt;div class="dragmap"&gt;                // 地図画像が背景として差し込まれます。ドラッグイベントを貼る要素です。
        &lt;!-- some map icon elements --&gt;  // もし地図内にランドマークやその他の要素を置きたい時は .dragmap 内に書きます。
    &lt;/div&gt;
    &lt;div class="shield __t"&gt;&lt;/div&gt; // .shieldは画面の上下左右の端にできる「触れない壁」となります。
    &lt;div class="shield __r"&gt;&lt;/div&gt; // 地図の端でドラッグできないようにするためのものです。
    &lt;div class="shield __b"&gt;&lt;/div&gt; // サイズはCSSで変更できます。
    &lt;div class="shield __l"&gt;&lt;/div&gt; // 地図がドラッグ限界に達した時にグラデーションを出す要素でもあります。
&lt;/div&gt;</code></pre>

## 実行

```
$("#hammer-drag-map").hdm();
```
`.dragmap`と`.shield`を包含する要素に対して`.hdm()`を実行します。

## オプション

オブジェクトで渡して実行します。フルセットの形式は以下です。

```
var myOption = {
    crop: {
        w: 320,
        h: 320
    },
    size: {
        x: 1600,
        y: 1600
    },
    start: {
        x: -800,
        y: -800
    },
    max: {
        x: 0,
        y: 0
    },
    min: {
        x: -1280,
        y: -1280
    },
    transition   : "transform .075s ease-in-out",
    extra        : 25,
    bounce       : true,
    restrict     : true,
    restrictName : "_restrict",
    dragmapName: "dragmap",
    shieldName: {
        top   : "__t",
        right : "__r",
        bottom: "__b",
        left  : "__l"
    }
};

$("#hammer-drag-map").hdm(myOption);
```

## オプションの詳細

<table>
    <tr>
        <th>key</th>
        <th>key2</th>
        <th>description(type)</th>
        <th>default</th>
    </tr>
    <tr>
        <th rowspan="2">crop</th>
        <th>w</th>
        <td>クロップエリアの幅px（int）</td>
        <td>320</td>
    </tr>
    <tr>
        <th>h</th>
        <td>クロップエリアの高さpx（int）</td>
        <td>320</td>
    </tr>
    <tr>
        <th rowspan="2">size</th>
        <th>w</th>
        <td>地図の幅px（int）</td>
        <td>1600</td>
    </tr>
    <tr>
        <th>h</th>
        <td>地図の高さpx（int）</td>
        <td>1600</td>
    </tr>
    <tr>
        <th rowspan="2">start</th>
        <th>x</th>
        <td>初期表示時にtranslateさせておくx座標値（int）</td>
        <td>-800(center of size.x)</td>
    </tr>
    <tr>
        <th>y</th>
        <td>初期表示時にtranslateさせておくy座標値（int）</td>
        <td>-800(center of size.y)</td>
    </tr>
    <tr>
        <th rowspan="2">max</th>
        <th>x</th>
        <td>ドラッグさせたい範囲の左上側のtranslateさせるx座標値（int）</td>
        <td>0</td>
    </tr>
    <tr>
        <th>y</th>
        <td>ドラッグさせたい範囲の左上側のtranslateさせるy座標値（int）</td>
        <td>0</td>
    </tr>
    <tr>
        <th rowspan="2">min</th>
        <th>x</th>
        <td>ドラッグさせたい範囲の右下側のtranslateさせるx座標値（int）</td>
        <td>-1280(size.x - crop.x)</td>
    </tr>
    <tr>
        <th>y</th>
        <td>ドラッグさせたい範囲の右下側のtranslateさせるy座標値（int）</td>
        <td>-1280(size.y - crop.y)</td>
    </tr>
    <tr>
        <th colspan="2">transition</th>
        <td>transitionプロパティの値（string）</td>
        <td>"transform .075s ease-in-out"</td>
    </tr>
    <tr>
        <th colspan="2">extra</th>
        <td>オーバードラッグさせるpx数（int）</td>
        <td>25</td>
    </tr>
    <tr>
        <th colspan="2">bounce</th>
        <td>extraが1以上でオーバーラップさせた時にドラッグを自動で戻すかどうか（boolean）</td>
        <td>true</td>
    </tr>
    <tr>
        <th colspan="2">restrict</th>
        <td>設定した限界までドラッグした時に.shieldに専用クラスを付与するか（boolean）</td>
        <td>true</td>
    </tr>
    <tr>
        <th colspan="2">restrictName</th>
        <td>限界ドラッグ時に.shieldに付与するクラス名（string）</td>
        <td>"_restrict"</td>
    </tr>
    <tr>
        <th colspan="2">dragmapName</th>
        <td>ドラッグできる地図を作る要素のクラス名（string）</td>
        <td>"dragmap"</td>
    </tr>
    <tr>
        <th rowspan="4">shieldName</th>
        <th>top</th>
        <td>地図の上辺の触れない部分の要素のクラス名（string）</td>
        <td>"__t"</td>
    </tr>
    <tr>
        <th>right</th>
        <td>地図の右辺の触れない部分の要素のクラス名（string）</td>
        <td>"__r"</td>
    </tr>
    <tr>
        <th>bottom</th>
        <td>地図の下辺の触れない部分の要素のクラス名（string）</td>
        <td>"__b"</td>
    </tr>
    <tr>
        <th>left</th>
        <td>地図の左辺の触れない部分の要素のクラス名（string）</td>
        <td>"__l"</td>
    </tr>
</table>

## 応用

### ドラッグ範囲の制限

hammer-drag-map.jsではある程度の大きさの地図（要素）の一部分にドラッグ範囲を制限することができます。

例えば、800*1200pxの`.dragmap`に対して横200pxと縦100pxの位置から横600pxと縦1100pxの範囲までしかドラッグさせたくない場合、以下のようにオプションオブジェクトを作って渡します。

```
var myOption = {
    size: {
        w: 800,
        h: 1200
    },
    max:{
        x: -200,
        y: -100
    },
    min:{
        x: -600,
        y: -1100
    }
};

$("#hammer-drag-map").hdm(myOption);
```

`max{}`と`min{}`に指定する座標はtranslateさせる値なので負の値になることに注意してください。

また、ドラッグ範囲を偏った座標に制限する場合は、初期表示位置の設定に注意してください。

### 初期表示位置の変更

デフォルトでは地図（要素）の中心座標が初期表示位置となるように設定されていますが、これも変更することができます。

```
var myOption = {
    size: {
        w: 800,
        h: 1200
    },
    start: {
   		x: 0,
   		y: 0
    }
};

$("#hammer-drag-map").hdm(myOption);
```

`start{}`にtranslateさせる値を渡します。上記の場合、地図の左上を表示した状態になります。

### 複数の要素にhammer-drag-map.jsを適用する

違うセレクタでHTML構造を作り、個別に`.hdm()`してください。

<pre><code>&lt;div id="hammer-drag-map"&gt;
    &lt;div class="dragmap"&gt;
        &lt;!-- some map icon elements --&gt;
    &lt;/div&gt;
    &lt;div class="shield __t"&gt;&lt;/div&gt;
    &lt;div class="shield __r"&gt;&lt;/div&gt;
    &lt;div class="shield __b"&gt;&lt;/div&gt;
    &lt;div class="shield __l"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div id="anotherMap"&gt;
    &lt;div class="dragmap"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    var myMap = {
        size: {
            w: 1113
        }
    };

    var anotherOpt = {
        crop: {
            w: 200,
            y: 200
        },
        size: {
            w: 800,
            h: 800
        }
    };

    $("#hammer-drag-map").hdm(myMap);
    $("#anotherMap").hdm(anotherOpt);
&lt;/script&gt;</code></pre>

## ライセンス

MITライセンスにて公開します。