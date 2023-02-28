import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";
import BottomNav from "../components/BottomNav";
import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <section className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </div>
          <BottomNav />
        </section>
      </SessionProvider>
    </>
  );
}

export default MyApp;
