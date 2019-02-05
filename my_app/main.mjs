/* global Y, axios */

/**
 * 検索結果
 * @typedef {Object} Feature
 * @property {string} Id 住所ID
 * @property {string} Gid グループID
 * @property {string} Name 地域・拠点情報名
 * @property {string} Description
 * @property {Geometry} Geometry
 * @property {Property} Property
 */

/**
 * 拠点の場所を表す要素
 * @typedef {Object} Geometry
 * @property {string} Type 図形種別
 * @property {string} Coordinates 座標情報
 */

/**
 * Yahoo!ジオコーダAPIを使って該当住所の位置情報を検索する
 * @param {string} query 検索したい住所のクエリ文字列
 * @return {Feature[]} 位置情報の一覧
 */
async function requestGeoCoderAPI(query) {
  const response = await axios({
    url: 'https://tiger53990-eval-test.apigee.net/yahoo_map/geocode/V1/geoCoder',
    params: {
      query,
      output: 'json',
    },
  });
  console.log("天気予報です")
  const { data } = response;
  // APIから受け取った内容をコンソールに表示
  console.log(JSON.stringify(data, undefined, 2));
  return data.ResultInfo.Count > 0 ? data.Feature : [];
}
var text2code={"稚内": "011000", "旭川": "012010", "留萌": "012020", "網走": "013010", "北見": "013020", "紋別": "013030",
"根室": "014010", "釧路": "014020", "帯広": "014030", "室蘭": "015010", "浦河": "015020", "札幌": "016010",
"岩見沢": "016020", "倶知安": "016030", "函館": "017010", "江差": "017020", "青森": "020010", "むつ": "020020",
"八戸": "020030", "盛岡": "030010", "宮古": "030020", "大船渡": "030030", "仙台": "040010", "白石": "040020",
"秋田": "050010", "横手": "050020", "山形": "060010", "米沢": "060020", "酒田": "060030", "新庄": "060040",
"福島": "070010", "小名浜": "070020", "若松": "070030", "水戸": "080010", "土浦": "080020", "宇都宮": "090010",
"大田原": "090020", "前橋": "100010", "みなかみ": "100020", "さいたま": "110010", "熊谷": "110020", "秩父": "110030",
"千葉": "120010", "銚子": "120020", "館山": "120030", "東京": "130010", "大島": "130020", "八丈島": "130030",
"父島": "130040", "横浜": "140010", "小田原": "140020", "新潟": "150010", "長岡": "150020", "高田": "150030",
"相川": "150040", "富山": "160010", "伏木": "160020", "金沢": "170010", "輪島": "170020", "福井": "180010",
"敦賀": "180020", "甲府": "190010", "河口湖": "190020", "長野": "200010", "松本": "200020", "飯田": "200030",
"岐阜": "210010", "高山": "210020", "静岡": "220010", "網代": "220020", "三島": "220030", "浜松": "220040",
"名古屋": "230010", "豊橋": "230020", "津": "240010", "尾鷲": "240020", "大津": "250010", "彦根": "250020",
"京都": "260010", "舞鶴": "260020", '大阪': "270000", "神戸": "280010", "豊岡": "280020", "奈良": "290010",
"風屋": "290020", "和歌山": "300010", "潮岬": "300020", "鳥取": "310010", "米子": "310020", "松江": "320010",
"浜田": "320020", "西郷": "320030", "岡山": "330010", "津山": "330020", "広島": "340010", "庄原": "340020",
"下関": "350010", "山口": "350020", "柳井": "350030", "萩": "350040", "徳島": "360010", "日和佐": "360020",
"高松": "370000", "松山": "380010", "新居浜": "380020", "宇和島": "380030", "高知": "390010", "室戸岬": "390020",
"清水": "390030", "福岡": "400010", "八幡": "400020", "飯塚": "400030", "久留米": "400040", "佐賀": "410010",
"伊万里": "410020", "長崎": "420010", "佐世保": "420020", "厳原": "420030", "福江": "420040", "熊本": "430010",
"阿蘇乙姫": "430020", "牛深": "430030", "人吉": "430040", "大分": "440010", "中津": "440020", "日田": "440030",
"佐伯": "440040", "宮崎": "450010", "延岡": "450020", "都城": "450030", "高千穂": "450040", "鹿児島": "460010",
"鹿屋": "460020", "種子島": "460030", "名瀬": "460040", "那覇": "471010", "名護": "471020", "久米島": "471030",
"南大東": "472000", "宮古島": "473000", "石垣島": "474010", "与那国島": "474020"}
/**
 * マップの中心を指定した位置情報に移動する
 * @param {YMap} map 表示するマップのインスタンス
 * @param {object} options 位置情報(lat, lng)を含んだパラメータ
 */
function drawMap(map, options) {
  const zoomLevel = 10;
  map.drawMap(new Y.LatLng(options.lat, options.lng), zoomLevel, Y.LayerSetId.NORMAL);
}

/**
 * ジオコーダAPIの検索結果のCoordinatesの文字列をパースして数値に変換する
 * @param {string} str 緯度経度を表す文字列
 * @return {object} 緯度(lat)経度(lng)
 */
function parseCoordinates(str) {
  // 入力Coordinatesは"経度,緯度"のフォーマットで来る
  const [lng, lat] = str.trim().split(',');
  return { lng: Number(lng), lat: Number(lat) };
}

/**
 * プログラムのエントリーポイント
 * この関数が最初に実行される
 */
async function main() {
  // 地図を初期化
  const map = new Y.Map('map');
  map.setConfigure('weatherOverlay', true);
  drawMap(map, { lat: 35.68227528, lng: 139.73310240 });
  // コントロールの追加
  const sliderZoomControl = new Y.SliderZoomControlVertical();
  map.addControl(sliderZoomControl);
  // 「検索する」ボタンを押したときのアクションを設定する
  document.getElementById('form').onsubmit = () => {
    /** @type {string} テキストボックスの入力内容 */
    const query = document.getElementById('query').value;
    // ジオコーダAPIの検索結果を反映させる
    (async () => {
      const geoFeatures = await requestGeoCoderAPI(query);
      const resultText = document.getElementById('result-text');
      if (geoFeatures.length > 0) {
        const [first] = geoFeatures;
        const lct = parseCoordinates(first.Geometry.Coordinates);
        const weather_url = "http://weather.livedoor.com/forecast/webservice/json/v1?city="+text2code[query];
        //const res = await axios.get(url);
        //const items = res."forecasts";
        resultText.textContent = `${first.Name}の天気は${weather_url}です`;
        // 地図を移動してラベル追加
        drawMap(map, lct);
        const label = new Y.Label(new Y.LatLng(lct.lat, lct.lng),`場所: ${first.Name}\n緯度: ${lct.lat}\n経度: ${lct.lng} `);
        map.addFeature(label);
        var marker = new Y.Marker(new Y.LatLng(lct.lat, lct.lng));
        map.addFeature(marker);

      } else {
        resultText.textContent = '正しい住所を入力してください';
      }
    })();
    // 戻り値をfalseにして、formのsubmitが常に成功しないようにする
    return false;
  };
}

main();
