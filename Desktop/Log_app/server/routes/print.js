const express = require('express');
var docx = require("docx");

const router = new express.Router();
router.post('/print', (req, res) => {
    var doc = new docx.Document();

    // Add some content in the document
    var paragraph = new docx.Paragraph(req.body.text);
    // Add more text into the paragraph if you wish
    paragraph.addRun(new docx.TextRun(req.body.text));
    doc.addParagraph(paragraph);
    
    // Used to export the file into a .docx file
    //var exporter = new docx.LocalPacker(doc);
    
    // Or use the express packer to make the file downloadable.
    // res is express' Response object
    var exporter = new docx.ExpressPacker(doc, res);
    
    exporter.pack("My First Document");
    // If you want to export it as a .pdf file instead
    exporter.packPdf("My First Document");
    console.log('Success');


    }
);module.exports = router;