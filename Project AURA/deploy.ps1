# deploy.ps1
# This script builds a Docker image and deploys it to Google Cloud Run autonomously using gcloud CLI.

param (
    [string]$ProjectID = $(Read-Host -Prompt "Enter your GCP Project ID"),
    [string]$Region = "us-central1",
    [string]$ServiceName = "project-aura",
    [string]$GoogleApiKey = $(Read-Host -Prompt "Enter your Google AI API Key (Leave blank to use mock AI)")
)

if (-not $ProjectID) {
    Write-Host "Project ID is required. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "Starting deployment for Project AURA to Cloud Run..." -ForegroundColor Cyan

# 1. Enable Required Services
Write-Host "Enabling Cloud Run and Cloud Build APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com --project=$ProjectID

# 2. Build and Submit to Google Cloud Build
Write-Host "Submitting build to Cloud Build..."
gcloud builds submit --tag gcr.io/$ProjectID/$ServiceName --project=$ProjectID

# 3. Deploy to Cloud Run
Write-Host "Deploying image to Cloud Run..."
$envVars = "PORT=8080"
if ($GoogleApiKey) {
    $envVars += ",GOOGLE_API_KEY=$GoogleApiKey"
}

gcloud run deploy $ServiceName `
    --image gcr.io/$ProjectID/$ServiceName `
    --platform managed `
    --region $Region `
    --allow-unauthenticated `
    --project $ProjectID `
    --set-env-vars $envVars

Write-Host "Deployment Complete!" -ForegroundColor Green
$ServiceUrl = gcloud run services describe $ServiceName --platform managed --region $Region --format="value(status.url)" --project=$ProjectID
Write-Host "Your application is accessible at: $ServiceUrl" -ForegroundColor Magenta
