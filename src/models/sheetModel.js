const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

// Returns a selected row of an Excel sheet
function readSheetRow(filePath, rowIndex) {
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, "utf8");

    const rows = parse(content, { skip_empty_lines: true });

    return rows[rowIndex] || [];
}

module.exports = { readSheetRow };