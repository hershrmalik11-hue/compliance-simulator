import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Shield, Clock, DollarSign, Users, AlertTriangle, CheckCircle, Target, Zap } from 'lucide-react';

const ComplianceImpactSimulator = () => {
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [selectedMarket, setSelectedMarket] = useState('US');
  const [animationStep, setAnimationStep] = useState(0);

  // Simulated data for different compliance approaches
  const scenarios = {
    current: {
      name: "Current Coinbase Approach",
      description: "Current KYC flow with standard data collection",
      conversionRate: 68,
      engineeringComplexity: 7,
      regulatoryRisk: 15,
      timeToMarket: 120,
      userFriction: 8.2,
      operationalCost: 450000,
      complianceScore: 85
    },
    optimized: {
      name: "AI-Optimized Phased Collection",
      description: "Smart phased KYC with risk-based triggers",
      conversionRate: 84,
      engineeringComplexity: 6,
      regulatoryRisk: 12,
      timeToMarket: 95,
      userFriction: 4.1,
      operationalCost: 320000,
      complianceScore: 92
    },
    aggressive: {
      name: "Minimal Upfront Collection",
      description: "Defer most data collection until transaction triggers",
      conversionRate: 92,
      engineeringComplexity: 8,
      regulatoryRisk: 35,
      timeToMarket: 75,
      userFriction: 2.3,
      operationalCost: 280000,
      complianceScore: 71
    },
    conservative: {
      name: "Full Upfront Verification",
      description: "Collect all data during onboarding",
      conversionRate: 45,
      engineeringComplexity: 5,
      regulatoryRisk: 8,
      timeToMarket: 150,
      userFriction: 12.8,
      operationalCost: 580000,
      complianceScore: 98
    }
  };

  const markets = {
    US: { risk: 'Medium', requirements: 'CIP + AML + OFAC', complexity: 7 },
    EU: { risk: 'High', requirements: 'GDPR + AML5 + MiCA', complexity: 9 },
    UK: { risk: 'Medium', requirements: 'FCA + AML + PCI', complexity: 6 },
    Singapore: { risk: 'Low', requirements: 'MAS + AML + KYC', complexity: 5 },
    Japan: { risk: 'High', requirements: 'JFSA + AML + Privacy', complexity: 8 }
  };

  const currentScenario = scenarios[selectedScenario];

  // Animation effect for metrics
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearTimeout(timer);
  }, [animationStep]);

  // Conversion funnel data
  const conversionData = [
    { step: 'Landing', current: 100, optimized: 100, aggressive: 100, conservative: 100 },
    { step: 'Started KYC', current: 85, optimized: 95, aggressive: 98, conservative: 75 },
    { step: 'Completed KYC', current: 68, optimized: 84, aggressive: 92, conservative: 45 },
    { step: 'First Transaction', current: 62, optimized: 79, aggressive: 85, conservative: 42 },
    { step: 'Active User', current: 58, optimized: 75, aggressive: 78, conservative: 40 }
  ];

  // Risk vs Conversion scatter data
  const riskConversionData = Object.entries(scenarios).map(([key, scenario]) => ({
    name: scenario.name.split(' ')[0],
    risk: scenario.regulatoryRisk,
    conversion: scenario.conversionRate,
    complexity: scenario.engineeringComplexity
  }));

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const MetricCard = ({ title, value, change, icon: Icon, color, suffix = '', prefix = '' }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {prefix}{value}{suffix}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : 
               change < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : null}
              {change > 0 ? '+' : ''}{change}% vs Current
            </div>
          )}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  const calculateChange = (current, baseline) => {
    return Math.round(((current - baseline) / baseline) * 100);
  };

  const baselineScenario = scenarios.current;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-blue-600" />
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Compliance Impact Simulator</h1>
                <p className="text-gray-600">Strategic decision-making for cross-functional compliance programs</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                Coinbase TPM Strategic Demo
              </div>
              <p className="text-sm text-gray-500 mt-1">Strategic Decision Making Tool</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Approach
              </label>
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <option key={key} value={key}>{scenario.name}</option>
                ))}
              </select>
              <p className="text-sm text-gray-600 mt-2">{currentScenario.description}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Market
              </label>
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(markets).map(([key, market]) => (
                  <option key={key} value={key}>{key} - {market.requirements}</option>
                ))}
              </select>
              <p className="text-sm text-gray-600 mt-2">
                Risk Level: {markets[selectedMarket].risk} | Complexity: {markets[selectedMarket].complexity}/10
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="User Conversion Rate"
            value={currentScenario.conversionRate}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.conversionRate, baselineScenario.conversionRate) : undefined}
            icon={Users}
            color="text-blue-600"
            suffix="%"
          />
          <MetricCard
            title="Engineering Complexity"
            value={currentScenario.engineeringComplexity}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.engineeringComplexity, baselineScenario.engineeringComplexity) : undefined}
            icon={Shield}
            color="text-purple-600"
            suffix="/10"
          />
          <MetricCard
            title="Regulatory Risk"
            value={currentScenario.regulatoryRisk}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.regulatoryRisk, baselineScenario.regulatoryRisk) : undefined}
            icon={AlertTriangle}
            color="text-red-600"
            suffix="%"
          />
          <MetricCard
            title="Time to Market"
            value={currentScenario.timeToMarket}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.timeToMarket, baselineScenario.timeToMarket) : undefined}
            icon={Clock}
            color="text-green-600"
            suffix=" days"
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="User Friction Score"
            value={currentScenario.userFriction}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.userFriction, baselineScenario.userFriction) : undefined}
            icon={TrendingDown}
            color="text-orange-600"
            suffix="/10"
          />
          <MetricCard
            title="Annual Operational Cost"
            value={(currentScenario.operationalCost / 1000).toFixed(0)}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.operationalCost, baselineScenario.operationalCost) : undefined}
            icon={DollarSign}
            color="text-emerald-600"
            prefix="$"
            suffix="K"
          />
          <MetricCard
            title="Compliance Score"
            value={currentScenario.complianceScore}
            change={selectedScenario !== 'current' ? calculateChange(currentScenario.complianceScore, baselineScenario.complianceScore) : undefined}
            icon={CheckCircle}
            color="text-indigo-600"
            suffix="/100"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Funnel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Conversion Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#6B7280" strokeWidth={2} name="Current" />
                <Line type="monotone" dataKey="optimized" stroke="#10B981" strokeWidth={2} name="Optimized" />
                <Line type="monotone" dataKey="aggressive" stroke="#F59E0B" strokeWidth={2} name="Aggressive" />
                <Line type="monotone" dataKey="conservative" stroke="#EF4444" strokeWidth={2} name="Conservative" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk vs Conversion Scatter */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk vs Conversion Trade-off</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskConversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversion" fill="#3B82F6" name="Conversion %" />
                <Bar dataKey="risk" fill="#EF4444" name="Regulatory Risk %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic TPM Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Engineering Priority</h4>
              <p className="text-sm text-blue-800">
                Build modular KYC system with API-driven data collection triggers. 
                Invest in real-time risk scoring to enable dynamic verification flows.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Compliance Strategy</h4>
              <p className="text-sm text-green-800">
                Implement risk-based tiered approach. Collect minimum viable data upfront, 
                trigger additional collection based on transaction patterns and amounts.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Product Impact</h4>
              <p className="text-sm text-purple-800">
                Optimize for initial conversion while maintaining compliance. 
                Use progressive disclosure and smart defaults to reduce user friction.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Functional Impact Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cross-Functional Impact Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Team</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Impact</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Effort Required</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Timeline</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Dependencies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Engineering</td>
                  <td className="px-4 py-3 text-gray-700">API refactoring + new risk engine</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium</span>
                  </td>
                  <td className="px-4 py-3">8-12 weeks</td>
                  <td className="px-4 py-3">Compliance API specs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Product</td>
                  <td className="px-4 py-3 text-gray-700">UX redesign + A/B testing</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Low</span>
                  </td>
                  <td className="px-4 py-3">4-6 weeks</td>
                  <td className="px-4 py-3">User research</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Compliance</td>
                  <td className="px-4 py-3 text-gray-700">Policy updates + risk framework</td>
                  <td className="px-4 py-3">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">High</span>
                  </td>
                  <td className="px-4 py-3">6-8 weeks</td>
                  <td className="px-4 py-3">Legal review</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Legal</td>
                  <td className="px-4 py-3 text-gray-700">Regulatory filing + approval</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium</span>
                  </td>
                  <td className="px-4 py-3">10-14 weeks</td>
                  <td className="px-4 py-3">Regulator engagement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 bg-white rounded-lg border border-gray-200 p-4">
          <p className="font-medium">Demonstrates Strategic TPM Capabilities</p>
          <p className="mt-1">
            Cross-functional analysis • Data-driven decision making • Business impact quantification • Risk assessment • Stakeholder alignment
          </p>
          <p className="mt-2 text-xs">
            Built to showcase ability to bridge compliance expertise with product strategy and engineering execution
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceImpactSimulator;
