import React from "react";
import { Award, Activity, Star, Clock, TrendingUp } from "lucide-react";

interface ProfileSidebarProps {
  user: {
    fullName: string;
    role: string;
    avatarUrl: string;
  };
}

const stats = [
  {
    label: "Ngày tham gia",
    value: "365",
    unit: "ngày",
    icon: Clock,
    color: "text-violet-500",
    bg: "bg-violet-50"
  },
  {
    label: "Điểm hoạt động",
    value: "1,240",
    unit: "pts",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    label: "Huy hiệu",
    value: "8",
    unit: "huy hiệu",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    label: "Đánh giá",
    value: "4.9",
    unit: "/ 5.0",
    icon: Star,
    color: "text-rose-500",
    bg: "bg-rose-50"
  }
];

const activityDots = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  level: Math.floor(Math.random() * 4)
}));

const levelColor = (level: number) => {
  const map = [
    "bg-gray-100",
    "bg-violet-200",
    "bg-violet-400",
    "bg-violet-600"
  ];
  return map[level];
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user }) => {
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
    <div className="flex flex-col gap-5 h-full">
      {/* Mini avatar card */}
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-violet-600 via-indigo-600 to-purple-700 p-6 text-white shadow-lg">
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-4 w-32 h-32 rounded-full bg-white/10" />

        <div className="relative z-10">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-14 h-14 rounded-xl border-2 border-white/30 object-cover shadow-md mb-3"
          />
          <p className="font-bold text-lg leading-tight">{user.fullName}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium capitalize">
            {getRoleLabel(user.role)}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, unit, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-2 rounded-xl ${bg} mb-2`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-xl font-bold text-gray-900 leading-none">
              {value}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{unit}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Activity heatmap */}
      <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-violet-500" />
          <p className="text-sm font-semibold text-gray-700">
            Hoạt động gần đây
          </p>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {activityDots.map(({ id, level }) => (
            <div
              key={id}
              title={`Level ${level}`}
              className={`w-full aspect-square rounded-sm ${levelColor(level)}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-400">5 tuần trước</p>
          <div className="flex items-center gap-1">
            <p className="text-xs text-gray-400 mr-1">Ít</p>
            {[0, 1, 2, 3].map((l) => (
              <div key={l} className={`w-3 h-3 rounded-sm ${levelColor(l)}`} />
            ))}
            <p className="text-xs text-gray-400 ml-1">Nhiều</p>
          </div>
        </div>
      </div>

      {/* Quick badge */}
      <div className="rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-100 p-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-100">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Thành viên tích cực
            </p>
            <p className="text-xs text-amber-600 mt-0.5">Top 5% người dùng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
