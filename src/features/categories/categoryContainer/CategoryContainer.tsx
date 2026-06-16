import React, { useCallback, useEffect } from "react";

import { Loader2 } from "lucide-react";

import { categoryRequest } from "../categorySlice";
import CategorySection from "../../../pages/home/components/CategorySection";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

const CategoryContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(categoryRequest());
  }, [dispatch]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    console.log("Selected Category:", categoryId);
    // dispatch(productByCategoryRequest(categoryId))
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400">
        <Loader2 size={16} className="animate-spin" />
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      </div>
    );
  }

  return (
    <CategorySection
      categories={data}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export default CategoryContainer;
