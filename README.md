# Text Speeder v10.1

Netlify + Stripe version of Text Speeder.

## Features
- Flow reading mode
- RSVP mode (Pro)
- Flow+Highlight (Pro)
- Stripe checkout for Pro upgrade

## Deployment
1. Push to GitHub
2. Connect repo to Netlify
3. Add environment variables:
   - `STRIPE_SECRET_KEY` = your Stripe secret key
   - `URL` = https://YOUR_NETLIFY_SITE.netlify.app
4. Deploy and enjoy.

## Deployment
1. Push the repository to **GitHub**
2. Connect the repo to **Netlify**
3. Add environment variables in Netlify:
   - `STRIPE_SECRET_KEY` = your Stripe secret key
   - `URL` = https://YOUR_NETLIFY_SITE.netlify.app
4. Deploy your site
5. Test:
   - Free reading with ads
   - Rewarded premium (watch ad → unlock Pro for 12h)
   - Stripe checkout for permanent Pro upgrade

## Notes
- Free users will see ads.  
- Rewarded premium lasts **12 hours** and hides ads temporarily.  
- Pro users (Stripe payment) have permanent access to all Pro features and no ads.  
- Modular JS files make it easy to extend functionality in the future.
