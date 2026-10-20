# 300-maktab sayti

HTML, CSS va JavaScript frontend hamda Node.js + Express backend bilan tayyorlangan loyiha.

## Ishga tushirish

1. Kompyuterda Node.js o‘rnatilgan bo‘lsin: https://nodejs.org/
2. ZIP faylni oching.
3. Loyiha papkasini terminalda oching.
4. Quyidagi buyruqlarni bajaring:

```bash
npm install
npm start
```

5. Brauzerda `http://localhost:3000` manzilini oching.

## Backend API

- `GET /api/health` — server ishlayotganini tekshiradi.
- `POST /api/contact` — murojaat formasidan ma’lumot qabul qiladi.

`POST /api/contact` uchun JSON namunasi:

```json
{
  "name": "Ali Valiyev",
  "phone": "+998901234567",
  "topic": "Umumiy savol",
  "message": "Maktab haqida savolim bor."
}
```

Murojaatlar `data/messages.json` fayliga saqlanadi. Bu boshlang‘ich demo backend: haqiqiy internetga joylashdan oldin ma’lumotlar bazasi, administrator uchun xavfsiz kirish va maxfiylik sozlamalarini qo‘shish tavsiya etiladi.

## Eslatma

Saytdagi rasmlar tashqi Unsplash manbalaridan yuklanadi. Maktabning rasmiy ma’lumotlarini ommaga chiqarishdan oldin maktab bilan tekshiring.
