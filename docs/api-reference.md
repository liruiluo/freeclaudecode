# 📚 AnyRouter Claude AI API Reference

Complete API documentation for integrating Claude AI through AnyRouter's proxy service.

## 🌐 Base URL

```
https://api.anyrouter.top
```

## 🔐 Authentication

All API requests require authentication using your AnyRouter API key in the Authorization header:

```http
Authorization: Bearer YOUR_API_KEY
```

**[Get your free API key with $50 credits →](https://anyrouter.top/register?aff=UBdY)**

## 📡 Endpoints

### POST /v1/messages

Create a message conversation with Claude AI.

#### Request Format

```http
POST /v1/messages
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 1000,
  "messages": [
    {
      "role": "user",
      "content": "Hello, Claude!"
    }
  ]
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Claude model identifier |
| `messages` | array | Yes | List of conversation messages |
| `max_tokens` | integer | No | Maximum tokens in response (1-4096) |
| `temperature` | float | No | Sampling temperature (0.0-1.0) |
| `top_p` | float | No | Nucleus sampling parameter (0.0-1.0) |
| `stop_sequences` | array | No | Sequences where API will stop generating |
| `stream` | boolean | No | Enable streaming responses |
| `system` | string | No | System message to set behavior |

#### Available Models

| Model ID | Description | Best For |
|----------|-------------|----------|
| `claude-3-5-sonnet-20241022` | Latest, most advanced | Complex reasoning, analysis |
| `claude-3-opus-20240229` | Most capable | Complex tasks, creative writing |
| `claude-3-sonnet-20240229` | Balanced | General purpose, coding |
| `claude-3-haiku-20240307` | Fastest | Simple tasks, quick responses |

#### Message Format

```json
{
  "role": "user" | "assistant",
  "content": "string"
}
```

#### Response Format

**Non-streaming response:**
```json
{
  "id": "msg_01234567890abcdef",
  "type": "message",
  "role": "assistant",
  "model": "claude-3-sonnet-20240229",
  "content": [
    {
      "type": "text",
      "text": "Hello! How can I help you today?"
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 12,
    "output_tokens": 25
  }
}
```

**Streaming response:**
```
data: {"type": "message_start", "message": {...}}

data: {"type": "content_block_start", "index": 0, "content_block": {"type": "text", "text": ""}}

data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "Hello"}}

data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "!"}}

data: {"type": "content_block_stop", "index": 0}

data: {"type": "message_delta", "delta": {"stop_reason": "end_turn"}}

data: {"type": "message_stop"}

data: [DONE]
```

## 📊 Response Headers

Every API response includes usage and rate limiting information:

```http
X-Remaining-Credits: 45.23
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
X-RateLimit-Limit: 60
Content-Type: application/json
```

## ⚠️ Error Responses

### HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient credits |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |
| 502 | Bad Gateway - Service unavailable |

### Error Format

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid model specified"
  }
}
```

## 🔄 Code Examples

### Basic Chat

```python
import requests

def chat_with_claude(message, api_key):
    response = requests.post(
        "https://api.anyrouter.top/v1/messages",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "model": "claude-3-sonnet-20240229",
            "max_tokens": 1000,
            "messages": [
                {"role": "user", "content": message}
            ]
        }
    )
    
    if response.status_code == 200:
        return response.json()["content"][0]["text"]
    else:
        raise Exception(f"API Error: {response.status_code} - {response.text}")

# Usage
result = chat_with_claude("Explain quantum computing", "your-api-key")
print(result)
```

### Multi-turn Conversation

```python
import requests

class ClaudeChat:
    def __init__(self, api_key):
        self.api_key = api_key
        self.messages = []
        self.base_url = "https://api.anyrouter.top/v1/messages"
    
    def send_message(self, content):
        # Add user message
        self.messages.append({"role": "user", "content": content})
        
        response = requests.post(
            self.base_url,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "claude-3-sonnet-20240229",
                "max_tokens": 1000,
                "messages": self.messages
            }
        )
        
        if response.status_code == 200:
            assistant_message = response.json()["content"][0]["text"]
            # Add assistant response to conversation
            self.messages.append({"role": "assistant", "content": assistant_message})
            return assistant_message
        else:
            raise Exception(f"API Error: {response.status_code}")

# Usage
chat = ClaudeChat("your-api-key")
print(chat.send_message("What is AI?"))
print(chat.send_message("How does it work?"))
```

### Streaming Response

