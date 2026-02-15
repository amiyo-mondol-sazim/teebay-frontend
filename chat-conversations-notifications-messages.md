# Frontend Integration Guide

## Overview

This document explains how the Chat, Notifications, and Conversations modules work together and how the frontend should integrate with them.

## How The Modules Work Together

```
┌──────────────┐     ┌─────────────────┐     ┌────────────────┐
│  Frontend    │────▶│  Conversations  │◀────│  REST API      │
│              │     │  (REST API)     │     │                │
└──────────────┘     └─────────────────┘     └────────────────┘
        │                                              │
        │ WebSocket                                    │
        ▼                                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      Chat Gateway (WebSocket)                │
│  ┌──────────────┐     ┌─────────────────┐                  │
│  │ ChatService  │────▶│  Notifications  │                  │
│  └──────────────┘     │  (REST API)     │                  │
│         │             └─────────────────┘                  │
│         ▼                                                   │
│  Real-time events: newMessage, notification                │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Start a conversation**: Call `POST /conversations` with `participantId` and optional `productId`
2. **List conversations**: Call `GET /conversations` to get all conversations for the current user
3. **Connect to real-time**: Establish WebSocket connection to `/chat` namespace with JWT token
4. **Join rooms**: Send `join` event with conversation IDs to subscribe to updates
5. **Receive messages**: Listen for `newMessage` event to get real-time messages
6. **Receive notifications**: Listen for `notification` event for push notifications

## Frontend Implementation

### 1. WebSocket Connection

```typescript
import { io, Socket } from "socket.io-client";

const socket: Socket = io("/chat", {
  auth: { token: "USER_JWT_TOKEN" },
});

socket.on("connect", () => {
  console.log("Connected to chat");
});
```

### 2. Join Conversations

```typescript
socket.emit("join", { conversations: [1, 2, 3] });
```

### 3. Listen for Events

```typescript
// New message in a conversation
socket.on("newMessage", (data) => {
  console.log("New message:", data);
  // Update UI with new message
});

// Push notification
socket.on("notification", (data) => {
  console.log("Notification:", data);
  // Show notification badge/toast
});
```

### 4. Leave Conversations

```typescript
socket.emit("leave", { conversations: [1, 2, 3] });
```

## REST API Endpoints

### Conversations

- `POST /conversations` - Create a new conversation
- `GET /conversations` - List all conversations for current user
- `GET /conversations/:id` - Get a specific conversation

### Notifications

- `GET /notifications` - Get notification history
- `GET /notifications/unread-count` - Get unread count
- `PATCH /notifications/:id/read` - Mark one as read
- `PATCH /notifications/read-all` - Mark all as read

## Important Notes

1. **Authentication**: WebSocket connections require JWT token in auth or Authorization header
2. **Room Management**: Frontend must join conversation rooms to receive messages
3. **Notifications**: Created automatically when a message is sent - no separate API call needed
4. **Real-time Only**: Message delivery happens via WebSocket; REST API is for history only
