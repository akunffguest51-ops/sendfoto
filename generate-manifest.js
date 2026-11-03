const fs = require("fs");
const path = require("path");

const MEDIA_DIR = "./media";
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"];
const VIDEO_EXTS = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

function getType(ext) {
  if (IMAGE_EXTS.includes(ext)) return "image";
  if (VIDEO_EXTS.includes(ext)) return "video";
  return null;
}

const albums = [];

if (!fs.existsSync(MEDIA_DIR)) {
  console.log(`⚠️  Folder ${MEDIA_DIR} tidak ditemukan — membuat folder kosong`);
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

const albumFolders = fs.readdirSync(MEDIA_DIR).filter((name) => {
  return fs.statSync(path.join(MEDIA_DIR, name)).isDirectory();
});

for (const albumName of albumFolders) {
  const albumPath = path.join(MEDIA_DIR, albumName);
  const files = fs.readdirSync(albumPath);

  const items = [];
  let cover = null;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const type = getType(ext);
    if (!type) continue;

    const filePath = `media/${albumName}/${file}`;
    items.push({ name: file, path: filePath, type });

    if (!cover && type === "image") cover = filePath;
  }

  if (items.length === 0) continue;

  if (!cover) cover = null;

  albums.push({
    name: albumName,
    cover,
    count: items.length,
    items,
  });
}

const manifest = { albums, generated: new Date().toISOString() };
fs.writeFileSync("./manifest.json", JSON.stringify(manifest, null, 2));
console.log(`✅ manifest.json dibuat — ${albums.length} album ditemukan`);
albums.forEach((a) => console.log(`   📁 ${a.name} (${a.count} file)`));
