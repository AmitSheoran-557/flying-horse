# Flying Horse Visa Services Pvt Ltd

A modern, full-featured website for Flying Horse Visa Services with course management, payment integration, and progressive lesson unlocking.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:
```env
JWT_SECRET=your-super-secret-jwt-key-here-min-32-characters
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Add Images

Place your images in the `public/images/` directory:
- `owner.jpg` - Owner/Founder photo (800x800px recommended)
- `pte-course.jpg` - PTE course thumbnail
- `ielts-course.jpg` - IELTS course thumbnail  
- `spoken-english-course.jpg` - Spoken English course thumbnail

## ✨ Features

### 🏠 Landing Page
- Modern hero section with animated background
- Owner image with futuristic effects
- "Why Choose Us" section
- Course showcase
- Responsive design

### 📚 Three Courses
- **PTE Academic** (₹15,000) - 8 weeks, 32 lessons
- **IELTS Preparation** (₹12,000) - 10 weeks, 40 lessons
- **Spoken English** (₹8,000) - 6 weeks, 24 lessons

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing

### 💳 Payment Integration
- Stripe payment gateway
- Secure checkout
- Automatic course enrollment

### 🎓 Learning Platform
- Video-based lessons
- **One lesson unlocks per day** (progressive learning)
- Progress tracking
- Course completion tracking

### 📱 Mobile Menu
- Slides in from right to left
- Prevents background scrolling
- Smooth animations
- Contact information included

### 🎨 Modern UI/UX
- Futuristic animations with Framer Motion
- Custom 404 and error pages
- Toast notifications
- Loading states
- Responsive design

## 🏢 Company Information

**Flying Horse Visa Services Pvt Ltd**
- **Address**: SCO 73-74, Red Square Market, Hisar, Haryana
- **Email**: enquiry.flyhousevisaservices@gmail.com
- **Services**: Visa Services, PTE, IELTS, Spoken English

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: JWT + bcryptjs
- **Payment**: Stripe
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
flying-horse-visa-services/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── courses/          # Course pages
│   ├── dashboard/        # User dashboard
│   ├── learn/            # Learning platform
│   ├── payment/          # Payment pages
│   ├── contact/          # Contact page
│   ├── error.tsx         # Error page
│   ├── not-found.tsx     # 404 page
│   ├── page.tsx          # Homepage
│   └── layout.tsx        # Root layout
├── components/
│   ├── layout/           # Header, Footer
│   └── providers/        # Context providers
├── lib/                  # Utilities
├── public/
│   └── images/           # Static images
└── hooks/                # Custom hooks
```

## 🔧 Configuration

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add keys to `.env.local`
4. Test with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### JWT Secret
Generate a secure random string (min 32 characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
- Set `JWT_SECRET` to a strong random string
- Use production Stripe keys
- Set `NEXT_PUBLIC_BASE_URL` to your domain

## 🔒 Security Notes

- Change JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting
- Add CORS configuration
- Regular security updates

## 📝 Development Notes

### Current Implementation
- Uses in-memory storage (for demo)
- Replace with database for production (PostgreSQL, MongoDB, etc.)
- Consider using Prisma ORM

### Progressive Lesson Unlocking
- One lesson unlocks per day after enrollment
- Calculated based on enrollment date
- Prevents course rushing for better learning

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npm run build
```

## 📞 Support

For technical support or questions:
- Email: enquiry.flyhousevisaservices@gmail.com
- Location: SCO 73-74, Red Square Market, Hisar, Haryana

## 📄 License

Proprietary software for Flying Horse Visa Services Pvt Ltd.

---

Built with ❤️ using Next.js and modern web technologies