export interface CategoryProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}
export interface CreateCategoryProps {
  name: string;
  slug: string;
  description: string;
  meta: {
    onSuccess: () => void;
    onError: () => void;
  };
}
export interface CreateCategoryPropsChildren {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
