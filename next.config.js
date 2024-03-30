const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  const env = {
    API_PROD_URL: (() => {
      if (isDev) return "http://localhost:3002/api/";
      if (isProd) {
        // Note: The code below needs to be uncommented, and you should use your domin where your API is hosted.
        // return 'Enter Your URL here'
        return "https://empowerit-ecommerce.vercel.app/api/";
      }
      if (isStaging) return "http://localhost:3002/api/";
      return "RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
    API_BASE_URL: "http://localhost:3002/api",
  };
  const redirects = () => {
    return [
      {
        source: "/",
        destination: "/es/theme/paris",
        permanent: true,
      },
    ];
  };
  const images = {
    domains: ["react.pixelstrap.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "empowerit-ecommerce.vercel.app",
      },
      {
        protocol: "https",
        hostname: "react.pixelstrap.net",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  };

  return {
    env,
    redirects,
    images,
  };
};

