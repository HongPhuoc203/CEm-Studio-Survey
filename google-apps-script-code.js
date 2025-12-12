// Copy toàn bộ code này vào Google Apps Script
// File → New → Script editor trong Google Sheets

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dữ liệu từ POST request
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // Nếu không parse được JSON, thử lấy từ parameters
      data = {
        element: e.parameter.element || '',
        choice2: e.parameter.choice2 || '',
        choice3: e.parameter.choice3 || '',
        conceptTitle: e.parameter.conceptTitle || ''
      };
    }
    
    // Lấy thông tin từ dữ liệu
    const timestamp = new Date();
    const element = data.element || '';
    const choice2 = data.choice2 || '';
    const choice3 = data.choice3 || '';
    const conceptTitle = data.conceptTitle || '';
    
    // Ghi dữ liệu vào sheet
    // Cột: Thời gian | Element | Lựa chọn 2 | Lựa chọn 3 | Concept Title
    sheet.appendRow([
      timestamp,
      element,
      choice2,
      choice3,
      conceptTitle
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Dữ liệu đã được lưu thành công'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets API đang hoạt động").setMimeType(ContentService.MimeType.TEXT);
}

