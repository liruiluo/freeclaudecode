#!/usr/bin/env node

/**
 * Basic Chat Example with AnyRouter Claude AI (JavaScript/Node.js)
 * 
 * This example demonstrates how to have a simple conversation with Claude AI
 * using the AnyRouter proxy service with JavaScript/Node.js.
 * 
 * Get your free $50 credits: https://anyrouter.top/register?aff=UBdY
 * 
 * Install dependencies:
 * npm install axios readline
 */

const axios = require('axios');
const readline = require('readline');

// Configuration
const BASE_URL = 'https://api.anyrouter.top';
const DEFAULT_MODEL = 'claude-3-sonnet-20240229';

class ClaudeChat {
    /**
     * Initialize the Claude chat client
     * @param {string} apiKey - Your AnyRouter API key
     * @param {string} model - Claude model to use
     */
    constructor(apiKey, model = DEFAULT_MODEL) {
        this.apiKey = apiKey;
        this.model = model;
        this.baseURL = BASE_URL;
        
        // Setup axios instance with default headers
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });
    }

    /**
     * Send a message to Claude and get a response
     * @param {string} message - The message to send to Claude
     * @param {number} maxTokens - Maximum tokens in the response
     * @returns {Promise<string>} Claude's response
     */
    async sendMessage(message, maxTokens = 1000) {
        const payload = {
            model: this.model,
            max_tokens: maxTokens,
            messages: [
                { role: 'user', content: message }
            ]
        };

        try {
            const response = await this.client.post('/v1/messages', payload);
            return response.data.content[0].text;
        } catch (error) {
            if (error.response) {
                throw new Error(`API Error ${error.response.status}: ${error.response.data.error?.message || error.response.statusText}`);
            } else if (error.request) {
                throw new Error('Network error: Unable to reach AnyRouter API');
            } else {
                throw new Error(`Request error: ${error.message}`);
            }
        }
    }

    /**
     * Send a streaming message to Claude
     * @param {string} message - The message to send to Claude
     * @param {function} onChunk - Callback for each text chunk
     * @param {number} maxTokens - Maximum tokens in the response
     */
    async sendStreamingMessage(message, onChunk, maxTokens = 1000) {
        const payload = {
            model: this.model,
            max_tokens: maxTokens,
            stream: true,
            messages: [
                { role: 'user', content: message }
            ]
        };

        try {
            const response = await this.client.post('/v1/messages', payload, {
                responseType: 'stream'
            });

            return new Promise((resolve, reject) => {
                let fullResponse = '';

                response.data.on('data', (chunk) => {
                    const lines = chunk.toString().split('\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') {
                                resolve(fullResponse);
                                return;
                            }
                            
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                                    const text = parsed.delta.text;
                                    fullResponse += text;
                                    onChunk(text);
                                }
                            } catch (e) {
                                // Ignore JSON parse errors for malformed chunks
                            }
                        }
                    }
                });

                response.data.on('error', (error) => {
                    reject(new Error(`Stream error: ${error.message}`));
                });
            });
        } catch (error) {
            throw new Error(`Streaming request failed: ${error.message}`);
        }
    }
}

/**
 * Setup readline interface for user input
 */
function setupReadline() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

/**
 * Display help information
 */
function showHelp() {
    console.log(`
📚 Available commands:
  - Type any message to chat with Claude
  - 'quit' or 'exit' - End the conversation
  - 'help' - Show this help message
  - 'models' - Show available models
  - 'credits' - Get your free $50 credits
  - 'stream' - Toggle streaming mode (real-time responses)
`);
}

/**
 * Display available models
 */
function showModels() {
    console.log(`
🤖 Available Claude models:
  - claude-3-5-sonnet-20241022 (Latest, most advanced)
  - claude-3-opus-20240229 (Most capable)
  - claude-3-sonnet-20240229 (Balanced - default)
  - claude-3-haiku-20240307 (Fastest)
`);
}

/**
 * Main chat function
 */
async function main() {
    console.log('🚀 Initializing Claude AI chat...');
    
    // Get API key from environment or prompt user
    let apiKey = process.env.ANYROUTER_API_KEY;
    
    if (!apiKey) {
        console.log('🔑 AnyRouter API Key required!');
        console.log('📝 Get your free $50 credits: https://anyrouter.top/register?aff=UBdY');
        
        const rl = setupReadline();
        apiKey = await new Promise((resolve) => {
            rl.question('Enter your API key: ', (answer) => {
                resolve(answer.trim());
            });
        });
        rl.close();
        
        if (!apiKey) {
            console.log('❌ API key is required to proceed.');
            process.exit(1);
        }
    }

    // Initialize chat client
    const chat = new ClaudeChat(apiKey);
    let streamingMode = false;

    // Setup readline for chat
    const rl = setupReadline();

    // Welcome message
    console.log('\n' + '='.repeat(50));
    console.log('🤖 Claude AI Chat - Powered by AnyRouter');
    console.log('💬 Type \'quit\' or \'exit\' to end the conversation');
    console.log('📖 Type \'help\' for more commands');
    console.log('='.repeat(50) + '\n');

    // Chat loop
    const chatLoop = () => {
        rl.question('You: ', async (input) => {
            const userInput = input.trim();

            try {
                // Handle special commands
                if (['quit', 'exit', 'bye'].includes(userInput.toLowerCase())) {
                    console.log('👋 Goodbye! Thanks for using AnyRouter Claude AI!');
                    rl.close();
                    process.exit(0);
                } else if (userInput.toLowerCase() === 'help') {
                    showHelp();
                    chatLoop();
                    return;
                } else if (userInput.toLowerCase() === 'models') {
                    showModels();
                    chatLoop();
                    return;
                } else if (userInput.toLowerCase() === 'credits') {
                    console.log('💰 Get your free $50 credits: https://anyrouter.top/register?aff=UBdY');
                    chatLoop();
                    return;
                } else if (userInput.toLowerCase() === 'stream') {
                    streamingMode = !streamingMode;
                    console.log(`🔄 Streaming mode ${streamingMode ? 'enabled' : 'disabled'}`);
                    chatLoop();
                    return;
                } else if (!userInput) {
                    chatLoop();
                    return;
                }

                // Send message to Claude
                if (streamingMode) {
                    console.log('🤔 Claude is thinking...\n🤖 Claude: ', { end: '' });
                    process.stdout.write(''); // Start the line
                    
                    await chat.sendStreamingMessage(userInput, (chunk) => {
                        process.stdout.write(chunk);
                    });
                    
                    console.log('\n'); // End the line
                } else {
                    console.log('🤔 Claude is thinking...');
                    const response = await chat.sendMessage(userInput);
                    console.log(`\n🤖 Claude: ${response}\n`);
                }

            } catch (error) {
                console.log(`❌ Error: ${error.message}`);
                console.log('💡 Try again or type \'quit\' to exit.\n');
            }

            chatLoop();
        });
    };

    // Start chat loop
    chatLoop();

    // Handle Ctrl+C
    process.on('SIGINT', () => {
        console.log('\n👋 Chat interrupted. Goodbye!');
        rl.close();
        process.exit(0);
    });
}

// Export for use as module
module.exports = { ClaudeChat };

// Run if called directly
if (require.main === module) {
    main().catch((error) => {
        console.error('💥 Fatal error:', error.message);
        process.exit(1);
    });
} 