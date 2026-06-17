import React from "react";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    fullName: string;
    email: string;
    role: string;
    avatarUrl: string;
  };
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case "admin":
      return "Quản trị viên";
    case "user":
      return "Người dùng";
    case "staff":
      return "Nhân viên";
    default:
      return role;
  }
};

const getRoleBadgeStyle = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-rose-100 text-rose-700";
    case "staff":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-indigo-100 text-indigo-700";
  }
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div>
      {/* Cover */}
      <div className="h-40 bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600 relative overflow-hidden rounded-t-3xl">
        <div
          className="absolute inset-0 opacity-10"
          
        />
      </div>

      {/* Avatar + Info row — sits below cover, no absolute positioning */}
      <div className="px-6 pb-6">
        {/* Avatar pulled up over cover */}
        <div className="flex items-end gap-5 -mt-12">
          {/* Avatar */}
          <div className="group relative shrink-0">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
            />
            <button
              className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              title="Đổi ảnh"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Spacer to push name down so it aligns below cover edge */}
          <div className="pb-1 flex flex-col gap-1">
            <span
              className={`self-start px-3 py-0.5 rounded-full text-xs font-semibold ${getRoleBadgeStyle(user.role)}`}
            >
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>

        {/* Name & email — fully below, no overlap risk */}
        <div className="mt-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {user.fullName}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
