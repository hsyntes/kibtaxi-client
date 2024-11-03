import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth select-none">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-backdrop"></div>
        <div id="bottomsheet-backdrop"></div>
      </body>
    </Html>
  );
}
