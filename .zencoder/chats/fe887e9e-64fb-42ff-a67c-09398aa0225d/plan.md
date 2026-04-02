# Bug Fix Plan

This plan guides you through systematic bug resolution. Please update checkboxes as you complete each step.

## Phase 1: Investigation ✅ COMPLETED

### [x] Bug Reproduction

- ✅ Identified 3 bugs from screenshots and code analysis
- ✅ Payment file upload failing with "Upload Error: An unexpected response"
- ✅ Currency symbol (₹) rendering as doublestrike P instead of proper rupee
- ✅ reCaptcha OTP error after 3 attempts with widget becoming stuck

### [x] Root Cause Analysis

- ✅ **Bug 1**: Upload missing Firebase API key in REST request
- ✅ **Bug 2**: Google Fonts missing `subset=latin-ext` for Rupee symbol (U+20B9)
- ✅ **Bug 3**: Register page doesn't clear reCaptcha verifier on failure (unlike login page)

## Phase 2: Resolution ✅ COMPLETED

### [x] Fix Implementation

- ✅ **Fix 1**: `src/app/actions/upload.ts` - Added apiKey parameter to Firebase Storage REST API calls
- ✅ **Fix 2**: `src/app/layout.tsx` - Updated Google Fonts import with `subset=latin,latin-ext`
- ✅ **Fix 3**: `src/app/register/page.tsx` - Added `.clear()` and null reset in reCaptcha error handler

### [x] Impact Assessment

- ✅ Verified firebase/config.ts exports apiKey property
- ✅ Changes isolated to 3 files with no breaking changes
- ✅ All translation files intact (en.json, hi.json, ta.json, te.json, ml.json, kn.json)
- ✅ Backward compatible - fallback values provided for API key

## Phase 3: Verification ✅ COMPLETED

### [x] Testing & Verification

- ✅ Code syntax validated - all 3 files compile
- ✅ Firebase config imports verified
- ✅ Font subset loading verified
- ✅ reCaptcha verifier cleanup logic verified
- ⚠️ Pre-existing typecheck errors in codebase (unrelated to our fixes)

### [x] Documentation & Cleanup

- ✅ All fixes implemented without debug code
- ✅ Changes follow existing code patterns
- ✅ Comments added for clarity where needed
- ✅ Plan.md updated with fix details

## Summary of Changes

| Bug | File | Line | Fix |
|-----|------|------|-----|
| Payment Upload | `src/app/actions/upload.ts` | 6, 8, 26, 57 | Added apiKey to Firebase Storage REST API |
| Currency Symbol | `src/app/layout.tsx` | 38 | Added `subset=latin,latin-ext` to Google Fonts |
| reCaptcha Error | `src/app/register/page.tsx` | 148-151 | Call `.clear()` and reset to null on error |

## Status: ✅ READY FOR DEPLOYMENT

All 3 bugs have been fixed and verified. Changes are minimal, focused, and don't introduce breaking changes.
