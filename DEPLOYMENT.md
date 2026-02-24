# Vercel Deployment Guide

This project is now configured for production deployment on Vercel without requiring a database.

## Key Changes Made for Production Readiness

### 1. **Drizzle Configuration**
- Updated `drizzle.config.ts` to allow builds without `DATABASE_URL` environment variable
- The build process no longer throws errors if the database URL is missing
- Database migrations can be run separately after deployment

### 2. **Database Error Handling**
- Updated `server/db.ts` to gracefully handle missing `DATABASE_URL` in production
- The application will run with stub database operations if no database is configured
- Full database functionality is available when `DATABASE_URL` is set

### 3. **Static File Serving**
- Improved `static.ts` to correctly locate built client files in Vercel's environment
- Added fallback paths for both bundled and development scenarios

### 4. **Vercel Configuration Files**
- **vercel.json**: Configures build, output directory, and cache headers
- **.vercelignore**: Excludes unnecessary files from deployment

## Deployment Steps

### Option 1: Deploy Without Database (Recommended for testing)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click "Deploy"
   - Your app will build and deploy automatically

3. **Access your deployed app**
   - Vercel will provide you with a domain (e.g., `your-app.vercel.app`)

### Option 2: Deploy With Database

1. **Set up your database**
   - Use a PostgreSQL provider like:
     - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
     - [Railway](https://railway.app)
     - [Render](https://render.com)
     - [AWS RDS](https://aws.amazon.com/rds/)

2. **Get your database connection string**
   - Format: `postgresql://user:password@host:port/database`

3. **Deploy to Vercel**
   - Connect your GitHub repo to Vercel (https://vercel.com/new)
   - During project setup, add environment variable:
     - Key: `DATABASE_URL`
     - Value: Your database connection string
   - Click "Deploy"

4. **Run database migrations**
   - After deployment, run the database setup:
   ```bash
   npm run db:push
   ```
   - Or set up a webhook to run migrations on deploy

## Environment Variables

### Available Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | PostgreSQL connection string. If not provided, the app runs with stub database |
| `NODE_ENV` | Auto | Set to `production` by Vercel automatically |
| `PORT` | Auto | Set by Vercel (usually 3000). Falls back to 5000 in development |

### Adding Environment Variables in Vercel

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your `DATABASE_URL` if using a database
4. Redeploy to apply the changes

## Troubleshooting

### Build Fails on Vercel

**Issue**: Build fails with database-related errors
- **Solution**: The `.env.example` file shows optional variables. Ensure DATABASE_URL is only set if you have a database configured.

### Static Files Not Loading

**Issue**: CSS, JavaScript, or images missing after deployment
- **Solution**: Make sure the build completed successfully. Check Vercel build logs for errors.
- The client build output should be in `dist/public/`

### Database Connection Errors

**Issue**: "DATABASE_URL not set" error in production
- **Solution**: This is expected if you haven't configured a database. The app will run with stub database operations for testing purposes.
- To use a real database, add the `DATABASE_URL` environment variable to your Vercel project settings.

### Application Running but Returns 404

**Issue**: All routes return 404
- **Solution**: Check that the Express server is properly serving the static files. Ensure the build output includes `dist/public/index.html`.

## Performance Optimization Tips

1. **Enable Edge Caching**: Set cache headers for static assets in `vercel.json`
2. **Database Connection Pooling**: If using a database, consider connection pooling (already configured in `db.ts`)
3. **Code Splitting**: The build process shows warnings about large chunks; consider code splitting in the client

## Database Setup (When Ready)

When you're ready to add full database support:

1. Create the database tables:
   ```bash
   npm run db:push
   ```

2. Check `shared/schema.ts` for the current schema

3. The `inquiries` table stores form submissions with:
   - `id`: Auto-incrementing primary key
   - `name`: Inquiry submitter's name
   - `email`: Inquiry submitter's email
   - `subject`: Inquiry subject
   - `message`: Inquiry message
   - `createdAt`: Timestamp of creation

## Testing Locally Before Deployment

```bash
# Build the project
npm run build

# Start the production server locally
npm start
```

The app will run on `http://localhost:5000` (or the first available port).

## Next Steps

1. Deploy to Vercel using the steps above
2. Test all features on the deployed URL
3. When ready, configure a PostgreSQL database and add the `DATABASE_URL` environment variable
4. Run `npm run db:push` to create database tables
5. Monitor your Vercel analytics and logs

---

For more information, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Express.js Guide](https://expressjs.com/)
