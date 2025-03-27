import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.tsl.js" integrity="sha512-kLVG+9hRPzp61ceEI5/hoRsQmEV9cFf4r4DOCYIBPteqgaTB6awXLAZlWUO5Dvlisok4doFjnxs75mngpXI35w==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <title>DashSync</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
