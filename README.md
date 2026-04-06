<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,8,16&height=220&section=header&text=🌿%20FarmerEats&fontSize=72&fontAlignY=38&animation=twinkling&fontColor=ffffff&desc=Farm-to-Table%20Mobile%20App%20%7C%20React%20Native%20%2B%20Expo&descSize=20&descAlignY=58"/>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=22&pause=1000&color=D5715B&center=true&vCenter=true&multiline=true&width=700&height=80&lines=React+Native+%7C+Expo+SDK+54+%7C+REST+API;Multi-Step+Registration+%7C+JWT+Auth;Farmer-to-Consumer+Marketplace+App" alt="Typing SVG" />

<br/>

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Axios](https://img.shields.io/badge/Axios-REST%20API-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com)

[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-3DDC84?style=for-the-badge&logo=android&logoColor=white)](#)
[![Navigation](https://img.shields.io/badge/Navigation-Stack%20v7-FF6B6B?style=for-the-badge&logo=react&logoColor=white)](#)
[![Screens](https://img.shields.io/badge/Screens-12+-brightgreen?style=for-the-badge)](#)
[![API](https://img.shields.io/badge/API-sowlab.com-orange?style=for-the-badge)](#)

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

---

## 📋 Table of Contents

<div align="center">

| # | Section |
|---|---------|
| 1 | [🌟 About the Project](#-about-the-project) |
| 2 | [✨ Features](#-features) |
| 3 | [🏗️ App Architecture](#-app-architecture) |
| 4 | [📱 Screen Flow](#-screen-flow) |
| 5 | [🛠️ Tech Stack](#-tech-stack) |
| 6 | [📁 Project Structure](#-project-structure) |
| 7 | [🚀 Getting Started](#-getting-started) |
| 8 | [🔌 API Reference](#-api-reference) |
| 9 | [🎨 Design System](#-design-system) |
| 10 | [👨‍💻 Developer](#-developer) |

</div>

---

## 🌟 About the Project

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=5EA25F&center=false&vCenter=true&width=700&lines=Connecting+local+farmers+directly+to+consumers...;Built+with+React+Native+%2B+Expo+for+maximum+reach!" alt="About" />

**FarmerEats** is a full-featured mobile application built as part of a practical assignment for **sowlab.com**. It creates a direct bridge between local farmers and consumers, enabling farmers to register their business, set operating hours, upload verification documents, and manage their farm profile.

The app is built using **React Native** with **Expo SDK 54**, integrating REST APIs, multi-step registration flows, JWT authentication, and secure local storage — all with a premium, polished design.

### 🎯 Assignment Objectives Covered

- ✅ Splash Screen with animated intro
- ✅ 3-slide Onboarding carousel with animated dot indicators
- ✅ Login with email/password + JWT token storage
- ✅ 5-step Farmer Registration flow with data accumulation
- ✅ Forgot Password → OTP Verification → Reset Password
- ✅ Home Dashboard with user stats
- ✅ Full API integration with sowlab.com/assignment
- ✅ Custom reusable component library

---

## ✨ Features

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **JWT Authentication** | Secure login with token persistence via AsyncStorage | ✅ Done |
| 📋 **5-Step Registration** | Multi-screen form with shared state via module-level object | ✅ Done |
| 📱 **Onboarding Carousel** | Horizontal FlatList with animated expanding dots | ✅ Done |
| 🔑 **Forgot Password Flow** | Mobile OTP → 6-digit verify → reset with strength meter | ✅ Done |
| 📄 **Document Upload** | Business registration proof via expo-document-picker | ✅ Done |
| 🕐 **Business Hours** | Day-by-day time slot selector with schedule summary | ✅ Done |
| 🗺️ **State Dropdown** | All 50 US states with custom dropdown (no external lib) | ✅ Done |
| 💪 **Password Strength** | Real-time visual strength indicator (weak/medium/strong) | ✅ Done |
| 🎨 **Custom Components** | Reusable `CustomInput`, `CustomButton`, `StepIndicator` | ✅ Done |
| 🌿 **Brand Design System** | Consistent colors, fonts (BeVietnamPro), spacing tokens | ✅ Done |

</div>

---

## 🏗️ App Architecture

```
┌─────────────────────────────────────────────────────┐
│                    index.js                          │
│            registerRootComponent(App)                │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                     App.js                           │
│  ┌────────────────┐   ┌──────────────────────────┐  │
│  │  Fonts Loader  │   │  GestureHandlerRootView  │  │
│  │ (BeVietnamPro) │   │  ┌─────────────────────┐ │  │
│  └────────────────┘   │  │    AuthProvider      │ │  │
│                       │  │  ┌────────────────┐  │ │  │
│                       │  │  │  AppNavigator  │  │ │  │
│                       │  │  └────────────────┘  │ │  │
│                       │  └─────────────────────┘ │  │
│                       └──────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│              Stack Navigator (12 screens)            │
│                                                      │
│  Splash → Onboarding → Login → Register(1→5)        │
│  ForgotPassword → OTP → ResetPassword → Home        │
└─────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                  Data Layer                          │
│  ┌─────────────┐  ┌───────────┐  ┌──────────────┐  │
│  │ AuthContext │  │  authApi  │  │ registerData │  │
│  │ (JWT token) │  │  (axios)  │  │ (shared obj) │  │
│  └─────────────┘  └───────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 📱 Screen Flow

```
┌──────────┐     2.8s      ┌─────────────┐    swipe/skip
│  SPLASH  │ ──────────── ▶│  ONBOARDING │ ──────────────▶
│  🌿      │               │ 3 slides    │
└──────────┘               └─────────────┘
                                                    │
                                                    ▼
     ┌──────────────────────────────────────────────────┐
     │                    LOGIN                         │
     │  email + password → POST /user/login → JWT      │
     └──────────────────────────────────────────────────┘
              │                         │
         REGISTER                 FORGOT PASSWORD
              │                         │
     ┌────────▼──────────┐     ┌────────▼──────────┐
     │   Register Step 1 │     │  Forgot Password  │
     │   Personal Info   │     │  Mobile Number    │
     └────────┬──────────┘     └────────┬──────────┘
              │                         │
     ┌────────▼──────────┐     ┌────────▼──────────┐
     │   Register Step 2 │     │    OTP Screen     │
     │   Farm/Business   │     │   6-digit verify  │
     └────────┬──────────┘     └────────┬──────────┘
              │                         │
     ┌────────▼──────────┐     ┌────────▼──────────┐
     │   Register Step 3 │     │  Reset Password   │
     │   Document Upload │     │  Strength meter   │
     └────────┬──────────┘     └───────────────────┘
              │
     ┌────────▼──────────┐
     │   Register Step 4 │
     │   Business Hours  │
     └────────┬──────────┘
              │
     ┌────────▼──────────┐        ┌─────────────┐
     │   Register Step 5 │ ──────▶│    HOME     │
     │   Review+Submit   │        │  Dashboard  │
     └───────────────────┘        └─────────────┘
```

---

## 🛠️ Tech Stack

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<div align="center">

### Core Framework

<p>
  <img src="https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

### Navigation & UI

<p>
  <img src="https://img.shields.io/badge/@react--navigation/stack-v7-FF6B6B?style=for-the-badge&logo=react&logoColor=white" alt="React Navigation"/>
  <img src="https://img.shields.io/badge/Gesture%20Handler-v2.28-green?style=for-the-badge" alt="Gesture Handler"/>
  <img src="https://img.shields.io/badge/Linear%20Gradient-v15-purple?style=for-the-badge" alt="Linear Gradient"/>
</p>

### Fonts & Assets

<p>
  <img src="https://img.shields.io/badge/BeVietnamPro-Google%20Font-4285F4?style=for-the-badge&logo=google-fonts&logoColor=white" alt="BeVietnamPro"/>
  <img src="https://img.shields.io/badge/@expo%2Fvector--icons-v15-FF5722?style=for-the-badge" alt="Vector Icons"/>
</p>

### Networking & Storage

<p>
  <img src="https://img.shields.io/badge/Axios-v1.14-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/AsyncStorage-v2.2-orange?style=for-the-badge" alt="AsyncStorage"/>
</p>

### File & Media

<p>
  <img src="https://img.shields.io/badge/expo--document--picker-v14-blue?style=for-the-badge" alt="Document Picker"/>
  <img src="https://img.shields.io/badge/expo--image--picker-v17-green?style=for-the-badge" alt="Image Picker"/>
</p>

</div>

---

## 📁 Project Structure

```
FarmerEatsApp/
│
├── 📄 index.js                    # Entry point (registerRootComponent)
├── 📄 App.js                      # Root: fonts + providers + navigator
├── 📄 app.json                    # Expo config (name, icons, splash)
├── 📄 babel.config.js             # Babel transpiler config
├── 📄 package.json                # Dependencies
│
├── 📂 assets/                     # App icons, splash, adaptive icons
│
└── 📂 src/
    │
    ├── 📂 api/
    │   └── authApi.js             # All REST API calls (axios)
    │       ├── loginUser()
    │       ├── registerUser()
    │       ├── forgotPassword()
    │       ├── verifyOTP()
    │       └── resetPassword()
    │
    ├── 📂 context/
    │   └── AuthContext.js         # JWT token state, login/logout
    │
    ├── 📂 navigation/
    │   └── AppNavigator.js        # Stack navigator, screen definitions
    │
    ├── 📂 theme/
    │   └── colors.js              # Design token: primary, secondary, etc.
    │
    ├── 📂 components/             # Reusable UI components
    │   ├── CustomButton.js        # Primary/outline/secondary variants
    │   ├── CustomInput.js         # Input with icon, error, eye toggle
    │   └── StepIndicator.js       # Progress dots for registration
    │
    └── 📂 screens/                # 12 screens
        ├── SplashScreen.js        # Animated logo entry (2.8s)
        ├── OnboardingScreen.js    # 3-slide horizontal onboarding
        ├── LoginScreen.js         # Email/password login
        ├── RegisterStep1Screen.js # Personal info + shared registerData{}
        ├── RegisterStep2Screen.js # Farm/business info + US state picker
        ├── RegisterStep3Screen.js # Document upload (expo-document-picker)
        ├── RegisterStep4Screen.js # Business hours (day × time slot grid)
        ├── RegisterStep5Screen.js # Review + FormData multipart submit
        ├── ForgotPasswordScreen.js# Mobile number input
        ├── OTPScreen.js           # 6-box OTP input with auto-focus
        ├── ResetPasswordScreen.js # New password + strength indicator
        └── HomeScreen.js          # Dashboard with stats and quick actions
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.x
npm >= 9.x
Expo Go app on your Android/iOS device
```

### Installation

```bash
# 1. Clone the repo (or navigate to project folder)
cd "FarmerEatsApp"

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start Metro bundler with cleared cache
npx expo start --clear

# 4. Scan the QR code with Expo Go app
#    OR press 'a' for Android, 'w' for web
```

### Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| White screen on Expo Go | Ensure `newArchEnabled: false` in `app.json` |
| `babel-preset-expo` not found | Run `npm install babel-preset-expo --save-dev` |
| Terminal hangs on press `a` | Old Expo process still running — open new terminal |
| `Cannot find module 'worklets'` | Don't use `react-native-reanimated@^4.x` with Expo Go |
| Fonts not loading | Clear cache: `npx expo start --clear` |

---

## 🔌 API Reference

**Base URL:** `https://sowlab.com/assignment`

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/user/login` | POST | Login with email + password | ❌ |
| `/user/register` | POST | Register new farmer (multipart) | ❌ |
| `/user/forgot-password` | POST | Send OTP to mobile | ❌ |
| `/user/verify-otp` | POST | Verify 6-digit OTP | ❌ |
| `/user/reset-password` | POST | Set new password with token | ❌ |

### Login Request Body
```json
{
  "email": "farmer@example.com",
  "password": "password123",
  "role": "farmer",
  "device_token": "expo_device_token",
  "type": "email"
}
```

### Register (FormData fields)
```
full_name, email, phone, password, role,
business_name, informal_name, address, city,
state, zip_code, business_hours (JSON string),
device_token, type, registration_proof (file)
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#D5715B` | Buttons, active states, brand |
| `secondary` | `#F2C94C` | Highlights, accents |
| `tertiary` | `#5EA25F` | Success, green badges |
| `dark` | `#261C12` | Body text, headings |
| `white` | `#FFFFFF` | Backgrounds |
| `inputBg` | `rgba(38,28,18,0.08)` | Input field backgrounds |
| `error` | `#E53935` | Error states, validation |

### Typography

All text uses **BeVietnamPro** (Google Fonts) with 4 weights:

| Weight | Font Name | Usage |
|--------|-----------|-------|
| 400 | `BeVietnamPro_400Regular` | Body text, subtitles |
| 500 | `BeVietnamPro_500Medium` | Labels, secondary text |
| 600 | `BeVietnamPro_600SemiBold` | Links, emphasized text |
| 700 | `BeVietnamPro_700Bold` | Headings, buttons, brand |

---

## 👨‍💻 Developer

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<div align="center">

### **Kinshuk Saxena**

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=18&pause=1000&color=D5715B&center=true&vCenter=true&width=500&lines=Full+Stack+Developer;React+Native+%2B+Expo+Enthusiast;Music+Lover+%F0%9F%8E%B5;Always+Learning" alt="Typing SVG" />

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-kinshukkush-181717?style=for-the-badge&logo=github)](https://github.com/kinshukkush)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kinshuk--saxena-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kinshuk-saxena-/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Website-D5715B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-frontend-mu-snowy.vercel.app/)
[![Email](https://img.shields.io/badge/Email-kinshuksaxena3%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kinshuksaxena3@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-%2B91%209057538521-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+919057538521)

<br/>

**Made with ❤️ and 🌿 by Kinshuk Saxena**

⭐ **Star this repo if you found it helpful!** ⭐

<a href="https://github.com/kinshukkush">
  <img src="https://img.shields.io/github/followers/kinshukkush?style=social" alt="Followers"/>
</a>

</div>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,8,16&height=120&section=footer" width="100%"/>
</div>
