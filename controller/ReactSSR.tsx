import { React, ReactDOMServer, Context } from "../deps.ts";

function ReactSSR(Compo: any, jsFilePath: string) {
  async function renderHtml(ctx: Context, next: () => Promise<void>) {
    await next();
    const html = `
    <html>
    <head>
    <script type="module" src="${jsFilePath}"></script>
    </head>
    <body>
    <section id="react">${ReactDOMServer.renderToString(<Compo />)}</section>
    </body>
    </html>`;
    ctx.response.type = "text/html";
    ctx.response.body = html;
  }

  async function renderJS(ctx: Context, next: () => Promise<void>) {
    await next();
    const js =
      `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${Compo};\nReactDOM.hydrate(React.createElement(App), document.querySelector("#react"));`;
    ctx.response.type = "application/javascript";
    ctx.response.body = js;
  }

  return {
    renderHtml,
    renderJS,
  };
}

export default ReactSSR;
