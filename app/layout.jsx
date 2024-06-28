import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
  title: 'Promptopia', // Set the page title
  description: 'Discover & Share AI Prompts', // Set the page description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {/* Main wrapper with a gradient background */}
        <div className='main'>
          <div className='gradient'></div>
        </div>

        {/* Main application content */}
        <main className='app'>
          <Nav /> {/* Include the navigation bar */}
          {children} {/* Render child components */}
        </main>
        </Provider>

      </body>
    </html>
  );
}