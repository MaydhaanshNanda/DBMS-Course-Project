import '../index.css';
import { EMSProvider } from '../context/EMSContext';

export default function App({ Component, pageProps }) {
  return (
    <EMSProvider>
      <Component {...pageProps} />
    </EMSProvider>
  );
}
