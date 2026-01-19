# Multi-Environment Deployment Setup

This guide explains how to set up INT, UAT, and Production environments with approval requirements.

## Overview

The workflow now supports three environments:
- **INT (Integration)**: For development and integration testing
- **UAT (User Acceptance Testing)**: For user acceptance testing
- **Production**: Requires manual approval before deployment

## Step 1: Configure GitHub Environments

### 1.1 Create Environments in GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Environments**
3. Click **New environment** for each environment:

#### INT Environment
- **Name:** `int`
- **Deployment branches:** `develop` or `main` (optional)
- **Protection rules:** None (auto-deploy)

#### UAT Environment
- **Name:** `uat`
- **Deployment branches:** `uat` branch (optional)
- **Protection rules:** None (auto-deploy)

#### Production Environment
- **Name:** `production`
- **Deployment branches:** `main` or `master` (optional)
- **Protection rules:**
  - ✅ **Required reviewers:** Add at least 1 reviewer (or more)
  - ✅ **Wait timer:** Optional (e.g., 5 minutes delay)
  - ✅ **Deployment branches:** Restrict to `main`/`master` only

### 1.2 Add Environment Secrets (if needed)

For each environment, you can add environment-specific secrets:

1. Go to **Settings** → **Environments** → Select environment
2. Under **Environment secrets**, add:
   - `VERCEL_PROJECT_ID_INT` (for INT)
   - `VERCEL_PROJECT_ID_UAT` (for UAT)
   - `VERCEL_PROJECT_ID` (for Production - already exists)

## Step 2: Update GitHub Secrets

Add the following secrets in **Settings** → **Secrets and variables** → **Actions**:

### Required Secrets:
- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel Team/Org ID
- `VERCEL_PROJECT_ID` - Production project ID (already exists)
- `VERCEL_PROJECT_ID_INT` - INT project ID (new)
- `VERCEL_PROJECT_ID_UAT` - UAT project ID (new)

## Step 3: Branch Strategy

### Option A: Branch-based Deployment (Recommended)

- **`develop` branch** → Auto-deploys to INT
- **`uat` branch** → Auto-deploys to UAT
- **`main`/`master` branch** → Requires approval, deploys to Production

### Option B: Manual Deployment

Use **workflow_dispatch** to manually trigger deployments:
1. Go to **Actions** tab
2. Select **Deploy to Vercel** workflow
3. Click **Run workflow**
4. Choose:
   - Environment: `int`, `uat`, or `production`
   - Brand: `brand-a`, `brand-b`, or `brand-c`
5. Click **Run workflow**

## Step 4: How It Works

### Automatic Deployments

- **Push to `develop`** → Deploys to INT (no approval)
- **Push to `uat`** → Deploys to UAT (no approval)
- **Push to `main`/`master`** → Triggers Production deployment (requires approval)

### Production Approval Process

1. When code is pushed to `main`/`master`, the workflow starts
2. The workflow pauses at the Production environment step
3. GitHub sends notifications to required reviewers
4. Reviewers must approve the deployment in:
   - **Actions** tab → Click on the running workflow
   - Or via email notification → Click "Review deployments"
5. After approval, the deployment continues automatically

## Step 5: Update Vercel Project IDs

If you have separate Vercel projects for each environment:

1. **INT Project:**
   - Create a new Vercel project for INT (or use preview deployments)
   - Copy the Project ID
   - Add as secret: `VERCEL_PROJECT_ID_INT`

2. **UAT Project:**
   - Create a new Vercel project for UAT (or use preview deployments)
   - Copy the Project ID
   - Add as secret: `VERCEL_PROJECT_ID_UAT`

3. **Production Project:**
   - Use your existing production project
   - Project ID is already in `VERCEL_PROJECT_ID` secret

## Step 6: Update URLs in Workflow

Update the environment URLs in `.github/workflows/deploy-vercel.yml`:

```yaml
environment:
  name: int
  url: https://int.your-app.vercel.app  # Update this
```

Replace with your actual Vercel deployment URLs.

## Troubleshooting

### Production deployment not asking for approval

1. Check that the `production` environment exists in GitHub
2. Verify protection rules are enabled (required reviewers)
3. Ensure the workflow uses `environment: production`

### Wrong environment deploying

- Check branch names match the workflow conditions
- Verify `workflow_dispatch` inputs if using manual deployment
- Check the `if` conditions in each job

### Secrets not found

- Verify all secrets are added in **Settings** → **Secrets and variables** → **Actions**
- Check secret names match exactly (case-sensitive)
- For environment-specific secrets, add them in the environment settings

## Example: Deployment Flow

```
Developer pushes to `develop`
  ↓
Auto-deploy to INT
  ↓
Testing passes
  ↓
Merge to `uat` branch
  ↓
Auto-deploy to UAT
  ↓
UAT testing passes
  ↓
Merge to `main` branch
  ↓
Production deployment triggered
  ↓
⏸️  WAITING FOR APPROVAL
  ↓
Reviewer approves
  ↓
✅ Deployed to Production
```

## Manual Deployment Example

To manually deploy a specific brand to production:

1. Go to **Actions** → **Deploy to Vercel**
2. Click **Run workflow**
3. Select:
   - **Environment:** `production`
   - **Brand:** `brand-a` (or brand-b, brand-c)
4. Click **Run workflow**
5. Approve when prompted (if required)

