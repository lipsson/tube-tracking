import { useAuthState } from '@/auth';
import { DashboardAdminPage } from './DashboardAdmin.page';
import { DashboardPage } from './Dashboard.page';
import { DashboardUserPage } from './DashboardUser.page';

export default function Home() {
    const { user } = useAuthState();
    const hadnleSwitchDashboard = user?.isAdmin ? <DashboardAdminPage /> : <DashboardUserPage />
    return user !== null ? hadnleSwitchDashboard : <DashboardPage />
}
