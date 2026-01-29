import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// API route handler (same logic as serverless function)
app.post('/api/send-rsvp', async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const body = req.body;

    // Validate required fields
    const { name, email, phone, attendance, numberOfGuests } = body;

    if (!name || !email || !phone || !attendance || !numberOfGuests) {
      res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Please provide: name, email, phone, attendance, and numberOfGuests'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      res.status(500).json({ error: 'Email service is not configured' });
      return;
    }

    // Get recipient email from environment or use default
    const recipientEmail = process.env.ORGANIZER_EMAIL || 'adityarastogi302@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // Format attendance status
    const attendanceStatus = attendance === 'accept' ? 'Joyfully Accepts' : 'Regretfully Declines';
    
    // Build email content
    const emailSubject = `New RSVP: ${name} - ${attendanceStatus}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Georgia', serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #d4a574;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 25px;
            }
            .label {
              font-weight: bold;
              color: #8b4513;
              margin-bottom: 5px;
            }
            .value {
              margin-left: 10px;
              color: #555;
            }
            .attendance-accept {
              color: #2d5016;
              font-weight: bold;
            }
            .attendance-decline {
              color: #8b0000;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #888;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="color: #8b4513; margin: 0;">New Wedding RSVP</h1>
          </div>
          
          <div class="section">
            <div class="label">Attendance:</div>
            <div class="value ${attendance === 'accept' ? 'attendance-accept' : 'attendance-decline'}">
              ${attendanceStatus}
            </div>
          </div>

          <div class="section">
            <div class="label">Contact Information:</div>
            <div class="value">
              <strong>Name:</strong> ${name}<br>
              <strong>Email:</strong> ${email}<br>
              <strong>Phone:</strong> ${phone}
            </div>
          </div>

          <div class="section">
            <div class="label">Number of Guests:</div>
            <div class="value">${numberOfGuests}</div>
          </div>

          ${body.names ? `
          <div class="section">
            <div class="label">Guest Name(s):</div>
            <div class="value">${body.names}</div>
          </div>
          ` : ''}

          ${body.dietaryRequirements ? `
          <div class="section">
            <div class="label">Dietary Requirements:</div>
            <div class="value">${body.dietaryRequirements}</div>
          </div>
          ` : ''}

          <div class="footer">
            <p>This RSVP was submitted through your wedding website.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Wedding RSVP

Attendance: ${attendanceStatus}

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

Number of Guests: ${numberOfGuests}
${body.names ? `Guest Name(s): ${body.names}\n` : ''}
${body.dietaryRequirements ? `Dietary Requirements: ${body.dietaryRequirements}\n` : ''}

Submitted on: ${new Date().toLocaleString()}
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend API error:', error);
      res.status(500).json({ 
        error: 'Failed to send email',
        details: error.message || 'Unknown error occurred'
      });
      return;
    }

    // Success response
    res.status(200).json({ 
      success: true,
      message: 'RSVP submitted successfully',
      emailId: data?.id
    });

  } catch (error) {
    // Log error for debugging
    console.error('RSVP API error:', error);
    
    // Return generic error message
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Make sure to run 'npm run dev' in another terminal for the frontend`);
});
