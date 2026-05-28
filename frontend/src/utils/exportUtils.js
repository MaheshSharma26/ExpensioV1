/**
 * Client-side CSV-to-Excel data exporter with UTF-8 BOM support.
 * Allows instant opening in Microsoft Excel and similar spreadsheet utilities.
 * 
 * @param {Array<Object>} data Flat JSON array of objects representing rows.
 * @param {string} fileName Base name of the downloaded spreadsheet file.
 */
export const exportToExcel = (data, fileName = "export") => {
  if (!data || !data.length) {
    alert("No data available to export.");
    return;
  }

  try {
    // Retrieve headers (column names)
    const headers = Object.keys(data[0]);

    // Build CSV content
    const csvContent = [
      headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(","), // Headers row
      ...data.map(row =>
        headers
          .map(header => {
            const val = row[header];
            const escaped = String(val ?? "").replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(",")
      )
    ].join("\r\n");

    // Prepend UTF-8 Byte Order Mark (BOM) to force Excel to read it with correct encoding
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Export error:", error);
    alert("An error occurred during data export.");
  }
};
