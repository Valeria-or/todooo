const React = require('react');

function Layout({children}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='stylesheet' href='/css/style.css' />
        <title>Document</title>
      </head>
      <body>
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}

module.exports = Layout;
