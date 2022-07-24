import https from 'http';
import app from '~/api/v1/app';
import { port } from '~/configs/env.config.dev';

app.set('port', port);

const httpsServer = https.createServer(app);

app.on('ready', () => {
  httpsServer.listen(port, () => {
    console.log('Server listening on port ' + port);
  });
});
