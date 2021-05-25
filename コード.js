/**
 * SSにメニューを表示
 */
function onOpen() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const myMenu = [
    { name: 'サイドバーを表示', functionName: 'openSidebar' }
  ];
  ss.addMenu('調理', myMenu); //メニューを追加
}
function openSidebar() {
  const htmlOutput = HtmlService.createTemplateFromFile('index').evaluate().setTitle('快適');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

/**
 * 全てのオーダーを返す
 */
function getOrders() {
  const [ header,...order] = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange().getValues();
  return JSON.stringify(order);
}

function cooking(json) {
  const { i, cookingTime, material} = JSON.parse(json);
  Utilities.sleep(cookingTime);//調理中....

  const ramen = material +'ラーメン';
  const row = i*1 +2;
  const column = 3;
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, column).setValue(ramen);//シートに反映
  return ramen;
}