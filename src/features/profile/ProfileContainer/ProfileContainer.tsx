import React from "react";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getMeRequest } from "../profileSlice";

import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInfoCard from "../components/ProfileInfoCard";
import { useNavigate } from "react-router-dom";

// ─── Loading State ────────────────────────────────────────────────────────────
const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
  </div>
);

// ─── Error State ──────────────────────────────────────────────────────────────
const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="max-w-xl mx-auto mt-10">
    <div className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-2xl">
      <AlertCircle className="text-red-500 shrink-0" />
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  </div>
);

// ─── Unauthenticated State ────────────────────────────────────────────────────
const UnauthenticatedState: React.FC = () => (
  <div className="max-w-xl mx-auto mt-10">
    <div className="flex items-center gap-3 p-4 border border-amber-200 bg-amber-50 rounded-2xl">
      <AlertCircle className="text-amber-500 shrink-0" />
      <div>
        <p className="font-medium text-amber-700">Bạn chưa đăng nhập</p>
        <p className="text-sm text-amber-600">
          Vui lòng đăng nhập để xem thông tin cá nhân.
        </p>
      </div>
    </div>
  </div>
);

// ─── Main Container ───────────────────────────────────────────────────────────
const ProfileContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(getMeRequest());
  }, [dispatch]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!user) return <UnauthenticatedState />;

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mt-5">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* ── Left sidebar ── */}
          <aside>
            <ProfileSidebar user={user} />
          </aside>

          {/* ── Right main content ── */}
          <main className="flex flex-col gap-5">
            {/* Header card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden pb-6">
              <ProfileHeader user={user} />
            </div>

            {/* Info card */}
            <ProfileInfoCard user={user} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
