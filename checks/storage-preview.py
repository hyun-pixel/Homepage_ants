"""Local-only QA server: production files with storage blocked before modules load."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import io

site = Path(__file__).resolve().parents[1] / 'site'
class Preview(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(site),**kwargs)
    def send_head(self):
        path = Path(self.translate_path(self.path))
        if path.is_dir() and not self.path.split('?')[0].endswith('/'):
            return super().send_head()
        if path.is_dir(): path = path/'index.html'
        if path.suffix == '.html' and path.exists():
            content = path.read_text(encoding='utf-8').replace('<head>','''<head><script>
              for (const key of ['localStorage','sessionStorage']) Object.defineProperty(window,key,{get(){throw new DOMException('QA blocked storage','SecurityError')}});
            </script>''',1).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type','text/html; charset=utf-8')
            self.send_header('Content-Length',str(len(content)))
            self.end_headers()
            return io.BytesIO(content)
        return super().send_head()

if __name__ == '__main__':
    import argparse
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=62618)
    ThreadingHTTPServer(('127.0.0.1',parser.parse_args().port),Preview).serve_forever()
