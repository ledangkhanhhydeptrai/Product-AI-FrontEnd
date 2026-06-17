import React from "react";
import { User, Mail, Shield } from "lucide-react";

interface ProfileInfoCardProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
}

interface InfoRowProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  mono: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  mono
}) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
    <div className={`shrink-0 p-2.5 rounded-xl ${iconBg}`}>
      <Icon className={`w-4 h-4 ${iconColor}`} />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
        {label}
      </p>
      <p
        className={`font-semibold text-gray-900 truncate ${mono ? "font-mono text-sm" : "text-base"}`}
      >
        {value}
      </p>
    </div>
  </div>
);

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ user }) => {
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
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Thông tin tài khoản
      </h2>

      <div className="grid md:grid-cols-2 gap-3">
        <InfoRow
          icon={User}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          label="Họ và tên"
          value={user.fullName}
          mono={true}
        />
        <InfoRow
          icon={Mail}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Email"
          value={user.email}
          mono={true}
        />
        <InfoRow
          icon={Shield}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          label="Vai trò"
          value={getRoleLabel(user.role)}
          mono={true}
        />
      </div>
    </div>
  );
};

export default ProfileInfoCard;
