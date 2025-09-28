# Recipe Recommendation Chatbot Frontend

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set environment variables:**
   Create a `.env` file in the `frontend/` directory and add your backend API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
   Adjust the URL to match your backend server address.   

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

   
## 🛠️ Implementation Details

### State Management
We use **TanStack Query** for API data fetching and caching. This provides automatic caching, background updates, and request deduplication, which is ideal for scalable and responsive UIs.

### API Calls
API calls are structured in the `services/api-client.ts` file, using a simple wrapper around `fetch` for HTTP requests. TanStack Query handles the integration of these calls into Client components.

### Tech Stack
- **Next.js** (TypeScript)
- **Tailwind CSS v4**
- **TanStack Query** for API state
- **React Context/State** for local state





