import Header from "./Header";
import Sidebar from "./Sidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 min-w-0 flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="mt-5">{children}</main>
      </div>
    </div>
  );
};
