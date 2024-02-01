const downloadCvBtn = document.getElementById("download-cv-btn");

downloadCvBtn.addEventListener("click", downloadPDF);

function downloadPDF() {
  const pdfFilePath = "../Assets/Ana Lipartia.pdf";
  const downloadLink = document.createElement("a");
  downloadLink.href = pdfFilePath;
  downloadLink.download = "Ana Lipartia.pdf";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
