import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Performance Monitoring
  tracesSampleRate: 1.0, // 100% in dev, reduce in production
  environment: process.env.NODE_ENV,
});
