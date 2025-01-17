import { create } from 'zustand';

export interface TabItem {
  key: string;
  label: string;
  path: string;
  closable: boolean;
}

interface TabState {
  tabs: TabItem[];
  activeKey: string;
  addTab: (tab: TabItem) => void;
  removeTab: (targetKey: string) => void;
  setActiveKey: (key: string) => void;
}

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeKey: '',
  addTab: (tab: TabItem) => {
    const { tabs } = get();
    const existTab = tabs.find(item => item.key === tab.key);
    if (!existTab) {
      set(state => ({
        tabs: [...state.tabs, tab],
        activeKey: tab.key,
      }));
    } else {
      set({ activeKey: tab.key });
    }
  },
  removeTab: (targetKey: string) => {
    const { tabs, activeKey } = get();
    let newActiveKey = activeKey;
    let lastIndex = -1;

    tabs.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newTabs = tabs.filter(item => item.key !== targetKey);

    if (newTabs.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newTabs[lastIndex].key;
      } else {
        newActiveKey = newTabs[0].key;
      }
    }

    set({
      tabs: newTabs,
      activeKey: newActiveKey,
    });
  },
  setActiveKey: (key: string) => {
    set({ activeKey: key });
  },
})); 