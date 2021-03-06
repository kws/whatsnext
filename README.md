# What's Next?

Do you ever look at the calendar, or get a reminder from Outlook that you have a meeting
starting in 10 minutes? Just enough time to answer a couple of emails... and then suddenly you
are 10 minutes late instead?

What's Next is a simple [React App](https://reactjs.org/) using the 
[Microsoft Authentication Library for JavaScript](https://github.com/AzureAD/microsoft-authentication-library-for-js#readme).

Using the awesome GitHub Pages Deploy Action the library builds automatically and deploys to
GitHub Pages on [k-si.com/whatsnext](https://www.k-si.com/whatsnext/). 

## Build

This app was created with [Create React App](https://create-react-app.dev/), so has the 
[usual scripts](https://create-react-app.dev/docs/available-scripts).

Before you run the app you need to sign up for Client ID from Azure. Sign in to 
[portal.azure.com](https://portal.azure.com/) and create a new application under App Registrations. 
You can either set this as an environment variable, or add a `.env` file with:

```
REACT_APP_AZURE_CLIENT_ID=<YOUR_CLIENT_ID>
```

The code is also instrumented for [Google Analytics](https://analytics.google.com) and 
[Sentry](https://sentry.io) which you can configure using [REACT_APP_GTM_ID](./public/index.html#L18) holding the Google 
Tag Manager stream ID, and [REACT_APP_SENTRY_DSN](./src/index.js#L11) holding the Sentry DSN. 

These values can also be passed as GitHub repository secrets, see the 
[actions workflow](./.github/workflows/deploy.yaml).

## Ideas or suggestions? 

I love hearing your ideas, so please share, or even better, fork away and send me a PR!