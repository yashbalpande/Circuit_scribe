import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "./components/ui/tooltip";
import { FirebaseAuthProvider } from "./components/FirebaseAuthProvider";
import CoursePage from "./components/LearningModules";
<Route path="/src\components\LearningModules.tsx" element={<CoursePage />} />
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="circuit-scribe-theme">
    <FirebaseAuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<CoursePage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </FirebaseAuthProvider>
  </ThemeProvider>
);

export default App;
