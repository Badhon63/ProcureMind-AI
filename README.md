# ProcureMind AI

An AI powered procurement and sourcing platform that helps companies create, manage, and analyze procurement requests (RFPs) using modern web technologies and AI assistance.

## Overview

ProcureMind AI allows businesses to create procurement requests, organize sourcing requirements, explore available opportunities, and generate detailed procurement specifications with the help of AI.

The platform combines a full stack architecture with authentication, database management, and AI powered tools to simplify procurement workflows.

## Features

### Authentication

• Email and password authentication  
• Google OAuth login  
• Secure session management using Better Auth  

### Procurement Request Management

• Create procurement requests  
• View all available RFPs  
• View personal procurement requests  
• Delete requests  
• Detailed request pages  
• Image support through URL  

### Explore Marketplace

• Search procurement requests  
• Filter by category  
• Filter by location  
• Sort by budget and creation date  
• Responsive procurement cards  
• View detailed request information  

### AI Features

#### AI Procurement Specification Generator

Generate detailed procurement specifications from:

• Title  
• Short description  

Supports:

• Short specification  
• Medium specification  
• Long specification  

Users can regenerate AI generated specifications when needed.

#### AI Procurement Data Analyzer

Analyze procurement budget information using AI to generate useful insights.

## Tech Stack

### Frontend

• Next.js App Router  
• TypeScript  
• Tailwind CSS  
• TanStack Query  
• Axios  
• Lucide React  

### Backend

• Express.js  
• TypeScript  
• MongoDB  
• MongoDB Driver  

### Authentication

• Better Auth  
• Email and password authentication  
• Google OAuth  

### Artificial Intelligence

• Groq API  
• Llama 3.3 70B Versatile Model  

## Project Structure

```
ProcureMind AI

frontend/
│
├── app/
│   ├── api/
│   │   └── auth/
│   ├── explore/
│   ├── insights/
│   ├── items/
│   │   ├── add/
│   │   ├── manage/
│   │   └── [id]/
│   ├── login/
│   ├── register/
│   └── page.tsx
│
├── components/
├── lib/
└── types/


backend/

src/
│
├── models/
├── routes/
└── server.ts
```

## Future Improvements

Possible future improvements:

• Supplier recommendation system  
• AI procurement chatbot  
• Advanced analytics dashboard  
• Document based procurement analysis  
• Automated supplier matching  

## Purpose

This project was developed as a university full stack AI project demonstrating:

• Modern web application development  
• Authentication systems  
• Database integration  
• AI API integration  
• Responsive UI design  
• Full stack architecture

## License

This project is created for educational purposes.
