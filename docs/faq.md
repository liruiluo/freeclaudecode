# ❓ Frequently Asked Questions (FAQ)

> **说明：AnyRouter 是第三方 Claude AI 代理服务平台，与本项目无直接关联。AnyRouter 现已支持 Claude 4（如 claude-4-opus 等），兼容 Claude 3.5/3。**

## 🎁 Free Credits & Registration

### Q: How do I get the $50 free credits?
**A:** Simply [register at AnyRouter](https://anyrouter.top/register?aff=UBdY) with a valid email address. The $50 credits are automatically added to your account upon successful registration - no credit card required!

### Q: Do I need a credit card to get the free credits?
**A:** No! The $50 free credits are completely free with no credit card required during registration.

### Q: How long do the free credits last?
**A:** Free credits typically don't expire, but check your account dashboard for specific terms. You can monitor your credit balance anytime in the AnyRouter dashboard.

### Q: Can I get more free credits?
**A:** The initial $50 is the standard welcome bonus. Additional credits can be purchased through your AnyRouter dashboard, or check for special promotions.

## 🔧 API Usage

### Q: Which Claude model should I use?
**A:** It depends on your needs:
- **claude-4-opus-20240424**: 最新最强，适合复杂推理（推荐）
- **claude-3-5-sonnet-20241022**: 高级推理
- **claude-3-opus-20240229**: 复杂创意任务
- **claude-3-sonnet-20240229**: 性能均衡（推荐）
- **claude-3-haiku-20240307**: 快速响应

### Q: What's the difference between AnyRouter and calling Claude directly?
**A:** AnyRouter provides:
- 🎁 $50 free credits to get started
- 🌍 Global access (no regional restrictions)
- ⚡ Optimized proxy servers for better performance
- 🛡️ Enterprise-grade security and reliability
- 🚀 Zero setup - works immediately

### Q: Is there a rate limit?
**A:** Yes, rate limits depend on your plan:
- **Free Tier**: 60 requests/minute, 1,000 daily requests
- **Pro**: 300 requests/minute, 10,000 daily requests
- **Enterprise**: Unlimited

### Q: How do I handle rate limiting in my code?
**A:** Implement exponential backoff:

```python
import time
import requests

def make_request_with_retry(payload, max_retries=3):
    for attempt in range(max_retries):
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 429:  # Rate limited
            wait_time = 2 ** attempt
            time.sleep(wait_time)
            continue
            
        return response
    
    raise Exception("Max retries exceeded")
```

## 🔐 Authentication & Security

### Q: How do I secure my API key?
**A:** Best practices:
1. Never commit API keys to version control
2. Use environment variables: `export ANYROUTER_API_KEY=your-key`
3. Use `.env` files for local development
4. Rotate keys regularly
5. Monitor usage for suspicious activity

### Q: Can I regenerate my API key?
**A:** Yes! Go to your AnyRouter dashboard → API Keys → Generate New Key. Remember to update your applications with the new key.

### Q: Is my data secure?
**A:** Absolutely! AnyRouter uses:
- 🛡️ Bank-level encryption for all data transmission
- 🔒 No data logging or storage
- ✅ GDPR compliance
- 🌐 Distributed, secure infrastructure

## 💻 Technical Questions

### Q: Can I use this with Python async/await?
**A:** Yes! Here's an example:

```python
import aiohttp
import asyncio

async def async_chat(message, api_key):
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://api.anyrouter.top/v1/messages",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": "claude-3-sonnet-20240229",
                "max_tokens": 1000,
                "messages": [{"role": "user", "content": message}]
            }
        ) as response:
            data = await response.json()
            return data["content"][0]["text"]

# Usage
response = await async_chat("Hello Claude!", "your-api-key")
```

### Q: How do I implement streaming responses?
**A:** Check our [streaming examples](../examples/) for detailed implementations in Python and JavaScript.

### Q: Can I use this in a web application?
**A:** Yes! AnyRouter works with any HTTP client. For web apps, implement the API calls on your backend to keep your API key secure.

### Q: What about CORS for browser usage?
**A:** For security, make API calls from your backend, not directly from browsers. This protects your API key and avoids CORS issues.

## 🚀 Getting Started

### Q: I'm getting a 401 Unauthorized error?
**A:** This usually means:
1. Invalid API key - double-check your key
2. Missing "Bearer " prefix in Authorization header
3. Expired API key - regenerate in dashboard

### Q: I'm getting a 403 Forbidden error?
**A:** This typically means:
1. Insufficient credits - check your balance
2. Rate limit exceeded - implement backoff
3. Account restrictions - contact support

### Q: My requests are timing out?
**A:** Try:
1. Increase timeout values (30+ seconds)
2. Use shorter max_tokens for faster responses
3. Check your internet connection
4. Try different Claude models (Haiku is fastest)

### Q: How do I debug API issues?
**A:** Enable detailed logging:

```python
import logging

logging.basicConfig(level=logging.DEBUG)

# Your API request code here
# This will show detailed HTTP request/response info
```

## 🌍 Deployment & Production

### Q: Can I use this in production?
**A:** Absolutely! AnyRouter is designed for production use with:
- 99.9% uptime guarantee
- Enterprise-grade infrastructure
- 24/7 monitoring
- Global CDN

### Q: How do I monitor usage in production?
**A:** 
1. Check response headers for rate limit info
2. Use the AnyRouter dashboard for credit monitoring
3. Implement application-level usage tracking
4. Set up alerts for low credits

### Q: What about scaling?
**A:** AnyRouter automatically scales. For high-volume usage:
1. Consider upgrading to Pro/Enterprise plans
2. Implement connection pooling
3. Use multiple API keys for different services
4. Cache responses when appropriate

## 💰 Billing & Credits

### Q: How are credits calculated?
**A:** Credits are based on token usage:
- Input tokens: ~$0.0003 per 1K tokens
- Output tokens: ~$0.0015 per 1K tokens
- Exact rates may vary by model

### Q: Can I track my credit usage?
**A:** Yes! Monitor usage via:
1. AnyRouter dashboard (real-time)
2. API response headers
3. Monthly usage reports

### Q: What happens when credits run out?
**A:** API requests will return a 403 error. You can:
1. Purchase additional credits
2. Wait for credit renewal (if on a plan)
3. Monitor usage to prevent depletion

## 🤝 Support & Community

### Q: Where can I get help?
**A:** Multiple support channels:
- 📧 Email: [support@anyrouter.top](mailto:support@anyrouter.top)
- 💬 Discord: [Join our community](https://discord.gg/your-discord)
- 📖 Documentation: [Browse all docs](/)
- 🐛 GitHub Issues: [Report bugs](https://github.com/yourusername/freeclaudecode/issues)

### Q: How do I report bugs or request features?
**A:** Use our GitHub repository:
1. [Bug Reports](https://github.com/yourusername/freeclaudecode/issues)
2. [Feature Requests](https://github.com/yourusername/freeclaudecode/discussions)

### Q: Can I contribute to this project?
**A:** Yes! We welcome contributions:
1. Star the repository
2. Fork and submit pull requests
3. Report issues and bugs
4. Improve documentation
5. Share with other developers

## 🎯 Use Cases & Examples

### Q: What can I build with this?
**A:** Endless possibilities:
- 🤖 AI chatbots and virtual assistants
- 📝 Content generation tools
- 💼 Business automation workflows
- 📊 Data analysis and insights
- 🎨 Creative writing assistants
- 💡 Code generation and debugging tools
- 🌐 Translation services
- 📚 Educational applications

### Q: Are there usage restrictions?
**A:** Follow standard terms of service:
- No illegal or harmful content
- Respect rate limits
- Don't abuse the service
- Commercial use is allowed

### Q: Can I resell API access?
**A:** Check AnyRouter's terms of service for reselling policies. Generally, you can build and sell applications that use the API.

---

## 🚀 Still Have Questions?

**Can't find what you're looking for?**

1. 🎯 **[Get your free $50 credits](https://anyrouter.top/register?aff=UBdY)** and start experimenting
2. 📧 **Email us**: [support@anyrouter.top](mailto:support@anyrouter.top)
3. 💬 **Join Discord**: [Community support](https://discord.gg/your-discord)
4. 📖 **Browse docs**: [Complete documentation](../README.md)

---

**💡 Pro Tip**: The best way to learn is by doing! Get your free credits and start building today.

[← Configuration](configuration.md) | [Troubleshooting →](troubleshooting.md) 