import "./globals.css";

export const metadata = {
  title: "Balance Financiero Personal",
  description: "Aplicación para controlar tus ingresos y gastos mensuales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Importar Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
