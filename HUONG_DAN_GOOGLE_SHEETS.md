# Hướng dẫn thiết lập Google Sheets để lưu kết quả khảo sát

## Bước 1: Tạo Google Apps Script

1. Mở Google Sheets của bạn: https://docs.google.com/spreadsheets/d/103cIS2YJnEPo_VAZ0IgJj0U3NzJNPAEyHCE2YKItU60/edit

2. Vào menu **Extensions** → **Apps Script**

3. Xóa code mặc định và dán code sau vào:

```javascript
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
```

4. Lưu lại (Ctrl+S hoặc Cmd+S) và đặt tên project, ví dụ: "Quiz Data Logger"

## Bước 2: Tạo Header cho Google Sheets

1. Quay lại Google Sheets
2. Ở hàng đầu tiên, thêm các tiêu đề cột:
   - A1: Thời gian
   - B1: Element
   - C1: Lựa chọn 2
   - D1: Lựa chọn 3
   - E1: Concept Title

## Bước 3: Deploy Web App

1. Trong Apps Script editor, click **Deploy** → **New deployment**
2. Click biểu tượng bánh răng ⚙️ bên cạnh "Select type" → chọn **Web app**
3. Điền thông tin:
   - **Description**: "API để nhận dữ liệu quiz"
   - **Execute as**: Me (email của bạn)
   - **Who has access**: Anyone (bất kỳ ai cũng có thể truy cập)
4. Click **Deploy**
5. Copy **Web App URL** (sẽ có dạng: `https://script.google.com/macros/s/...`)
6. Dán URL này vào file `script.js` ở dòng có biến `GOOGLE_SHEETS_WEB_APP_URL`

## Bước 4: Cấp quyền

1. Khi deploy lần đầu, Google sẽ yêu cầu cấp quyền
2. Click **Review Permissions**
3. Chọn tài khoản Google của bạn
4. Click **Advanced** → **Go to [Project Name] (unsafe)**
5. Click **Allow** để cấp quyền truy cập Google Sheets

## Lưu ý quan trọng:

- Mỗi lần chỉnh sửa code trong Apps Script, bạn cần **Deploy lại** (chọn version mới hoặc update version hiện tại)
- Web App URL sẽ không thay đổi sau khi deploy
- Dữ liệu sẽ tự động được ghi vào Google Sheets khi người dùng hoàn thành quiz

