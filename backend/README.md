# HealNet Backend

Backend API for HealNet - Prescription analysis and simplification using OCR and AI.

## Features

- **Prescription Image Upload** - Upload prescription images (JPG, PNG, JPEG)
- **OCR Text Extraction** - Extract text from images using Tesseract.js
- **AI Simplification** - Simplify medical jargon using Google Gemini AI
- **MongoDB Storage** - Store and retrieve prescription analyses
- **RESTful API** - Clean, well-documented API endpoints
- **Security** - Rate limiting, CORS, Helmet security headers
- **Error Handling** - Comprehensive error handling and validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **AI**: Google Gemini API
- **OCR**: Tesseract.js
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Running locally or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **Google Gemini API Key** - Get from [Google AI Studio](https://ai.google.dev/)

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/healnet

# Google Gemini AI
GEMINI_API_KEY=your_actual_api_key_here

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Get Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key and paste it in your `.env` file

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas**
- Update `MONGODB_URI` in `.env` with your Atlas connection string

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Analyze Prescription
```
POST /api/prescriptions/analyze
```

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Field name: `prescription`
- File type: JPG, JPEG, or PNG
- Max size: 5MB

**Example (using curl):**
```bash
curl -X POST http://localhost:5000/api/prescriptions/analyze \
  -F "prescription=@/path/to/prescription.jpg"
```

**Example (using JavaScript fetch):**
```javascript
const formData = new FormData();
formData.append('prescription', file);

const response = await fetch('http://localhost:5000/api/prescriptions/analyze', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "originalText": "Amoxicillin 500mg Take twice daily for 7 days...",
    "simplifiedAnalysis": {
      "medicines": [
        {
          "name": "Amoxicillin",
          "genericName": "Amoxicillin",
          "dosage": "500mg",
          "frequency": "Twice daily",
          "duration": "7 days"
        }
      ],
      "warnings": ["Complete the full course", "May cause stomach upset"],
      "instructions": "Take after meals with water",
      "contraindications": ["Penicillin allergy"]
    },
    "originalFilename": "prescription.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

No file uploaded (400):
```json
{
  "success": false,
  "error": {
    "message": "No prescription image uploaded",
    "code": "NO_FILE"
  }
}
```

Invalid file type (400):
```json
{
  "success": false,
  "error": {
    "message": "Invalid file type. Only JPG, JPEG, and PNG images are allowed.",
    "code": "INVALID_FILE_TYPE"
  }
}
```

File too large (400):
```json
{
  "success": false,
  "error": {
    "message": "File size exceeds 5MB limit",
    "code": "FILE_TOO_LARGE"
  }
}
```

### 3. Get Prescription by ID
```
GET /api/prescriptions/:id
```

**Example:**
```bash
curl http://localhost:5000/api/prescriptions/65a1b2c3d4e5f6a7b8c9d0e1
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "originalText": "...",
    "simplifiedAnalysis": { ... },
    "processingStatus": "completed",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:30.000Z"
  }
}
```

### 4. List All Prescriptions
```
GET /api/prescriptions?page=1&limit=10
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```bash
curl http://localhost:5000/api/prescriptions?page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   ├── gemini.js            # Gemini AI client
│   │   └── upload.js            # Multer configuration
│   ├── controllers/
│   │   └── prescription.controller.js  # Request handlers
│   ├── services/
│   │   ├── ocr.service.js       # Tesseract OCR logic
│   │   ├── gemini.service.js    # AI simplification
│   │   └── prescription.service.js  # Business logic
│   ├── models/
│   │   └── Prescription.model.js    # MongoDB schema
│   ├── routes/
│   │   ├── index.js             # Route aggregator
│   │   └── prescription.routes.js   # API endpoints
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── validateFile.js      # File validation
│   │   └── asyncHandler.js      # Async wrapper
│   └── utils/
│       └── cleanupFiles.js      # File cleanup utilities
├── uploads/                      # Temporary file storage
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore
├── server.js                    # Application entry point
├── package.json
└── README.md
```

## Processing Pipeline

```
1. Client uploads image (multipart/form-data)
   ↓
2. Multer validates and saves file to uploads/
   ↓
3. File validation middleware checks file
   ↓
4. Controller receives request
   ↓
5. OCR Service (Tesseract.js) extracts text
   ↓
6. Gemini AI Service simplifies medical text
   ↓
7. Prescription saved to MongoDB
   ↓
8. Temporary file deleted
   ↓
9. Response sent to client
```

## Error Handling

All errors return a consistent JSON format:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE"
  }
}
```

Common error codes:
- `NO_FILE` - No file uploaded
- `INVALID_FILE_TYPE` - File type not allowed
- `FILE_TOO_LARGE` - File exceeds size limit
- `OCR_ERROR` - Failed to extract text from image
- `AI_SERVICE_ERROR` - Gemini API error
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests

## Security Features

- **Helmet** - Sets security HTTP headers
- **CORS** - Configured for specific origin
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **File Validation** - Type and size restrictions
- **Input Sanitization** - Via Mongoose schema validation

## Testing

### Manual Testing with cURL

**Upload a prescription:**
```bash
curl -X POST http://localhost:5000/api/prescriptions/analyze \
  -F "prescription=@prescription.jpg"
```

**Get prescription by ID:**
```bash
curl http://localhost:5000/api/prescriptions/YOUR_PRESCRIPTION_ID
```

**List prescriptions:**
```bash
curl http://localhost:5000/api/prescriptions
```

### Testing with Postman

1. Create a new POST request to `http://localhost:5000/api/prescriptions/analyze`
2. Go to Body → form-data
3. Add key: `prescription` (type: File)
4. Choose a prescription image
5. Send request

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, ensure IP whitelist is configured

### Gemini API Error
- Verify `GEMINI_API_KEY` in `.env`
- Check API key is valid at [Google AI Studio](https://ai.google.dev/)
- Ensure you have API quota available

### File Upload Error
- Check file size is under 5MB
- Ensure file type is JPG, JPEG, or PNG
- Verify `uploads/` directory exists and is writable

### OCR Not Working
- Ensure image has clear, readable text
- Try with higher quality images
- Check Tesseract.js installation

## Development

### Adding New Endpoints

1. Create controller in `src/controllers/`
2. Define route in `src/routes/`
3. Add any middleware needed
4. Update this README

### Adding New Services

1. Create service file in `src/services/`
2. Export service functions
3. Import in controller
4. Add error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For issues and questions:
- Check this README
- Review error messages
- Check MongoDB and Gemini API status

## Next Steps

After setting up the backend:
1. Test all endpoints with Postman or cURL
2. Build the React frontend
3. Integrate frontend with this API
4. Deploy to production (Heroku, Railway, etc.)

---

Built with ❤️ for HealNet
