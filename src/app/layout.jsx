import "./styles/custom.scss";
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Asimovian&family=Chivo:ital,wght@0,100..900;1,100..900&family=Funnel+Display:wght@300..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Rock+3D&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
