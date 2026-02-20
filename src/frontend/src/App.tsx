import { RegistrationForm } from './components/RegistrationForm';
import { SnakeCanvas } from './components/SnakeCanvas';
import { UserCountDisplay } from './components/UserCountDisplay';
import { useSnakeData } from './hooks/useSnakeData';
import { Users } from 'lucide-react';

function App() {
  const { segments, userCount, isLoading } = useSnakeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950">
      {/* Header */}
      <header className="border-b border-emerald-200/50 dark:border-emerald-800/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🐍</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Snake Registry
                </h1>
                <p className="text-sm text-muted-foreground">Watch the snake grow with every registration</p>
              </div>
            </div>
            <UserCountDisplay count={userCount} isLoading={isLoading} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Snake Canvas - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-200/50 dark:border-emerald-800/30 overflow-hidden">
              <div className="p-6 border-b border-emerald-200/50 dark:border-emerald-800/30">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  Live Snake Visualization
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  The snake grows longer with each new registration
                </p>
              </div>
              <SnakeCanvas segments={segments} isLoading={isLoading} />
            </div>
          </div>

          {/* Registration Form - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-200/50 dark:border-emerald-800/30 p-6 sticky top-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Join the Community
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Register to add a segment to the snake
                </p>
              </div>
              <RegistrationForm />
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 rounded-2xl p-6 border border-emerald-300/30 dark:border-emerald-700/30">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span>
                How it works
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                  <span>Register with a unique username</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                  <span>Watch the snake grow by one segment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                  <span>See the snake move continuously across the canvas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-200/50 dark:border-emerald-800/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Snake Registry. Built with{' '}
              <span className="text-red-500">❤️</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'snake-registry'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
