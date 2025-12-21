# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firebase Storage CORS

If you upload files directly from the browser to Firebase Storage and encounter CORS/preflight errors, apply a CORS policy to the GCS bucket.

1. Create `cors.json` in the repository (already provided).
2. Install or enable the Google Cloud SDK (`gsutil`).
3. Run the following command (replace bucket name if different):

```bash
gsutil cors set cors.json gs://studio-8928688313-be767.appspot.com
```

This sets allowed origins (`https://www.allindianep.com` and `http://localhost:3000`), methods, and exposed response headers required by the app.
