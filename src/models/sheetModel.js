const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

function readSheetRow(filePath, rowIndex) {
    const absPath = path.resolve(filePath);

    const workbook = xlsx.readFile(absPath);
    const targetSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheetName];

    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: null });
    return rows[rowIndex] || rows[0];
}

module.exports = { readSheetRow };