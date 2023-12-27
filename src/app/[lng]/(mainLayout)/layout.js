import MainLayout from "@/Layout";
import Script from "next/script";

export default function RootLayout({ children, params: { lng } }) {
  return (
    <>
      {process.env.NODE_ENV == "production" && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-WLQ8FSF7JE" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-WLQ8FSF7JE');
        `}
          </Script>
        </>
      )}
      <MainLayout lng={lng}>{children}</MainLayout>
    </>
  );
}
