import React from 'react';
import { MapPin, Bell, Home, Grid3x3, Activity, User } from 'lucide-react';
import { ConditionConfig } from '@/lib/types';

interface PhoneFrameProps {
  children: React.ReactNode;
  config: ConditionConfig;
}

export function PhoneFrame({ children, config }: PhoneFrameProps) {
  return (
    <div className="phone-frame" data-testid="phone-frame">
      <div className="phone-screen">
        <div className="app-header">
          <div className="header-left">
            <MapPin size={20} />
            <div className="header-text">
              <div className="header-title" data-testid="header-title">Downtown</div>
              <div className="header-subtitle" data-testid="header-subtitle">Today • 2 tasks</div>
            </div>
          </div>
          <div className="header-right">
            {config.showSharedNav && (
              <div className="shared-nav-chip" data-testid="home-chip">Home</div>
            )}
            <button className="icon-button">
              <Bell size={20} />
            </button>
          </div>
        </div>

        <main className="app-main">{children}</main>

        <div className="app-tab-bar" data-testid="tabbar">
          <div className="tab-item tab-active">
            <Home size={20} />
            <span>Home</span>
          </div>
          <div className="tab-item">
            <Grid3x3 size={20} />
            <span>Services</span>
          </div>
          <div className="tab-item">
            <Activity size={20} />
            <span>Activity</span>
          </div>
          <div className="tab-item">
            <User size={20} />
            <span>Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
