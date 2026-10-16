# SendFoto

Galeri foto & video pribadi — deploy di Netlify, buka dari HP.

## Cara pakai

### 1. Tambah foto/video
Taruh file di folder `media/`:
```
media/
  liburan-bali/
    foto1.jpg
    video1.mp4
  keluarga/
    foto2.jpg
```
Tiap folder = 1 album.

### 2. Generate manifest
Setiap kali nambah/hapus file, jalankan:
```bash
node generate-manifest.js
```

### 3. Push ke GitHub
```bash
git add .
git commit -m "tambah album liburan"
git push
```

Netlify auto-deploy. Selesai!

## Format file yang didukung
- **Foto:** jpg, jpeg, png, gif, webp, heic
- **Video:** mp4, mov, avi, mkv, webm (HD didukung penuh)

## Tips
- Video diplay langsung di browser, tombol download tersedia
- Swipe kiri/kanan di HP untuk navigasi antar foto/video
- Tekan ESC atau ← → di keyboard untuk navigasi di PC
