# Fix: GitHub OAuth Workflow Scope Issue

## Problem
You're getting this error:
```
! [remote rejected] main -> main (refusing to allow an OAuth App to create or update workflow `.github/workflows/deploy-vercel.yml` without `workflow` scope)
```

This happens because your OAuth token doesn't have the `workflow` scope needed to modify GitHub Actions workflow files.

## Solution: Use a Personal Access Token (PAT)

### Step 1: Create a Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Direct link: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a descriptive name (e.g., "NextJS Tutorial Workflow Access")
4. Set expiration (recommended: 90 days or custom)
5. **Select these scopes:**
   - ✅ `repo` (Full control of private repositories)
     - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - ✅ `workflow` (Update GitHub Action workflows)
6. Click **Generate token**
7. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Update Your Git Credentials

#### Option A: Update Remote URL with Token (Recommended)

```bash
# Replace YOUR_TOKEN with your actual token
# Replace aakash1492 with your GitHub username
git remote set-url origin https://YOUR_TOKEN@github.com/aakash1492/nextjs-tutorial.git
```

#### Option B: Use Git Credential Manager (Windows)

1. When you push, Git will prompt for credentials
2. **Username:** Your GitHub username (`aakash1492`)
3. **Password:** Paste your Personal Access Token (NOT your GitHub password)

#### Option C: Use SSH Instead (Alternative)

If you prefer SSH:

1. Generate SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add SSH key to GitHub:
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**
   - Paste and save

3. Change remote URL:
   ```bash
   git remote set-url origin git@github.com:aakash1492/nextjs-tutorial.git
   ```

### Step 3: Verify and Push

```bash
# Check your remote URL
git remote -v

# Try pushing again
git push origin main
```

## Quick Fix (Temporary)

If you just need to push once, you can use the token directly in the push command:

```bash
git push https://YOUR_TOKEN@github.com/aakash1492/nextjs-tutorial.git main:main
```

## Security Notes

⚠️ **Important:**
- Never commit your token to the repository
- Don't share your token publicly
- Use token expiration dates
- Consider using SSH keys for long-term use
- If using HTTPS with token, consider using Git Credential Manager to store it securely

## Troubleshooting

### Still getting the error?
- Make sure you selected the `workflow` scope when creating the token
- Verify the token hasn't expired
- Try regenerating the token with all required scopes

### Using GitHub CLI?
If you're using `gh` CLI, you may need to re-authenticate:
```bash
gh auth login
# Select: GitHub.com → HTTPS → Login with a web browser
# Or use a token and select the workflow scope
```








