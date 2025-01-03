import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const DynamicUserContextProvider = dynamic(
  () => import("@/context/userContext"),
  { ssr: false } // Disable server-side rendering
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <DynamicUserContextProvider {...pageProps}>
        <Component {...pageProps} />
        <Toaster />
      </DynamicUserContextProvider>
    </Provider>
  );
}
