import './globals.css';
import Header from '@/components/layout/Header';
export const metadata = {
  title: "Mary Frank PTO",
  description: "Connecting families, students, and staff.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen font-sans antialiased bg-gray-50'>
        <Header />
        {children}
      </body>
    </html>
    )
  }