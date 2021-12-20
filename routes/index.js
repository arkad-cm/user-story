const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()


/* GET home page. */
router.get('/', function (req, res) {
    return res.status(200).json({status: "OK", message: "API is running..."})
});

const mapping = {
    ' _ | ||_|': '0',
    '     |  |': '1',
    ' _  _||_ ': '2',
    ' _  _| _|': '3',
    '   |_|  |': '4',
    ' _ |_  _|': '5',
    ' _ |_ |_|': '6',
    ' _   |  |': '7',
    ' _ |_||_|': '8',
    ' _ |_| _|': '9'
}

function getInvoices(data) {
    const invoices = []
    for (let i = 0; i < data.length - 1; i += 4) {
        invoices.push(data.slice(i, i + 3))
    }
    return invoices;
}

function getDigits(invoice) {
    const digits = []
    for (let i = 0; i < 27; i += 3) {
        digits.push([
            invoice[0][i] + invoice[0][i + 1] + invoice[0][i + 2] +
            invoice[1][i] + invoice[1][i + 1] + invoice[1][i + 2] +
            invoice[2][i] + invoice[2][i + 1] + invoice[2][i + 2]
        ])
    }
    return digits
}

function getDigit(digit) {
    let d = mapping[digit];
    if (!d) return '?'
    return d;
}

/* POST Parse and Get Invoice Numbers. */
router.post('/', upload.single('file'), function (req, res) {
    const data = req.file.buffer.toString().split('\n');
    let text = ''
    const invoices = getInvoices(data);
    for (const invoice of invoices) {
        let row = ''
        let flag = false
        for (const digit of getDigits(invoice)) {
            console.log(digit)
            const d = getDigit(digit);
            row += d
            if (d === '?') {
                flag = true;
            }
        }
        if (!flag) {
            text += row + '\n'
        } else {
            text += row + ' ILLEGAL' + '\n'
        }
    }
    return res.status(200).send(Buffer.from(text))
});

module.exports = router;
