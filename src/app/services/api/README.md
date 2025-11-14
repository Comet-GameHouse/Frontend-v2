# API Services Architecture

This directory contains domain-specific API service files. Each service uses the base `ApiClient` from `@utils/api` for HTTP requests.

## Structure

```
services/api/
├── index.ts          # Export all services
├── authService.ts    # Authentication APIs
├── gameService.ts    # Game-related APIs (example)
├── roomService.ts    # Room-related APIs (example)
└── ...
```

## Pattern

Each service file follows this pattern:

```typescript
import { apiClient, type ApiResponse } from '@utils/api'

class GameService {
  async getGames(): Promise<ApiResponse<Game[]>> {
    return apiClient.request<Game[]>('/games')
  }

  async getGameById(id: string): Promise<ApiResponse<Game>> {
    return apiClient.request<Game>(`/games/${id}`)
  }
}

export const gameService = new GameService()
```

## Adding New Services

1. Create a new file: `services/api/yourService.ts`
2. Import `apiClient` from `@utils/api`
3. Create a class with methods that use `apiClient.request()`
4. Export the service instance
5. Add export to `services/api/index.ts`

## Example: Game Service

```typescript
// services/api/gameService.ts
import { apiClient, type ApiResponse } from '@utils/api'
import type { GameMetadata } from '@app-types/game'

class GameService {
  async getGames(): Promise<ApiResponse<GameMetadata[]>> {
    return apiClient.request<GameMetadata[]>('/games')
  }

  async getGameById(id: string): Promise<ApiResponse<GameMetadata>> {
    return apiClient.request<GameMetadata>(`/games/${id}`)
  }
}

export const gameService = new GameService()
```

## Usage in Context/Providers

```typescript
import { gameService } from '@services/api'

// In your provider/context
const games = await gameService.getGames()
```

## Benefits

- ✅ `utils/api.ts` stays general and reusable
- ✅ Domain-specific APIs are organized by feature
- ✅ Easy to find and maintain related API calls
- ✅ Scalable - add new services without bloating one file
- ✅ Type-safe with TypeScript

