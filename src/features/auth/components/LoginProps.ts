export interface Props {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: string | null;
}
