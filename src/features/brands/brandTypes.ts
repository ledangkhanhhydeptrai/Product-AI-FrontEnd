export interface BrandProps {
  id: string;
  name: string;
  logo: string;
  description: string;
}
export interface CreateBrandsProps {
  name: string;
  description: string;
  logo: File | null;
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
  logo: File | null;
  setLogo: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  loading: boolean;
  error: string | null;
}
export type CloseProps = {
  onClose: () => void;
};
export type Props = {
  selectedBrand: BrandProps | null;
  onClose: () => void;
};
export interface UpdateBrandId extends CreateBrandsProps {
  id: string;
}
