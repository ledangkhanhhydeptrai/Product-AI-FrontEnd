export interface BrandProps {
  id: string;
  name: string;
  logo: string;
  description: string;
}
export interface CreateBrandsProps {
  name: string;
  description: string;
  file: File | null;
  meta: {
    onSuccess: () => void;
    onError: () => void;
  };
}
export interface CreateBrandPropsForm {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}
export type CloseProps = {
  onClose: () => void;
};
export interface UpdateBrandId extends CreateBrandsProps {
  id: string;
}
