#!/bin/bash

# Free Claude Code - Quick Start Script
# Get your free $50 credits: https://anyrouter.top/register?aff=UBdY

echo "🚀 Free Claude Code - Quick Start Setup"
echo "========================================"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found: $(python3 --version)"
else
    echo "❌ Python 3 not found. Please install Python 3.7+ first."
    exit 1
fi

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js found: $(node --version)"
    NODE_AVAILABLE=true
else
    echo "⚠️  Node.js not found. JavaScript examples will not work."
    NODE_AVAILABLE=false
fi

echo ""
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

if [ "$NODE_AVAILABLE" = true ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

echo ""
echo "⚙️  Setting up environment..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "📝 Created .env file from example. Please edit it with your API key."
else
    echo "📝 .env file already exists."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. 🔑 Get your free API key: https://anyrouter.top/register?aff=UBdY"
echo "2. ✏️  Edit .env file and add your API key"
echo "3. 🐍 Run Python example: python3 examples/python/basic_chat.py"
if [ "$NODE_AVAILABLE" = true ]; then
    echo "4. 🟨 Run JavaScript example: node examples/javascript/basic_chat.js"
fi
echo ""
echo "💡 Need help? Check out the documentation:"
echo "   📖 docs/getting-started.md"
echo "   📚 docs/api-reference.md"
echo "   ❓ docs/faq.md"
echo ""
echo "🎁 Don't forget to claim your $50 free credits!"
echo "   👉 https://anyrouter.top/register?aff=UBdY" 