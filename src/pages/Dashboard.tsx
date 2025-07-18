import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, Globe, Smartphone, Monitor, Clock } from 'lucide-react';

interface Visit {
  id: string;
  created_at: string;
  page_url: string;
  user_agent: string | null;
  referrer: string | null;
  country: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  screen_resolution: string | null;
  language: string | null;
  session_id: string | null;
  duration: number | null;
  ip_address: string | null;
}

const Dashboard = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    avgDuration: 0,
    topPages: [] as { page: string; count: number }[],
    deviceStats: [] as { device: string; count: number }[],
    browserStats: [] as { browser: string; count: number }[],
    dailyVisits: [] as { date: string; visits: number }[]
  });

  useEffect(() => {
    fetchVisits();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('visits')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visits' }, 
        () => {
          fetchVisits();
        })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchVisits = async () => {
    try {
      const { data, error } = await supabase
        .from('visits' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVisits((data as unknown as Visit[]) || []);
      calculateStats((data as unknown as Visit[]) || []);
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (visitsData: Visit[]) => {
    // Se não há dados, mostrar zeros ao invés de NaN
    if (visitsData.length === 0) {
      setStats({
        totalVisits: 0,
        uniqueVisitors: 0,
        avgDuration: 0,
        topPages: [],
        deviceStats: [],
        browserStats: [],
        dailyVisits: []
      });
      return;
    }

    const uniqueVisitors = new Set(visitsData.map(v => v.session_id || v.ip_address)).size;
    const avgDuration = visitsData.reduce((acc, v) => acc + (v.duration || 0), 0) / visitsData.length;
    
    // Top pages
    const pageCount = visitsData.reduce((acc, v) => {
      const page = new URL(v.page_url).pathname;
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topPages = Object.entries(pageCount)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Device stats - tratar valores nulos
    const deviceCount = visitsData.reduce((acc, v) => {
      const device = v.device_type || 'Desconhecido';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const deviceStats = Object.entries(deviceCount)
      .map(([device, count]) => ({ device, count }));

    // Browser stats - tratar valores nulos
    const browserCount = visitsData.reduce((acc, v) => {
      const browser = v.browser || 'Desconhecido';
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const browserStats = Object.entries(browserCount)
      .map(([browser, count]) => ({ browser, count }));

    // Daily visits (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyVisits = last7Days.map(date => {
      const count = visitsData.filter(v => 
        v.created_at.split('T')[0] === date
      ).length;
      return { 
        date: new Date(date).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }), 
        visits: count 
      };
    });

    setStats({
      totalVisits: visitsData.length,
      uniqueVisitors,
      avgDuration: Math.round(avgDuration),
      topPages,
      deviceStats,
      browserStats,
      dailyVisits
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Acompanhe as visitas do seu portfólio em tempo real</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total de Visitas</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.totalVisits}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Visitantes Únicos</CardTitle>
              <Globe className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.uniqueVisitors}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{formatDuration(stats.avgDuration)}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {visits.filter(v => v.created_at.split('T')[0] === new Date().toISOString().split('T')[0]).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Visitas por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ visits: { label: "Visitas", color: "hsl(var(--primary))" } }}>
                <ResponsiveContainer width="100%" height={300}>
                  {/* @ts-ignore */}
                  <LineChart data={stats.dailyVisits}>
                    {/* @ts-ignore */}
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    {/* @ts-ignore */}
                    <YAxis stroke="#9CA3AF" />
                    {/* @ts-ignore */}
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {/* @ts-ignore */}
                    <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Dispositivos</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ count: { label: "Visitas", color: "hsl(var(--primary))" } }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.deviceStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ device, percent }) => `${device}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.deviceStats.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Visits Table */}
        <Card className="bg-slate-800/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400">Visitas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Data/Hora</TableHead>
                  <TableHead className="text-gray-300">Página</TableHead>
                  <TableHead className="text-gray-300">Dispositivo</TableHead>
                  <TableHead className="text-gray-300">Navegador</TableHead>
                  <TableHead className="text-gray-300">Duração</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visits.slice(0, 10).map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="text-gray-300">
                      {new Date(visit.created_at).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new URL(visit.page_url).pathname}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {visit.device_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{visit.browser}</TableCell>
                    <TableCell className="text-gray-300">{formatDuration(visit.duration)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;