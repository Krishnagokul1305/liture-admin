import { myFont } from "../font";
import Header from "./_components/Header";

function layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${myFont.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

export default layout;
