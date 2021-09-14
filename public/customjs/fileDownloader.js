// function download(filename, text) {
//   var element = document.createElement("a");
//   element.setAttribute(
//     "href",
//     "data:text/plain;charset=utf-8," + encodeURIComponent(text)
//   );
//   element.setAttribute("download", filename);

//   element.style.display = "none";
//   document.body.appendChild(element);

//   element.click();

//   document.body.removeChild(element);
// }
function CreatePDF() {
  // create BytescoutPDF object instance
  var pdf = new BytescoutPDF();

  // set document properties: Title, subject, keywords, author name and creator name
  pdf.propertiesSet(
    "Sample Invoice",
    "Invoice #1234",
    "invoice, company, customer",
    "Document Author",
    "Document Creator"
  );

  // set page size
  pdf.pageSetSize(BytescoutPDF.Letter);

  // set portrait page orientation
  pdf.pageSetOrientation(BytescoutPDF.PORTRAIT);

  // add new page
  pdf.pageAdd();

  // add logo
  pdf.imageLoadFromUrl("logo.png");
  pdf.imagePlace(20, 20);

  // set font name
  pdf.fontSetName("Times-Roman");

  // add requisites
  pdf.fontSetStyle(true, false, false);
  pdf.fontSetSize(24);
  pdf.textAdd(450, 55, "INVOICE", 0);

  pdf.fontSetSize(12);
  pdf.textAdd(50, 90, "COMPANY NAME", 0);

  pdf.fontSetSize(11);
  pdf.fontSetStyle(false, false, false);
  pdf.textAdd(50, 120, "Address", 0);
  pdf.textAdd(50, 140, "Phone, fax", 0);
  pdf.textAdd(50, 160, "E-mail", 0);

  pdf.textAdd(400, 120, "DATE", 0);
  pdf.textAdd(400, 140, "INVOICE #", 0);
  pdf.textAdd(400, 160, "FOR", 0);

  pdf.textSetBoxPadding(3, 2, 2, 3);

  // draw table header
  pdf.graphicsDrawRectangle(50, 200, 520, 220);
  pdf.graphicsDrawLine(50, 220, 570, 220);
  pdf.textSetAlign(BytescoutPDF.CENTER);
  // add 'Description' column
  pdf.textSetBox(50, 200, 220, 20);
  pdf.textAddToBox("Description");
  pdf.graphicsDrawLine(270, 200, 270, 420);
  // add 'Quantity' column
  pdf.textSetBox(270, 200, 80, 20);
  pdf.textAddToBox("Quantity");
  pdf.graphicsDrawLine(350, 200, 350, 420);
  // add 'Price' column
  pdf.textSetBox(350, 200, 100, 20);
  pdf.textAddToBox("Price");
  pdf.graphicsDrawLine(450, 200, 450, 420);
  // add 'Amount' column
  pdf.textSetBox(450, 200, 120, 20);
  pdf.textAddToBox("Amount");

  pdf.textSetAlign(BytescoutPDF.LEFT);

  // fill table content
  for (var row = 0; row < 10; row++) {
    pdf.textSetBox(50, 220 + row * 20, 220, 20);
    pdf.textAddToBox("ITEM " + row);
    pdf.graphicsDrawLine(50, 240 + row * 20, 570, 240 + row * 20);
  }

  // add signature
  pdf.textAdd(390, 470, "Signature", 0);
  pdf.graphicsDrawLine(450, 470, 570, 470);

  // return BytescoutPDF object instance
  return pdf;
}
