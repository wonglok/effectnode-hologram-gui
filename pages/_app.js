import "tailwindcss/tailwind.css";
import "../css/app.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
