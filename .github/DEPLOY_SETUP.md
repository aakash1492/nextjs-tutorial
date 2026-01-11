# Vercel Deployment Setup Guide

This guide explains how to set up GitHub Actions to automatically deploy to Vercel.

## Prerequisites

1. A Vercel account
2. A GitHub repository
3. Your project connected to Vercel

## Step 1: Get Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **Tokens**
3. Create a new token (name it "GitHub Actions" or similar)
4. Copy the token

5. Go to **Settings** → **General**
6. Copy your **Team ID** (this is your `VERCEL_ORG_ID`)

7. Go to your project settings
8. Copy your **Project ID** (this is your `VERCEL_PROJECT_ID`)

## Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

   - **Name:** `VERCEL_TOKEN`
     **Value:** Your Vercel token from Step 1

   - **Name:** `VERCEL_ORG_ID`
     **Value:** Your Team ID from Step 1

   - **Name:** `VERCEL_PROJECT_ID`
     **Value:** Your Project ID from Step 1

## Step 3: Verify Workflow

1. Push to `main` or `master` branch
2. Go to **Actions** tab in GitHub
3. Watch the deployment workflow run
4. Check Vercel dashboard for the deployment

## How It Works

- **On push to main/master:** Deploys to production (`--prod`)
- **On pull requests:** Creates preview deployments (`--preview`)
- **Before deployment:** Runs linter and builds the project

## Troubleshooting

### Build fails
- Check that all environment variables are set in Vercel dashboard
- Verify `package.json` scripts are correct
- Check build logs in GitHub Actions

### Deployment fails
- Verify all three secrets are set correctly
- Check that Vercel token has proper permissions
- Ensure project is connected to Vercel

### Preview deployments not working
- Check that PR comments have proper permissions
- Verify `VERCEL_PROJECT_ID` is correct

## Environment Variables

If you need build-time environment variables, add them in the workflow file:

```yaml
- name: Build project
  run: npm run build
  env:
    NEXT_PUBLIC_BRAND: brand-a
```

Or set them in Vercel Dashboard under **Settings** → **Environment Variables**.

