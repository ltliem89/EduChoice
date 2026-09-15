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
    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
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
    } finally {
      lock.releaseLock();
    }
  }

  // Update an existing row by its recordId, or insert it if not present.
  // This is the implementation for FieldMap.gs updateByKey calls.
  updateByKey(keyValue, column, newValue) {
    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      const sheet = this.getSheet();
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const keyIdx = headers.indexOf("recordId");
      if (keyIdx === -1) throw new Error("MISSING_HEADER_recordId");
      const colIdx = headers.indexOf(column);
      if (colIdx === -1) throw new Error("MISSING_HEADER_" + column);

      for (let i = 1; i < data.length; i++) {
        if (String(data[i][keyIdx]) === String(keyValue)) {
          sheet.getRange(i + 1, colIdx + 1).setValue(newValue);
          return { updated: true, recordId: keyValue, row: i + 1 };
        }
      }

      // Record does not exist yet: self-healing insert instead of a silent no-op.
      const row = headers.map(h => {
        if (h === "recordId") return keyValue;
        if (h === column) return newValue;
        return "";
      });
      sheet.appendRow(row);
      return { updated: false, inserted: true, recordId: keyValue };
    } finally {
      lock.releaseLock();
    }
  }

  // Insert if the matched row does not exist, otherwise merge-update in place.
  upsert(matchField, matchValue, record) {
    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      const sheet = this.getSheet();
      const data = sheet.getDataRange().getValues();
      if (data.length >= 2) {
        const headers = data[0];
        const idx = headers.indexOf(matchField);
        if (idx > -1) {
          for (let i = 1; i < data.length; i++) {
            if (String(data[i][idx]) === String(matchValue)) {
              const rowObj = {};
              headers.forEach((h, j) => { rowObj[h] = data[i][j]; });
              const merged = Object.assign({}, rowObj, record);
              const lastCol = headers.length;
              const newRow = headers.map(h => {
                const val = merged[h];
                if (val === undefined || val === null) return "";
                return typeof val === "object" ? JSON.stringify(val) : val;
              });
              sheet.getRange(i + 1, 1, 1, lastCol).setValues([newRow]);
              return { action: "updated", record: merged, row: i + 1 };
            }
          }
        }
      }
      this.append(record);
      return { action: "inserted", record: record };
    } finally {
      lock.releaseLock();
    }
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
