import "./globals.css";

export const metadata = {
  title: "Collaborative Notes",
  description: "My collaborative notes app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          {children}
        </body>
    </html>
  );
}
