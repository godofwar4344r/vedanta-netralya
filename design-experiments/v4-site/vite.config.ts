import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const handleCmsApi = (req: any, res: any, next: any) => {
  const url = req.url || '';
  if (url.startsWith('/api/save-changes') && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const dataDir = path.resolve(process.cwd(), 'src/data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(
          path.join(dataDir, 'editableContent.json'),
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } catch (err: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (url.startsWith('/api/get-changes') && req.method === 'GET') {
    try {
      const dataPath = path.resolve(process.cwd(), 'src/data/editableContent.json');
      let content = '{}';
      if (fs.existsSync(dataPath)) {
        content = fs.readFileSync(dataPath, 'utf-8');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(content);
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    next();
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-changes-api',
      configureServer(server) {
        server.middlewares.use(handleCmsApi);
      },
      configurePreviewServer(server) {
        server.middlewares.use(handleCmsApi);
      }
    }
  ],
  server: {
    allowedHosts: true
  }
})
