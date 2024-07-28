<<<<<<< HEAD
Hướng dẫn cài đặt và triển khai ứng dụng:
- Bước 1: Clone project NPMCNPM-BE

    + git clone https://gitlab.com/TheNhatAT/nmcnpm-be.git

- Bước 2: Cấu hình cho server (yêu cầu phải có cài đặt mongodb ở máy tính của bạn nếu muốn sử dụng localhost)

    + Chạy lệnh npm install , nếu xuất hiện cảnh báo về phiên bản cũ, chạy lệnh : npm audit fix để cập nhật.    
    
    + Tạo file .env với cấu trúc giống như trong file .env.dev sau đó sửa nội dung file .env:

        + DB_AUTHENTICATION: xác thực truy cập csdl có sử dụng tài khoản và mật khẩu hay không. ví dụ true

        + DB_HOST: host của csdl MongoDB

        + DB_PORT: cổng sử dụng của csdl – mặc định là 27017

        + DB_NAME: tên csdl

        + DB_USERNAME: mật khẩu của database (nếu phần DB_AUTHENTICATION = true)

        + TOKEN_SECRET: chuỗi kí tự đặc biệt (đặt tùy ý – ví dụ: jadehillhomestays ) dùng để mã hóa token JWT gửi về cho client.

        + PORT: cổng dùng để chạy server ( ví dụ : 8000 ).

Ví dụ cấu hình:

DB_AUTHENTICATION =  // hoặc để trống

DB_HOST = 27017

DB_NAME = JadeHillHomestays

DB_USERNAME = // để trống

DB_PASSWORD = // để trống

TOKEN_SECRET = jadehills

PORT = 8000

- Bước 3: Khởi tạo dữ liệu mẫu và đường dẫn truy cập database

    + Vào file dbHelpers.js ở folder helpers và chọn đường dẫn cho database phù hợp (mongo cloud hoặc local)

    + Vào file seedHomestays và seedUsers ở folder seed và chọn đường dẫn database phù hợp như ở trên

    + Chạy lệnh npm run seedHomestays để seed thông tin khởi tạo của homestays

    + Chạy lệnh npm run seedUsers để seed thông tin khởi tạo cho admin và super-admin

- Bước 4: Khởi chạy server

    + npm run start:dev -> server sẽ khởi động lại mỗi khi mã nguồn có sự thay đổi mới. ( Điều kiện: máy đã cài đặt gói nodemon, nếu 
    
    chưa cài đặt chạy lệnh npm install nodemon)

    + npm start -> server sẽ không khởi lại khi mã nguồn có sự thay đổi.


=======
# JHHomestays
>>>>>>> c6c875966234db61964b44069c25058d631e62c8
