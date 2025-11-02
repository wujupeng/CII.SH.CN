import http.client
import sys

try:
    conn = http.client.HTTPConnection('localhost', 8080, timeout=5)
    conn.request('GET', '/api/test/health')
    response = conn.getresponse()
    print(f"HTTP状态码: {response.status}")
    print(f"响应头: {response.getheaders()}")
    print(f"响应体: {response.read().decode()}")
    conn.close()
except Exception as e:
    print(f"请求失败: {type(e).__name__}")
    print(f"错误信息: {str(e)}")
    import traceback
    traceback.print_exc()