import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Share2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Info,
  Layers,
} from 'lucide-react';
import { SAMPLE_ANALYTICS } from '../data/mockData';
import { NavigationPage } from '../components/layout/Sidebar';

interface AnalyticsPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onNavigate }) => {
  const [activeMetric, setActiveMetric] = useState<'views' | 'clips' | 'posts'>('views');
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const { summary, platforms, weeklyActivity, topContent } = SAMPLE_ANALYTICS;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Performance & Reach Intelligence</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Demo Data Sample
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Studio Analytics
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Evaluate cross-platform retention, organic view velocity, and audience growth across repurposed cuts.
          </p>
        </div>

        {/* Timeframe pill */}
        <div className="flex items-center gap-2 text-xs font-medium text-stone-600 bg-stone-100 p-1 rounded-lg">
          <span className="px-3 py-1 bg-white text-stone-900 rounded shadow-xs font-semibold">
            Last 30 Days
          </span>
          <span className="px-3 py-1 text-stone-500 hover:text-stone-900 cursor-pointer">
            All Time
          </span>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E7E3DC] flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 text-stone-700">
          <Info className="w-4 h-4 text-stone-500 shrink-0" />
          <span>
            <strong>Simulated Analytics View</strong>: During live deployment, metrics sync automatically via YouTube Analytics API and Meta Insights.
          </span>
        </div>
      </div>

      {/* Summary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((metric, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs">
            <span className="text-xs font-medium text-stone-500">{metric.label}</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-stone-900">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-emerald-700 font-mono">
                {metric.change}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-2">{metric.timeframe}</p>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart Component */}
      <div className="bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">Weekly Output & Velocity</h2>
            <p className="text-xs text-stone-500">Repurposed asset generation and audience view trajectory</p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveMetric('views')}
              data-active={activeMetric === 'views'}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeMetric === 'views'
                  ? 'bg-[#721246] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Views (k)
            </button>
            <button
              onClick={() => setActiveMetric('clips')}
              data-active={activeMetric === 'clips'}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeMetric === 'clips'
                  ? 'bg-[#721246] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Clips Generated
            </button>
            <button
              onClick={() => setActiveMetric('posts')}
              data-active={activeMetric === 'posts'}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeMetric === 'posts'
                  ? 'bg-[#721246] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Posts Distributed
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-4">
          <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-stone-200 pb-2 px-2">
            {weeklyActivity.map((day) => {
              const value =
                activeMetric === 'views'
                  ? day.views
                  : activeMetric === 'clips'
                  ? day.clips * 10
                  : day.posts * 20;

              const maxVal = 130;
              const heightPercent = Math.min(100, Math.round((value / maxVal) * 100));
              const isHovered = hoveredDay === day.day;

              return (
                <div
                  key={day.day}
                  onMouseEnter={() => setHoveredDay(day.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div
                    className={`text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-50 transition-opacity whitespace-nowrap shadow-xs ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {activeMetric === 'views' ? `${day.views}k views` : `${value / (activeMetric === 'clips' ? 10 : 20)} items`}
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[48px] bg-stone-100 rounded-t-lg h-full flex items-end overflow-hidden p-1">
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isHovered ? 'bg-amber-600' : 'bg-stone-800'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Day Label */}
                  <span className="text-xs font-mono text-stone-600 group-hover:text-stone-900 group-hover:font-bold">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-3">
            <span>Baseline: Mon–Sun Aggregate Velocity</span>
            <span className="font-mono">Peak Day: Thursday (114K views)</span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Platform Performance Table & Top Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 Columns: Platform Performance */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">Platform Performance</h2>
            <span className="text-xs text-stone-500 font-mono">4 Connected Channels</span>
          </div>

          <div className="divide-y divide-stone-100">
            {platforms.map((p) => (
              <div key={p.platform} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  <div>
                    <h3 className="text-xs font-bold capitalize text-stone-900">{p.platform}</h3>
                    <p className="text-[11px] text-stone-400 font-mono tabular-nums">
                      {p.followersGained} followers · {p.shares} shares
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold font-mono text-stone-900 tabular-nums">
                    {p.views}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-mono font-medium">
                    {p.engagement} engagement
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Columns: Top-Performing Content */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">Top-Performing Content</h2>
            <span className="text-xs text-stone-500 font-mono">Audience Retention Rank</span>
          </div>

          <div className="space-y-3">
            {topContent.map((item, index) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/60 hover:bg-stone-50 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-stone-400 font-bold">0{index + 1}</span>
                    <h3 className="text-xs font-semibold text-stone-900 truncate" title={item.title}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <span className="capitalize font-medium text-stone-700">{item.platform}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.views} views</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium font-mono">{item.engagementRate} CTR</span>
                  </div>
                </div>

                {/* Retention score badge */}
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                    {item.retentionScore}%
                  </span>
                  <p className="text-[10px] text-stone-400">Retention</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
