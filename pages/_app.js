import '../src/components/styles.css';  // Import your component-level styles
import '../src/App.css';  // Import your global app-level styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
