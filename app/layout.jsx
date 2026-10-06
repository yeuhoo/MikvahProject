import './globals.css';

export const metadata = {
  title: 'Catskills Eruv | Community & Connection',
  description: 'Catskills Eruv — find nearby minyanim, local shuls, and prayer schedules throughout the Catskills.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
