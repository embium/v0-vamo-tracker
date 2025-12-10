'use client';

import { AssistantRuntimeProvider } from '@assistant-ui/react';
import {
  useChatRuntime,
  AssistantChatTransport,
} from '@assistant-ui/react-ai-sdk';
import { Thread } from '@/components/thread';

const MyApp = () => {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
              AI Assistant
            </h1>
            <p className="text-lg text-muted-foreground">
              Get help building your startup and finding customers
            </p>
          </div>
          <div className="flex flex-col h-[calc(100vh-14rem)]">
            <Thread />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};

export default MyApp;
