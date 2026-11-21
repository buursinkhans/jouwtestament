import { PDFDocument, StandardFonts, rgb, type PDFFont } from 'pdf-lib';
import { actionPlan, type Answers } from './check-guide';

export async function createCheckPlanPdf(answers: Answers) {
  const doc = await PDFDocument.create();
  doc.setTitle('Jouw Goed Geregeld actieplan');
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let page = doc.addPage([595, 842]);
  let y = 785;
  const maxWidth = 485;

  function lines(text: string, font: PDFFont, size: number) {
    const output: string[] = [];
    let line = '';
    for (const word of text.split(' ')) {
      const candidate = line ? line + ' ' + word : word;
      if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
        output.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) output.push(line);
    return output;
  }

  function ensureSpace(height: number) {
    if (y - height < 55) {
      page = doc.addPage([595, 842]);
      y = 785;
    }
  }

  function write(text: string, size = 12, font = regular, space = 8) {
    for (const line of lines(text, font, size)) {
      ensureSpace(size);
      page.drawText(line, { x: 55, y, size, font, color: rgb(0.12, 0.25, 0.23) });
      y -= size + 5;
    }
    y -= space;
  }

  const { items, solutions, statusNote } = actionPlan(answers);
  write('Helder Nalaten', 13, bold);
  write('Jouw Goed Geregeld actieplan', 25, bold, 18);
  write('Aandacht voor deze onderwerpen', 16, bold);
  for (const [index, item] of items.entries()) {
    ensureSpace(32 + lines(item.text, regular, 12).length * 17);
    write((index + 1) + '. ' + item.title, 13, bold, 2);
    write(item.text);
  }
  write(statusNote, 12, regular, 16);
  ensureSpace(95);
  write('Met deze stappen regel je dat concreet', 16, bold);
  for (const item of solutions) {
    ensureSpace(32 + lines(item.text, regular, 12).length * 17);
    write(item.title, 13, bold, 2);
    write(item.text);
  }
  write('Gebruik dit plan om een gesprek voor te bereiden. Laat een notaris of adviseur meekijken naar jouw mogelijkheden.');
  for (const [index, pdfPage] of doc.getPages().entries()) {
    pdfPage.drawText('Helder Nalaten  |  ' + (index + 1), { x: 55, y: 31, size: 10, font: regular, color: rgb(0.12, 0.25, 0.23) });
  }
  return doc;
}

