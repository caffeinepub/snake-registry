import { useState } from 'react';
import { useRegisterUser } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function RegistrationForm() {
  const [username, setUsername] = useState('');
  const { mutate: registerUser, isPending, isSuccess, isError, error } = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      registerUser(username.trim());
    }
  };

  const handleReset = () => {
    setUsername('');
  };

  if (isSuccess) {
    return (
      <div className="space-y-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
          <h3 className="font-semibold text-lg text-foreground mb-2">Welcome aboard! 🎉</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You've successfully registered and added a segment to the snake!
          </p>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
          >
            Register Another User
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isPending}
          className="h-12 rounded-xl border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
          required
        />
      </div>

      {isError && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900 dark:text-red-200">Registration failed</p>
            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
              {error instanceof Error ? error.message : 'Please try again with a different username'}
            </p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending || !username.trim()}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Registering...
          </>
        ) : (
          <>
            <span className="mr-2">🐍</span>
            Register & Grow Snake
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Each registration adds one segment to the snake
      </p>
    </form>
  );
}
