'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUsers, updateRole } from '@/redux/slices/admin/adminSlice';
import ReorderableTable, { TableColumnDef, TableRowData } from '@/components/ui/reorderable-table';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, UserCheck, TrendingUp, CircleUserRound } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleUpdate = async (userId: string, newRole: number) => {
    await dispatch(updateRole({ userId, role: newRole }));
  };

  const totalAdmins = useMemo(() => users.filter(u => u.role === 1).length, [users]);
  const totalRegularUsers = useMemo(() => users.filter(u => u.role === 0).length, [users]);

  // Define Columns for ReorderableTable
  const columns: TableColumnDef[] = [
    { key: "user", label: "User", width: "300px" },
    { key: "role", label: "Role", width: "150px" },
    { key: "createdAt", label: "Created", width: "200px" },
  ];

  // Cell Renderer for Users Table
  const renderCell = (row: TableRowData, key: string) => {
    const user = row as { _id: string; name: string; email: string; role: number; createdAt: string };
    switch (key) {
      case "user":
        return (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-900">{user.name}</span>
            <span className="text-xs text-slate-500">{user.email}</span>
          </div>
        );
      case "role":
        return (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border ${
            user.role === 1 
              ? 'bg-purple-100 text-purple-700 border-purple-300'
              : 'bg-blue-100 text-blue-700 border-blue-300'
          }`}>
            {user.role === 1 ? (
              <ShieldCheck className="w-3 h-3" />
            ) : (
              <CircleUserRound className="w-3 h-3" />
            )}
            {user.role === 1 ? 'Administrator' : 'General User'}
          </span>
        );
      case "createdAt":
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="text-xs text-slate-500">Registered</span>
          </div>
        );
      default:
        return row[key] as React.ReactNode;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
          <h3 className="font-semibold mb-2">Error</h3>
          <p className="text-sm mb-4">{error}</p>
          <button onClick={() => dispatch(fetchUsers())} className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative space-y-6 sm:py-2"
    >
      {/* Header & Stats Section */}
      <div className="bg-transparent sm:bg-white sm:border sm:border-slate-200 rounded-2xl sm:p-6 mb-2">
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 text-sm mt-1">Configure system permissions and manage user access levels.</p>
        </motion.div>

        {/* Stats Section - Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {[
            { label: "Total Admins", value: totalAdmins, icon: ShieldCheck },
            { label: "Standard Users", value: totalRegularUsers, icon: CircleUserRound },
            { label: "System Reach", value: users.length, icon: Users }
            ].map((stat) => (
            <motion.div
                key={stat.label}
                variants={itemVariants}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
            >
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                </div>
            </motion.div>
            ))}
        </div>
      </div>

      {/* Table Section */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <ReorderableTable 
            data={users as unknown as TableRowData[]} 
            columns={columns} 
            renderCell={renderCell} 
        />
      </motion.div>
    </motion.div>
  );
};

export default AdminUsers;
