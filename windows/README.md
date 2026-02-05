# Praktikum DST-NAT (XI TJKT 1)

Repository ini berisi file `index.html` sederhana untuk keperluan praktikum jaringan (Destination Network Address Translation) yang dideploy menggunakan server bawaan Windows, yaitu **Internet Information Services (IIS)**.

## 📋 Prasyarat
- Windows 10/11 (Pro/Enterprise disarankan, Home Edition mungkin memerlukan instalasi manual).
- Akses Administrator.

## 🚀 Langkah-Langkah Deployment di IIS

### 1. Mengaktifkan Fitur IIS
1. Buka **Control Panel** > **Programs** > **Turn Windows features on or off**.
2. Cari **Internet Information Services**, centang folder tersebut.
3. Klik **OK** dan tunggu proses instalasi selesai.

### 2. Meletakkan File Project
1. Salin file `index.html` dari repository ini.
2. Tempelkan (Paste) file tersebut ke direktori default IIS:  
   `C:\inetpub\wwwroot`
3. *Tips:* Hapus atau ganti nama file `iisstart.htm` bawaan agar server langsung membaca `index.html` Anda.

### 3. Mengubah Port Default (Contoh: ke Port 8080)
Secara default, IIS berjalan di port 80. Untuk mengubahnya:
1. Buka **IIS Manager** (ketik `inetmgr` di Start Menu).
2. Di panel kiri, buka pohon folder hingga menemukan **Sites** > **Default Web Site**.
3. Klik kanan pada **Default Web Site**, lalu pilih **Edit Bindings**
4. Pilih baris `http` dan klik **Edit**.
5. Ubah kolom **Port** dari `80` menjadi `8080` (atau port lain sesuai instruksi praktikum).
6. Klik **OK** lalu **Close**.

### 4. Menjalankan di Browser
1. Buka browser Anda.
2. Jika menggunakan port default (80), akses: `http://localhost`
3. Jika sudah mengubah port ke 8080, akses: **http://localhost:8080**.
4. Ubah localhost jika menggunakan IP Address atau alamat domain.

## 🛠️ Catatan Penting
- **Izin Akses:** Jika muncul error *403 Forbidden*, pastikan user `IIS_IUSRS` memiliki izin baca pada file di folder tersebut.
- **Firewall:** Jika ingin diakses dari komputer lain (client) dalam jaringan DST-NAT, pastikan port yang Anda gunakan sudah diizinkan di **Windows Defender Firewall**.

---
*Dibuat untuk keperluan praktikum XI TJKT 1.*
