#!/usr/bin/env python3
"""
Basic Chat Example with AnyRouter Claude AI

本示例基于 AnyRouter Claude AI 代理（第三方平台，非本项目所有）。AnyRouter 现已支持 Claude 4（如 claude-4-opus 等），兼容 Claude 3.5/3。

Get your free $50 credits: https://anyrouter.top/register?aff=UBdY
"""

import requests
import os
from typing import Optional

# Configuration
BASE_URL = "https://api.anyrouter.top"
DEFAULT_MODEL = "claude-3-sonnet-20240229"

class ClaudeChat:
    """Simple Claude AI chat client"""
    
    def __init__(self, api_key: str, model: str = DEFAULT_MODEL):
        """
        Initialize the Claude chat client
        
        Args:
            api_key: Your AnyRouter API key
            model: Claude model to use (default: claude-3-sonnet-20240229)
        """
        self.api_key = api_key
        self.model = model
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        })
    
    def send_message(self, message: str, max_tokens: int = 1000) -> str:
        """
        Send a message to Claude and get a response
        
        Args:
            message: The message to send to Claude
            max_tokens: Maximum tokens in the response
            
        Returns:
            Claude's response as a string
            
        Raises:
            Exception: If the API request fails
        """
        payload = {
            "model": self.model,
            "max_tokens": max_tokens,
            "messages": [
                {"role": "user", "content": message}
            ]
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/v1/messages",
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            data = response.json()
            return data["content"][0]["text"]
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"API request failed: {e}")
        except KeyError as e:
            raise Exception(f"Unexpected response format: {e}")

def main():
    """Main function demonstrating basic chat functionality"""
    
    # Get API key from environment variable or prompt user
    api_key = os.getenv("ANYROUTER_API_KEY")
    if not api_key:
        print("🔑 AnyRouter API Key required!")
        print("📝 Get your free $50 credits: https://anyrouter.top/register?aff=UBdY")
        api_key = input("Enter your API key: ").strip()
        
        if not api_key:
            print("❌ API key is required to proceed.")
            return
    
    # Initialize the chat client
    print("🚀 Initializing Claude AI chat...")
    chat = ClaudeChat(api_key)
    
    # Welcome message
    print("\n" + "="*50)
    print("🤖 Claude AI Chat - Powered by AnyRouter")
    print("💬 Type 'quit' or 'exit' to end the conversation")
    print("📖 Type 'help' for more commands")
    print("="*50 + "\n")
    
    # Chat loop
    while True:
        try:
            # Get user input
            user_input = input("You: ").strip()
            
            # Handle special commands
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("👋 Goodbye! Thanks for using AnyRouter Claude AI!")
                break
            elif user_input.lower() == 'help':
                print("""
📚 Available commands:
  - Type any message to chat with Claude
  - 'quit' or 'exit' - End the conversation
  - 'help' - Show this help message
  - 'models' - Show available models
  - 'credits' - Get your free $50 credits
""")
                continue
            elif user_input.lower() == 'models':
                print("""
🤖 Available Claude models:
  - claude-4-opus-20240424 (最新最强，推荐)
  - claude-3-5-sonnet-20241022 (高级推理)
  - claude-3-opus-20240229 (复杂任务)
  - claude-3-sonnet-20240229 (均衡 - 默认)
  - claude-3-haiku-20240307 (快速)
""")
                continue
            elif user_input.lower() == 'credits':
                print("💰 Get your free $50 credits: https://anyrouter.top/register?aff=UBdY")
                continue
            elif not user_input:
                continue
            
            # Send message to Claude
            print("🤔 Claude is thinking...")
            response = chat.send_message(user_input)
            
            # Display response
            print(f"\n🤖 Claude: {response}\n")
            
        except KeyboardInterrupt:
            print("\n👋 Chat interrupted. Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")
            print("💡 Try again or type 'quit' to exit.\n")

if __name__ == "__main__":
    main() 