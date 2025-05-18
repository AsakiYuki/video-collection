import fs from "fs";

if (!fs.existsSync("exist.json")) fs.writeFileSync("exist.json", "{}");
const exist = JSON.parse(fs.readFileSync("exist.json", "utf-8"));
const existVideos = exist.videos || [];

const workFolder = process.cwd();

const folders = fs.readdirSync(workFolder).filter((file) => {
    const filePath = `${workFolder}/${file}`;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !existVideos.includes(file)) {
        if (!(file === "node_modules" || file.startsWith("."))) return true;
    } return false;
})

const videos: string[] = []

for (const video of folders) {
    const videoPath = `${workFolder}/${video}`;
    if (fs.existsSync(`${videoPath}/metadata.json`)) videos.push(video);
}

fs.writeFileSync("commit", videos.length ? `New videos added: ${videos.length}` : "");
fs.writeFileSync("exist.json", JSON.stringify({ videos: [...existVideos, ...videos] }, null, 2));