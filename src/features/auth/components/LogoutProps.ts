export interface LogoutProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: string | null;
}
