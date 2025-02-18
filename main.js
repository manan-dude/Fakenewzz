const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const Tesseract = require('tesseract.js');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});



app.post('/generate', upload.single('file'), async (req, res) => {
  try {
    const { source, headline, content } = req.body;
    let textContent = content;
    

     // If a file is uploaded, process it
     if (req.file) {
      console.log("reading the file")
      const mediaPath = req.file.path;
      const extractedText = await extractTextFromImage(mediaPath);
      textContent += ` ${extractedText}`;
      console.log(textContent)
      fs.unlinkSync(mediaPath); // Clean up the uploaded file
      console.log("text reading completed")
    }
    
    const prompt = `Source: ${source}\nHeadline: ${headline}\nContent: ${textContent}\nAnalyze the above information and provide the likelihood (in percentage) that this is fake news.`;
     
    // // Check if all required inputs are provided
    // if (!source || !headline || !textContent) {
    //   return res.status(400).json({ error: 'Missing required fields in request body' });
    // }
    console.log("i am here")
    
    console.log("model is reading")
    const result = await model.generateContent([prompt]);
    const responseText = result.response.text();
    console.log(responseText)

    // Extract the percentage from the response text
    const match = responseText.match(/(\d+(\.\d+)?)%/);
    const percentage = match ? match[0] : null;
    
    res.json({ response: responseText, percentage });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

async function extractTextFromImage(imagePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    return text;
  } catch (error) {
    console.error('Error during OCR processing:', error);
    return '';
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
