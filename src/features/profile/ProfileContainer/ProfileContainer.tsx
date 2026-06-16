import React from "react";
import { User, Mail, Shield, Loader2, AlertCircle } from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getMeRequest } from "../profileSlice";

const ProfileContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user, loading, error } = useAppSelector((state) => state.profile);
  const profileState = useAppSelector((state) => state.profile);
  console.log("PROFILE STATE FULL:", profileState);
  React.useEffect(() => {
    dispatch(getMeRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <div className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-xl">
          <AlertCircle className="text-red-500" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover */}
        <div className="h-40 bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500" />

        {/* Profile */}
        <div className="px-8 pb-8">
          <div className="-mt-16 flex flex-col items-center">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              {user.fullName}
            </h1>

            <p className="text-gray-500">{user.email}</p>

            <span className="mt-3 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium capitalize">
              {user.role}
            </span>
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
              <div className="p-3 rounded-xl bg-indigo-100">
                <User className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">{user.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
              <div className="p-3 rounded-xl bg-green-100">
                <Mail className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 md:col-span-2">
              <div className="p-3 rounded-xl bg-purple-100">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          {/* ID */}
          <div className="mt-6 p-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">User ID</p>
            <p className="font-mono text-sm text-gray-700 break-all">
              {user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
