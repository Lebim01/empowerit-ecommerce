import I18NextProvider from "@/Helper/I18NextContext/I18NextProvider";
import "../../../public/assets/scss/app.scss";
import NoSSR from "@/Utils/NoSSR";
import Head from "next/head";

export async function generateMetadata() {
  // fetch data
  const themeOption = await fetch(`${process.env.API_PROD_URL}themeOptions`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
  return {
    metadataBase: new URL(process.env.API_PROD_URL),
    title: themeOption?.options?.seo?.meta_tags,
    description: themeOption?.options?.seo?.meta_description,
    icons: {
      icon: themeOption?.options?.logo?.favicon_icon?.original_url,
      link: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans&display=swap",
      },
    },
    openGraph: {
      title: themeOption?.options?.seo?.og_title,
      description: themeOption?.options?.seo?.og_description,
      images: [themeOption?.options?.seo?.og_image?.original_url, []],
    },
  };
}

export default function CustomLayout({ children, params: { lng } }) {
  return (
    <>
      <html lang={lng}>
        <head>
          {process.env.NODE_ENV == "production"}
          <>
            <script src="https://www.googletagmanager.com/gtag/js?id=G-WLQ8FSF7JE" />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-WLQ8FSF7JE');
                  `,
              }}
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-P8RQ3LSZ');
                `,
              }}
            />
          </>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
        </head>
        <body suppressHydrationWarning={true}>
          <I18NextProvider>
            <NoSSR>{children}</NoSSR>
          </I18NextProvider>
        </body>
      </html>
    </>
  );
}
