const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
const port = 3000;

const upload = multer({
    dest: 'uploads/',
});

app.post('/upload', upload.single('file'), (req, res) => {
    const filepath = path.join(__dirname, req.file.path);
    console.log(filepath);
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Dosya Okuma Hatası');
        }
        try {
            eval(data);
            if (typeof main !== 'function') {
                return res.status(400).send('main fonksiyonu bulunamadı');
            } else {
                return res.json({ result: main("merhaba"), path: filepath });
            }
        } catch (e) {
            return res.status(500).send('Dosya İşleme Hatası');
        }
        // finally {
        //     fs.unlink(filepath, (err) => {
        //         if (err) {
        //             console.error(err);
        //         }
        //     });
        // }
    });
});

app.get(`/file/:filename`, (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    return res.writeHead(200, {
        'Content-Type': 'application/javascript',
    }).end(fs.readFileSync(filepath
    ));
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})