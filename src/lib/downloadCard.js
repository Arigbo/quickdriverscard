// Exports an <IdCard> DOM node as a true-size CR80 (85.6 × 53.98 mm) PDF.
// The card is cloned into an off-screen container at a fixed width so the
// output is identical no matter how large the card appears on screen.
const CARD_MM = { w: 85.6, h: 53.98 };
const EXPORT_WIDTH_PX = 856;

export async function downloadCardPdf(node, filename) {
  const [{ toJpeg }, { jsPDF }] = await Promise.all([
    import("html-to-image"),
    import("jspdf"),
  ]);

  const host = document.createElement("div");
  host.className = "idcard-export";
  host.style.width = `${EXPORT_WIDTH_PX}px`;
  host.appendChild(node.cloneNode(true));
  document.body.appendChild(host);

  try {
    await document.fonts?.ready;
    const card = host.firstChild;
    // Square the corners for print; the card is cut to shape by the printer.
    const dataUrl = await toJpeg(card, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      style: { borderRadius: "0", border: "0" },
    });
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [CARD_MM.w, CARD_MM.h],
    });
    pdf.addImage(dataUrl, "JPEG", 0, 0, CARD_MM.w, CARD_MM.h);
    pdf.save(filename);
  } finally {
    host.remove();
  }
}
