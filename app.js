const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const articleRoutes = require('./routes/articles');
const propertyRoutes = require('./routes/properties');
const inquiryRoutes = require('./routes/inquiries');
const leadRoutes    = require('./routes/leads');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security
app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL, 
  process.env.ADMIN_URL, 
  process.env.CORS_ORIGIN,
  'https://zobiit.com',
  'https://www.zobiit.com',
  'https://zobiit-main-7x1y.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or REST tools (origin is undefined)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed list exactly or as a subdomain
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      try {
        const allowedHost = new URL(allowed).hostname;
        const originHost = new URL(origin).hostname;
        return originHost === allowedHost || originHost.endsWith('.' + allowedHost);
      } catch {
        return allowed.includes(origin);
      }
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again.' },
});
app.use('/api/', limiter);

// Performance
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/leads', leadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