```python
import requests
import json

def stream_claude_response(message, api_key):
    response = requests.post(
        "https://api.anyrouter.top/v1/messages",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "model": "claude-3-sonnet-20240229",
            "max_tokens": 1000,
            "stream": True,
            "messages": [
                {"role": "user", "content": message}
            ]
        },
        stream=True
    )
    
    full_response = ""
    for line in response.iter_lines():
        if line:
            line = line.decode('utf-8')
            if line.startswith('data: '):
                data = line[6:]  # Remove 'data: ' prefix
                if data == '[DONE]':
                    break
                try:
                    chunk = json.loads(data)
                    if chunk['type'] == 'content_block_delta':
                        text = chunk['delta']['text']
                        full_response += text
                        print(text, end='', flush=True)
                except json.JSONDecodeError:
                    pass
    
    return full_response

# Usage
response = stream_claude_response("Write a short story", "your-api-key")
```

### With System Prompt

```python
import requests

def chat_with_system_prompt(message, system_prompt, api_key):
    response = requests.post(
        "https://api.anyrouter.top/v1/messages",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "model": "claude-3-sonnet-20240229",
            "max_tokens": 1000,
            "system": system_prompt,
            "messages": [
                {"role": "user", "content": message}
            ]
        }
    )
    
    return response.json()["content"][0]["text"]

# Usage
system_prompt = "You are a helpful coding assistant. Always provide code examples and explain your reasoning."
result = chat_with_system_prompt(
    "How do I create a REST API in Python?", 
    system_prompt, 
    "your-api-key"
)
print(result)
```

### Custom Parameters

```python
import requests

def advanced_chat(message, api_key):
    response = requests.post(
        "https://api.anyrouter.top/v1/messages",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "model": "claude-3-opus-20240229",
            "max_tokens": 2000,
            "temperature": 0.3,  # More focused
            "top_p": 0.8,
            "stop_sequences": ["Human:", "Assistant:"],
            "messages": [
                {"role": "user", "content": message}
            ]
        }
    )
    
    return response.json()

# Usage
result = advanced_chat("Analyze this data trend", "your-api-key")
```

## 🛡️ Rate Limits

| Plan | Requests/Minute | Daily Requests | Credits |
|------|----------------|----------------|---------|
| Free Tier | 60 | 1,000 | $50 |
| Pro | 300 | 10,000 | Custom |
| Enterprise | Unlimited | Unlimited | Custom |

## 💡 Best Practices

### 1. Error Handling
Always implement proper error handling for production applications:

```python
import requests
from requests.exceptions import RequestException, Timeout

def robust_claude_request(message, api_key, max_retries=3):
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
            
            response.raise_for_status()
            return response.json()
            
        except Timeout:
            print(f"Timeout on attempt {attempt + 1}")
        except RequestException as e:
            print(f"Request failed: {e}")
        
        if attempt < max_retries - 1:
            time.sleep(2 ** attempt)  # Exponential backoff
    
    raise Exception("Failed after all retry attempts")
```

### 2. Token Management
Monitor your token usage to optimize costs:

```python
def track_tokens(response_data):
    usage = response_data.get('usage', {})
    input_tokens = usage.get('input_tokens', 0)
    output_tokens = usage.get('output_tokens', 0)
    
    print(f"Input tokens: {input_tokens}")
    print(f"Output tokens: {output_tokens}")
    print(f"Total tokens: {input_tokens + output_tokens}")
    
    # Estimate cost (example rates)
    cost = (input_tokens * 0.0003 + output_tokens * 0.0015) / 1000
    print(f"Estimated cost: ${cost:.4f}")
```

### 3. Response Validation
Always validate responses before using them:

```python
def validate_claude_response(response_data):
    if not response_data:
        raise ValueError("Empty response")
    
    if 'content' not in response_data:
        raise ValueError("Missing content in response")
    
    if not response_data['content']:
        raise ValueError("Empty content array")
    
    if response_data['content'][0]['type'] != 'text':
        raise ValueError("Unexpected content type")
    
    return response_data['content'][0]['text']
```

## 🔗 SDKs and Libraries

- **Python**: Use `requests` or `httpx` for HTTP requests
- **JavaScript**: Use `axios`, `fetch`, or `node-fetch`
- **Java**: Use `OkHttp` or `Apache HttpClient`
- **Go**: Use the standard `net/http` package
- **PHP**: Use `Guzzle` or `cURL`
- **Ruby**: Use `Net::HTTP` or `Faraday`

## 📞 Support

- 📧 **Email**: [support@anyrouter.top](mailto:support@anyrouter.top)
- 💬 **Discord**: [Join our community](https://discord.gg/your-discord)
- 📖 **Documentation**: [Browse docs](../README.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/freeclaudecode/issues)

---

**🚀 Ready to start building? [Get your free $50 credits now!](https://anyrouter.top/register?aff=UBdY)**

[← Getting Started](getting-started.md) | [Configuration →](configuration.md) 