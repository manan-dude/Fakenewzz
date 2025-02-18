### **Fake News Checker 📰🔍**  
A Generative AI-powered tool that verifies news authenticity by analyzing text-based content and images.  

---

## 🚀 **Features**  
- **Multi-Input Analysis**: Accepts text inputs (source, headline, content) and image uploads for fact-checking.  
- **AI-Powered Verification**: Uses Google's Gemini model to analyze and determine the likelihood of fake news.  
- **OCR Integration**: Extracts text from uploaded images (screenshots, social media posts, etc.) using Tesseract.js.  
- **Real-Time Feedback**: Provides a percentage-based analysis of authenticity.  
- **Simple & Fast API**: Built using **Express.js** with **CORS** and **Multer** for file uploads.  

---

## 🛠️ **Tech Stack**  
- **Backend**: Node.js, Express.js  
- **AI Model**: Google Gemini API (Generative AI)  
- **OCR**: Tesseract.js  
- **File Handling**: Multer  
- **Environment Management**: Dotenv  

---

## 📦 **Installation**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/fake-news-checker.git
cd fake-news-checker
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the root directory and add:  
```
API_KEY=your_google_generative_ai_api_key
```

### **4️⃣ Start the Server**  
```bash
npm start
```
The server will start at **http://localhost:3001/**.

---

## 🎯 **API Endpoints**  

### **1️⃣ Root Endpoint**  
```http
GET /
```
- Returns a simple welcome message.  

### **2️⃣ Fake News Analysis**  
```http
POST /generate
```
#### **Request Body (Form-Data)**
| Key      | Type     | Description |
|----------|---------|-------------|
| source   | String  | Source of the news (URL, platform, etc.) |
| headline | String  | Headline of the news article |
| content  | String  | Full content of the article |
| file     | File (optional) | Image file containing news (for OCR processing) |

#### **Response Format**
```json
{
  "response": "Analysis result text",
  "percentage": "X%"  // Probability of the news being fake
}
```

---

## 🖼️ **How It Works**  
1. The user submits a news article (text or image).  
2. If an image is uploaded, **OCR extracts text** from it.  
3. The text is **sent to Google's Gemini AI** for fake news analysis.  
4. The API returns a **likelihood percentage** of the news being fake.  

---

## 🛠️ **Troubleshooting**  

- **Missing API Key?** Add it to the `.env` file.  
- **OCR Not Working?** Ensure `Tesseract.js` is installed and the image format is supported.  
- **Server Crash?** Check logs for missing dependencies and ensure ports are free.  

---

## 🤝 **Contributing**  
Feel free to submit issues or pull requests! 🚀  

---

## 📜 **License**  
This project is **open-source** under the **MIT License**.  
