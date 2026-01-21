// EXPORT RESULT FEATURES

const copyBtn = document.getElementById("copyBtn");
const pdfBtn = document.getElementById("pdfBtn");
const shareBtn = document.getElementById("shareBtn");

// COPY TO CLIPBOARD
copyBtn.addEventListener("click", () => {
    if (!result.innerText.trim()) {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(result.innerText)
        .then(() => alert("Result copied to clipboard!"))
        .catch(() => alert("Copy failed"));
});

// ======================
// DOWNLOAD AS PDF (100% WORKING)
// ======================
pdfBtn.addEventListener("click", () => {
    const text = result.innerText.trim();

    if (!text) {
        alert("Nothing to export!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(text, 180);

    doc.setFont("Helvetica");
    doc.setFontSize(12);
    doc.text(lines, 10, 20);

    doc.save("age-result.pdf");
});