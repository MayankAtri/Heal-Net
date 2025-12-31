# HealNet - Quick Start for Claude Code

## 🚀 What to Give Claude Code

### 1. Share Your PDF + This Guide
Upload the HealNet.pdf and tell Claude Code:

```
I need to build HealNet based on this PDF requirements.

Tech Stack:
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- AI: Google Gemini API
- OCR: Tesseract.js

Start with the backend first. Create:
1. Basic Express server
2. Gemini AI integration for prescription simplification
3. OCR service for text extraction
4. API endpoints for prescription upload and analysis
```

### 2. Get Your API Keys First

Before starting with Claude Code:

**Google Gemini API:**
- Go to: https://ai.google.dev/
- Sign in with Google
- Get your API key (FREE tier available)

**MongoDB:**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

### 3. Project Structure to Request

```
healnet/
├── backend/          # Node.js backend
│   ├── src/
│   │   ├── services/
│   │   │   ├── gemini.service.js    # AI logic
│   │   │   └── ocr.service.js       # OCR logic
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── config/
│   ├── .env
│   └── server.js
│
└── frontend/         # React app
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── package.json
```

### 4. Build Order (Ask Claude Code Step-by-Step)

**Phase 1: Backend Core**
```
"Create a Node.js backend with Express. 
Add Gemini API integration for simplifying medical text.
Add file upload handling with multer."
```

**Phase 2: OCR Integration**
```
"Add Tesseract.js OCR to extract text from prescription images.
Create an endpoint that accepts image upload, extracts text, 
and uses Gemini to simplify it."
```

**Phase 3: Frontend**
```
"Create a React frontend with:
- Image upload component
- Display analysis results
- Tailwind CSS styling"
```

**Phase 4: Medicine Features**
```
"Add medicine strip scanning and donate/dispose guidance features"
```

### 5. Example Claude Code Prompts

**For Backend:**
```
Create the Gemini service file that:
1. Takes extracted prescription text
2. Sends it to Gemini API with a prompt to simplify medical jargon
3. Returns JSON with medicine list, dosages, and warnings
4. Handles errors properly
```

**For Frontend:**
```
Create a React component that:
1. Has a file upload button
2. Shows image preview
3. Calls the backend API to analyze
4. Displays the simplified results in a clean card layout
5. Uses Tailwind CSS for styling
```

### 6. Environment Variables You'll Need

Backend `.env`:
```
PORT=5000
GEMINI_API_KEY=your_key_here
MONGODB_URI=your_mongodb_connection
```

Frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 💡 Tips for Using Claude Code

1. **Start Small**: Build one feature at a time
2. **Test Often**: Run and test after each feature
3. **Share Errors**: If something breaks, share the error with Claude Code
4. **Iterate**: Ask Claude Code to improve/refine code

## 📋 Minimum Viable Product (Build This First)

1. ✅ Backend server with one endpoint: `/api/prescriptions/analyze`
2. ✅ OCR text extraction from image
3. ✅ Gemini AI simplification
4. ✅ React upload component
5. ✅ Display results

Then expand from there!

## 🎯 First Command in Claude Code

```bash
cd ~/Projects
mkdir healnet
cd healnet

# Then in Claude Code terminal:
"Initialize a Node.js backend project for HealNet with Express, 
create basic server structure, and add Gemini AI integration 
for medical text simplification"
```

Good luck! 🚀
