/**
 * EDUCHOICE-AI V9 - SHEET REPOSITORY & INITIALIZER
 */

class SheetRepository {
  constructor(sheetName) {
    this.sheetName = sheetName;
  }

  getSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(this.sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(this.sheetName);
      const schemas = getSheetSchemas_();
      const headers = schemas[this.sheetName] || ['recordId', 'createdAt'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    }
    return sheet;
  }

  append(record) {
    const sheet = this.getSheet();
    const lastCol = Math.max(1, sheet.getLastColumn());
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    const row = headers.map(h => {
      const val = record[h];
      if (val === undefined || val === null) return "";
      return typeof val === "object" ? JSON.stringify(val) : val;
    });

    sheet.appendRow(row);
    return record;
  }

  findBy(field, value) {
    const sheet = this.getSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return [];

    const headers = data[0];
    const index = headers.indexOf(field);
    if (index === -1) return [];

    return data.slice(1)
      .filter(row => String(row[index]) === String(value))
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => obj[h] = row[i]);
        return obj;
      });
  }

  getAll(limit = 100) {
    const sheet = this.getSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return [];

    const headers = data[0];
    return data.slice(1, limit + 1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
  }

  count() {
    const sheet = this.getSheet();
    return Math.max(0, sheet.getLastRow() - 1);
  }
}

/**
 * Auto-initializes all 39 canonical sheets with frozen header rows
 */
function initializeEduChoiceSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const schemas = getSheetSchemas_();
  const names = Object.keys(schemas);

  names.forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    const headers = schemas[sheetName];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  });

  return { ok: true, sheetsCreated: names.length, timestamp: new Date().toISOString() };
}
