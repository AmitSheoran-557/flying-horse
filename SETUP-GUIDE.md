# Flying Horse Visa Services - Setup Guide

## ✅ What Has Been Built

A complete, modern website for Flying Horse Visa Services Pvt Ltd with the following features:

### 🎨 Pages Created
1. **Homepage** (`app/page.tsx`)
   - Futuristic hero section with animated background
   - Owner image with glowing effects and orbiting icons
   - "Why Choose Us" section
   - Course showcase
   - CTA sections

2. **Courses Page** (`app/courses/page.tsx`)
   - All three courses displayed
   - Detailed pricing and features

3. **Course Detail Pages** (`app/courses/[courseId]/page.tsx`)
   - Individual course information
   - Curriculum breakdown
   - Enrollment button with Stripe integration

4. **Contact Page** (`app/contact/page.tsx`)
   - Working contact form
   - Company information
   - Office hours

5. **Authentication Pages**
   - Login (`app/auth/login/page.tsx`)
   - Register (`app/auth/register/page.tsx`)

6. **Dashboard** (`app/dashboard/page.tsx`)
   - User course overview
   - Progress tracking
   - Quick actions

7. **Learning Platform** (`app/learn/[courseId]/page.tsx`)
   - Video lessons
   - Progressive unlocking (1 lesson/day)
   - Progress tracking

8. **Error Pages**
   - Custom 404 page (`app/not-found.tsx`)
   - Custom error page (`app/error.tsx`)
   - Both with futuristic animations

### 🎯 Key Features

#### Mobile Menu
- ✅ Slides in from right to left
- ✅ Full width on mobile screens
- ✅ Prevents background scrolling
- ✅ Close button inside menu
- ✅ Contact information included
- ✅ Smooth animations

#### Authentication
- ✅ JWT-based authentication
- ✅ Secure password hashing
- ✅ Protected routes
- ✅ User session management

#### Payment Integration
- ✅ Stripe checkout
- ✅ Secure payment processing
- ✅ Automatic course enrollment
- ✅ Payment success page

#### Progressive Learning
- ✅ One lesson unlocks per day
- ✅ Based on enrollment date
- ✅ Progress tracking
- ✅ Video player integration

#### Modern UI/UX
- ✅ Framer Motion animations
- ✅ Futuristic effects
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading states

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
JWT_SECRET=your-32-character-secret-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Add Images (Optional)
Place in `public/images/`:
- `owner.jpg` - Owner/founder photo (800x800px)
- Course thumbnails (optional)

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 768px (sm-md)
- **Desktop**: 768px+ (md+)
- **Large Desktop**: 1024px+ (lg+)

## 🎨 Color Scheme

- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray shades
- **Accent**: Green, Yellow (for badges)
- **Background**: White, Gray-50

## 📂 Project Structure

```
flying-horse-visa-services/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── contact/      # Contact form
│   │   └── create-checkout-session/  # Stripe
│   ├── auth/             # Login/Register pages
│   ├── courses/          # Course pages
│   ├── dashboard/        # User dashboard
│   ├── learn/            # Learning platform
│   ├── payment/          # Payment pages
│   ├── contact/          # Contact page
│   ├── error.tsx         # Error page
│   ├── not-found.tsx     # 404 page
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Footer
│   └── providers/
│       └── AuthProvider.tsx  # Auth context
├── hooks/
│   └── useAuth.ts        # Auth hook
├── lib/
│   └── data-store.ts     # In-memory data store
├── public/
│   └── images/           # Static images
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🔧 Configuration Files

### Tailwind Config
- Custom colors (primary, secondary)
- Custom animations (fade-in, slide-up)
- Responsive breakpoints

### Next.js Config
- App Router enabled
- Image domains configured

### TypeScript Config
- Strict mode enabled
- Path aliases configured (@/*)

## 🎓 Courses

### 1. PTE Academic
- **Price**: ₹15,000
- **Duration**: 8 weeks
- **Lessons**: 32
- **Features**: Live classes, practice tests, feedback

### 2. IELTS Preparation
- **Price**: ₹12,000
- **Duration**: 10 weeks
- **Lessons**: 40
- **Features**: All 4 skills, band guarantee

### 3. Spoken English
- **Price**: ₹8,000
- **Duration**: 6 weeks
- **Lessons**: 24
- **Features**: Conversation practice, confidence building

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- Secure payment processing
- Input validation
- XSS protection

## 📞 Company Information

**Flying Horse Visa Services Pvt Ltd**
- **Address**: SCO 73-74, Red Square Market, Hisar, Haryana
- **Email**: enquiry.flyhousevisaservices@gmail.com
- **Services**: Visa Services, PTE, IELTS, Spoken English

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
```

### Build Errors
```bash
npm run build
```

## 📝 Next Steps

1. **Add Real Database**
   - Replace in-memory storage
   - Use PostgreSQL/MongoDB
   - Implement Prisma ORM

2. **Add Real Images**
   - Owner photo
   - Course thumbnails
   - Optimize images

3. **Configure Stripe**
   - Add production keys
   - Set up webhooks
   - Test payments

4. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Configure environment variables

5. **Add Content**
   - Real course videos
   - Actual lesson content
   - User testimonials

## 🎯 Features to Add (Optional)

- Email notifications
- SMS notifications
- Certificate generation
- Live chat support
- Blog section
- Testimonials page
- FAQ section
- Admin dashboard
- Analytics integration

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Stripe Docs](https://stripe.com/docs)

## 💡 Tips

1. Test on multiple devices
2. Optimize images before uploading
3. Use environment variables for secrets
4. Regular security updates
5. Monitor error logs
6. Backup database regularly

---

Built with ❤️ for Flying Horse Visa Services Pvt Ltd