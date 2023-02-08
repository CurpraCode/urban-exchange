import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppContainer from './components/AppContainer';

import "./App.css"

// Create a client
const queryClient = new QueryClient()
function App() {
  return (
     <QueryClientProvider client={queryClient}>
      <AppContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
