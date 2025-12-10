# Vlink test

## Getting Started

```bash
bun start
```

## Checklists

1. [x] Halaman login
    - Validasi input (email + password).
    - Simpan token autentikasi secara aman (misalnya di AsyncStorage). Token dapat berupa:
        - Random string yang di generate sendiri
        - menggunakan JWT based on email dengan expired time 1 jam (Recommended)
        - Skema login menggunakan google dan dapatkan access_token dari google
2. [x] Halaman Home
    - Tampilkan email
    - Pada halaman home lakukan pemanggilan api melalui REST api yang tersedia untuk public misalkan api ongkir, provinsi, kecamatan atau api general (contoh: JSONPlaceholder atau dummy json) data yang ditampilkan dapat berupa users, products dll.
    - Tampilkan data dalam FlatList dengan:
    - Pull-to-refresh
    - Loading state & error state
3. [x] Halaman Detail
    - Halaman ini akan menampilkan detail dari item yang di click di home, pastikan dibagian paling atas halaman ini juga menampilkan item / component yang digunakan di home (Reusable).
    - Tampilkan data detail dari API atau jika api tidak tersedia tampilkan melalu store / props dari route saat navigasi.
    - Handle kondisi loading, error, dan data kosong.

Ketentuan Teknis
- [x] Gunakan React navigation
- [x] Pemanggilan api menggunakan axios
- [x] Error handling menggunakan try catch
- [x] Buat component terpisah dan reusable
- [x] Push project ke GitHub dengan 3 atau lebih commits (sesuai jumlah halaman)
