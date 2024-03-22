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
      <MainLayout lng={lng}>{children}</MainLayout>
    </>
  );
}
