import './globals.css';

export const metadata = {
  title: 'Mikvah Project | Community & Connection',
  description: 'Mikvah Project — a community resource for mikvah information, preparation, and local Jewish life.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
