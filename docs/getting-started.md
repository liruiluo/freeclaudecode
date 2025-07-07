# 🚀 Getting Started with AnyRouter Claude AI

> **说明：AnyRouter 是第三方 Claude AI 代理服务平台，与本项目无直接关联。AnyRouter 现已支持 Claude 4（如 claude-4-opus 等），兼容 Claude 3.5/3。**

Welcome to the complete guide for using AnyRouter's Claude AI proxy service! This guide will get you up and running in just a few minutes.

## 📋 Prerequisites

- Basic programming knowledge
- An internet connection
- Your favorite code editor

## 🎯 Step 1: Register and Get Free Credits

1. **[Click here to register for AnyRouter](https://anyrouter.top/register?aff=UBdY)**
2. Complete the simple registration form
3. Verify your email address
4. **Instantly receive $50 in free Claude AI credits!**

## 🔑 Step 2: Get Your API Key

1. Log in to your AnyRouter dashboard
2. Navigate to the "API Keys" section
3. Click "Generate New Key"
4. Copy your API key (keep it secure!)

## 🛠 Step 3: Choose Your Integration Method

### Option A: Direct HTTP Requests

Use any HTTP client to make requests directly to the API:

```bash
curl -X POST https://api.anyrouter.top/v1/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 1000,
    "messages": [
      {"role": "user", "content": "Hello, Claude!"}
    ]
  }'
```

### Option B: Python SDK

Install the requests library:
```bash
pip install requests
```

Create your first Claude AI script:
```python
import requests
import json

def chat_with_claude(message, api_key):
    url = "https://api.anyrouter.top/v1/messages"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "claude-3-sonnet-20240229",
        "max_tokens": 1000,
        "messages": [
            {"role": "user", "content": message}
        ]
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()["content"][0]["text"]
    else:
        return f"Error: {response.status_code} - {response.text}"

# Usage
api_key = "your-api-key-here"
response = chat_with_claude("What is artificial intelligence?", api_key)
print(response)
```

### Option C: JavaScript/Node.js

Install axios:
```bash
npm install axios
```

Create your Claude AI integration:
```javascript
const axios = require('axios');

async function chatWithClaude(message, apiKey) {
    const url = 'https://api.anyrouter.top/v1/messages';
    
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };
    
    const data = {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
            { role: 'user', content: message }
        ]
    };
    
    try {
        const response = await axios.post(url, data, { headers });
        return response.data.content[0].text;
    } catch (error) {
        return `Error: ${error.response.status} - ${error.response.data}`;
    }
}

// Usage
const apiKey = 'your-api-key-here';
chatWithClaude('Explain quantum computing', apiKey)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

## 🎛 Step 4: Customize Your Configuration

### Available Models

- `claude-4-opus-20240424` - 最新最强，适合复杂推理（推荐）
- `claude-3-5-sonnet-20241022` - 高级推理
- `claude-3-opus-20240229` - 复杂任务
- `claude-3-sonnet-20240229` - 性能均衡
- `claude-3-haiku-20240307` - 快速响应

### Request Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `model` | string | Claude model to use | Required |
| `max_tokens` | integer | Maximum response length | 1000 |
| `temperature` | float | Creativity level (0.0-1.0) | 0.7 |
| `top_p` | float | Nucleus sampling parameter | 0.9 |
| `stream` | boolean | Enable streaming responses | false |

### Example with Custom Parameters

```python
data = {
    "model": "claude-3-opus-20240229",
    "max_tokens": 2000,
    "temperature": 0.3,  # More focused responses
    "top_p": 0.8,
    "messages": [
        {"role": "user", "content": "Write a detailed explanation of machine learning"}
    ]
}
```

## 🔄 Step 5: Handle Streaming Responses

For real-time, streaming responses:

```python
import requests
import json

def stream_chat(message, api_key):
    url = "https://api.anyrouter.top/v1/messages"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "claude-3-sonnet-20240229",
        "max_tokens": 1000,
        "stream": True,
        "messages": [
            {"role": "user", "content": message}
        ]
    }
    
    with requests.post(url, headers=headers, json=data, stream=True) as response:
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith('data: '):
                    json_data = decoded_line[6:]  # Remove 'data: ' prefix
                    if json_data != '[DONE]':
                        try:
                            chunk = json.loads(json_data)
                            if 'delta' in chunk and 'text' in chunk['delta']:
                                print(chunk['delta']['text'], end='', flush=True)
                        except json.JSONDecodeError:
                            pass

# Usage
stream_chat("Tell me a story", "your-api-key")
```

## 🛡 Step 6: Best Practices & Security

### Security Guidelines

1. **Never hardcode API keys** in your source code
2. **Use environment variables** to store sensitive data
3. **Implement rate limiting** in your applications
4. **Monitor your usage** regularly

### Environment Variables Setup

Create a `.env` file:
```
ANYROUTER_API_KEY=your-api-key-here
ANYROUTER_BASE_URL=https://api.anyrouter.top
```

Python example with environment variables:
```python
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('ANYROUTER_API_KEY')
base_url = os.getenv('ANYROUTER_BASE_URL', 'https://api.anyrouter.top')
```

### Error Handling

```python
import requests
from requests.exceptions import RequestException, Timeout

def safe_chat_with_claude(message, api_key, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.post(
                "https://api.anyrouter.top/v1/messages",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "claude-3-sonnet-20240229",
                    "max_tokens": 1000,
                    "messages": [{"role": "user", "content": message}]
                },
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()["content"][0]["text"]
            elif response.status_code == 429:
                print(f"Rate limited. Retrying in {2**attempt} seconds...")
                time.sleep(2**attempt)
            else:
                return f"Error: {response.status_code} - {response.text}"
                
        except Timeout:
            print(f"Request timed out. Attempt {attempt + 1}/{max_retries}")
        except RequestException as e:
            print(f"Request failed: {e}")
            
    return "Failed to get response after multiple attempts"
```

## 📊 Step 7: Monitor Your Usage

1. **Dashboard Monitoring**: Check your credit usage in the AnyRouter dashboard
2. **API Response Headers**: Monitor rate limits in response headers
3. **Usage Tracking**: Implement usage tracking in your applications

```python
def track_usage(response):
    """Track API usage from response headers"""
    headers = response.headers
    
    remaining_credits = headers.get('X-Remaining-Credits')
    rate_limit_remaining = headers.get('X-RateLimit-Remaining')
    rate_limit_reset = headers.get('X-RateLimit-Reset')
    
    print(f"Credits remaining: {remaining_credits}")
    print(f"Rate limit remaining: {rate_limit_remaining}")
    print(f"Rate limit resets at: {rate_limit_reset}")
```

## 🎉 You're Ready!

Congratulations! You now have everything you need to start building amazing applications with Claude AI through AnyRouter.

### Next Steps

- 📖 Check out the [API Reference](api-reference.md) for detailed documentation
- 💻 Explore [code examples](../examples/) for more complex use cases
- 🎯 Join our [Discord community](https://discord.gg/your-discord) for support
- 🚀 Start building your AI-powered application!

### Need Help?

- 📧 Email: [support@anyrouter.top](mailto:support@anyrouter.top)
- 💬 Discord: [Join our community](https://discord.gg/your-discord)
- 📖 Documentation: [Browse all docs](/)
- 🐛 Issues: [Report on GitHub](https://github.com/yourusername/freeclaudecode/issues)

---

**💡 Remember: You have $50 in free credits to experiment and build!**

[← Back to README](../README.md) | [API Reference →](api-reference.md) 