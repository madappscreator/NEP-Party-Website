Cloud Functions template for NEP

This folder contains a TypeScript Cloud Functions template that implements a callable function `generateMembershipId`.

How it works

- `generateMembershipId` is an HTTPS callable function.
- It requires an authenticated Firebase user (client must sign in first).
- It performs a Firestore transaction on `counters/members` to increment a sequential counter and returns a membershipId like `NEP000123`.

Local development and deploy

1. Install dependencies inside the `functions` folder:

```bash
cd functions
npm install
```

2. Build the functions:

```bash
npm run build
```

3. Deploy functions to Firebase:

```bash
npm run deploy
```

Client usage (example)

From the web client (Firebase v9 modular SDK):

```ts
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const generateMembershipId = httpsCallable(functions, 'generateMembershipId');

// after user is authenticated
const res = await generateMembershipId();
const membershipId = res.data.membershipId;
```

Security note

The callable function runs with admin privileges and bypasses Firestore security rules for the operations performed within it. Ensure callers are properly authenticated and consider additional checks (e.g., rate limiting, verifying eligibility) depending on production needs.
