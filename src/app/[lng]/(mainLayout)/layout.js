import MainLayout from "@/Layout";
import Script from "next/script";
import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default function RootLayout({ children, params: { lng } }) {
  return (
    <>
      {process.env.NODE_ENV == "production" && (
        <>
          <script src="https://www.googletagmanager.com/gtag/js?id=G-WLQ8FSF7JE" />
          <script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-WLQ8FSF7JE');
            `}
          </script>
        </>
      )}
      <MainLayout lng={lng}>{children}</MainLayout>
    </>
  );
}
