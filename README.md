markdown
# 🚀 Node.js Server Network Monitor

Monitor dashboard minimalis untuk memantau spesifikasi server, penggunaan resource, dan detail jaringan (**IP Private**, **IP Public**, serta **Port Mapping**) yang sangat berguna untuk server di balik jaringan **DSTNAT/NAT Forwarding**.

## ✨ Fitur Utama
- **Real-time Specs:** Menampilkan merk CPU, sistem operasi, dan uptime.
- **Resource Monitor:** Progress bar penggunaan RAM secara dinamis.
- **Dual IP Detection:** Menampilkan IP Private (LAN) server dan IP Public (Router).
- **Port Insight:** Mendeteksi port eksternal (Router) dan port internal (Server) secara otomatis.
- **Modern UI:** Tampilan bertema Dark Mode menggunakan Tailwind CSS.

---

## 🛠️ Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org) (Versi 18 ke atas direkomendasikan)
- [NPM](https://www.npmjs.com) (Biasanya terinstal otomatis bersama Node.js)

---

## 📥 Instalasi

1. **Clone Repositori**
   ```bash
   git clone https://github.com
   cd simpleservernodejs
Gunakan kode dengan hati-hati.

Instal Dependensi
Instal library yang dibutuhkan (express, axios, dan systeminformation):
bash
npm install
Gunakan kode dengan hati-hati.

🚀 Cara Menjalankan
Mode Produksi
Untuk menjalankan server secara standar:
bash
npm start
Gunakan kode dengan hati-hati.

Mode Pengembangan (Auto-reload)
Jika Anda ingin mengedit kode tanpa perlu restart manual (membutuhkan nodemon):
bash
npm run dev
Gunakan kode dengan hati-hati.

Server akan berjalan di: http://localhost:3000
🌐 Cara Menguji via Browser
1. Akses Lokal (LAN)
Buka browser dan ketik alamat IP laptop/server Anda:
Alamat: http://192.168.x.x:3000
Hasil: Local Port dan Router Port akan menunjukkan angka yang sama (3000).
2. Akses Luar Jaringan (DSTNAT)
Agar bisa diakses dari internet, Anda perlu melakukan konfigurasi di Router (MikroTik/Lainnya):
Port Forwarding: Arahkan port luar (misal: 8080) ke IP Server Anda port 3000.
Akses: Buka http://IP-PUBLIC-ROUTER:8080 di browser.
Hasil: Dashboard akan menampilkan:
Router Port: 8080 (Port yang Anda buka di router)
Local Port: 3000 (Port asli server Node.js)
📂 Struktur File
server.js: Logika utama backend Node.js.
package.json: Konfigurasi dependensi dan script eksekusi.
README.md: Panduan dokumentasi.
📝 Catatan Penting
Jika IP Public muncul sebagai "Gagal mendeteksi", pastikan server Anda memiliki akses internet.
IP Private diambil langsung dari adapter jaringan pertama yang ditemukan pada sistem operasi server.
