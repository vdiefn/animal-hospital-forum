# 動物醫院查詢網站

## 功能

##### 一般使用者
- 使用者可以在未註冊的情況下查詢、瀏覽動物醫院資訊，內容包含醫院名稱、地址、電話、網址以及簡介等。

- 使用者可以在搜尋欄中使用醫院名稱、地點進行搜尋。

- 使用者也可以進行註冊，註冊的資料包括：名字、email、密碼。

- 使用者登入後可新增醫院資訊，或者修改醫院資訊。

- 使用者登入後可以修改自己的個人資料，並新增大頭照照片。

##### 管理員
- 管理員除了可以使用上述功能外，登入帳號後，可點選自己的名字進行個人頁面，於個人頁面中可以進行前後台的切換。

- 後台資料中可以看到所有的醫院資訊，並可新增醫院、瀏覽醫院、修改醫院資訊以及刪除一家醫院。

- 後台資料中可以看到所有註冊的使用者列表，並會顯示使用者的姓名、Email以及其為一般使用者或者管理員，若為一般使用者則該名使用者可被管理員於後台中刪除資料。

- 管理者帳號權限開通需手動啟動

## 開發工具
- Node.js
- Express
- Express-handlebars
- dotenv
- Mongoose
- Method-override
- Express-session
- Passport
- Passport-local
- Connect-flash
- Bcrypt.js
- dayjs
- faker
- multer

## 安裝流程
1. 開啟終端機將專案存至本機
2. 使用終端機指令，進入存放此專案的資料夾
```js
cd animal-hospital-forum
```
3. 安裝npm套件
```js
npm install
```
4. 安裝完成後接續安裝Express, Express-handlebars......等
5. 新增.env檔案設定環境變數，可於.env.example內看到更多環境變數的設定。
6. 新增種子資料
```js
npm run seed
```
7. 種子安裝完成會看到：HospitalSeeder done!
8. 執行npm腳本指令，啟動伺服器
  ```js
  npm run dev
  ```
9. 成功啟動後會於終端機看到：Express is running on http://localhost:3000 以及 mongodb connected!
10. 於瀏覽器輸入http://localhost:3000 後可開始使用