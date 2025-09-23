# Alfalah Backend (Node.js + Express + MongoDB)

هذه نسخة جاهزة لمشروع Backend مرتب ومتكامل يعتمد على Node.js, Express, Mongoose, JWT.

## تشغيل محلي
1. تأكد أن MongoDB شغّال محلياً أو عدّل `MONGO_URI` في `.env`.
2. ثبت الحزم:
   ```
   npm install
   ```
3. شغّل السيرفر (تطوير):
   ```
   npm run dev
   ```
4. افتح: http://localhost:5000

## Endpoints أساسية
- `POST /api/auth/register` — تسجيل
- `POST /api/auth/login` — تسجيل دخول (يحصل على JWT)
- `GET /api/products` — جلب كل المنتجات
- `POST /api/products` — إنشاء منتج (محمي - يحتاج توكن)
- `GET /api/stores` — جلب المتاجر
- `POST /api/stores` — إنشاء متجر (محمي)
- `GET /api/orders` — جلب الطلبات (محمي)
- `POST /api/orders` — إنشاء طلب (محمي)

## نشر على الإنترنت (ملاحظة مختصرة)
لتجعل المشروع يظهر على الإنترنت يمكنك نشره على خدمات مثل Render, Railway, Heroku أو DigitalOcean. خطوات عامة:
- أنشئ مستودع Git (GitHub).
- اربط المستودع بالخدمة (مثلاً Render).
- حدّد متغيئات البيئة (`MONGO_URI`, `JWT_SECRET`).
- اضبط أمر التشغيل: `npm run start` أو `npm run dev`.
