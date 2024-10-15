const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { put } = require("@vercel/blob")

const app = express();
app.use(cors());
const port = 3000;

// const upload = multer({
//     dest: 'uploads/',
// });

// app.post('/upload', upload.single('file'), async (req, res) => {
//     const filepath = path.join(__dirname, req.file.path);
//     const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
//     console.log(url)
//     console.log(filepath);
//     fs.readFile(filepath, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(501).send('Dosya Okuma Hatası');
//         }
//         try {
//             eval(data);
//             if (typeof main !== 'function') {
//                 return res.status(400).send('main fonksiyonu bulunamadı');
//             } else {
//                 return res.json({ result: main("merhaba"), path: filepath });
//             }
//         } catch (e) {
//             return res.status(502).send('Dosya İşleme Hatası');
//         } finally {
//             fs.unlink(filepath, (err) => {
//                 if (err) {
//                     console.error(err);
//                 }
//             });
//         }
//     });
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const fileContent = req.file.buffer.toString('utf8');
        console.log(fileContent);
        eval(fileContent);
        if (typeof main !== 'function') {
            return res.status(400).send('main fonksiyonu bulunamadı');
        } else {
            return res.json({ result: main() });
        }
    } catch (e) {
        return res.status(502).send('Dosya İşleme Hatası');
    }
});

app.post('/fizzbuzz', upload.single('file'), async (req, res) => {
    try {
        const fileContent = req.file.buffer.toString('utf8');
        console.log(fileContent);
        eval(fileContent);
        if (typeof main !== 'function') {
            return res.status(400).send('main fonksiyonu bulunamadı');
        } else {
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            const result = arr.map((num) => main(num));
            const expect = ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"];
            const isEqual = result.every((value, index) => value === expect[index]);
            if (isEqual) {
                return res.json({ result });
            } else {
                return res.status(400).send('Sonuçlar eşleşmedi');
            }
            // return res.json({ result });
        }
    } catch (e) {
        return res.status(502).send('Dosya İşleme Hatası');
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})