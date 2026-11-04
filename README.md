# Học Tiếng Trung – ứng dụng desktop

Một màn hình duy nhất với 4 tab: Dữ liệu (chọn cột, sắp xếp ưu tiên nhiều cấp), Học từ, Ôn tập, Đã đánh dấu.

## Chạy thử
1. Cài Node.js (bản LTS): https://nodejs.org
2. Mở terminal trong thư mục này:
   npm install
   npm start

## Đóng gói thành file cài đặt
   npm run build:win     (Windows, tạo file .exe trong thư mục dist)
   npm run build:mac     (chạy trên macOS, tạo .dmg)
   npm run build:linux   (tạo AppImage)

Ứng dụng chạy offline hoàn toàn (đã gồm thư viện đọc Excel và dữ liệu nét bút).
Giọng đọc dùng giọng hệ thống: cần cài giọng tiếng Trung (zh-CN) trong Windows/macOS.
