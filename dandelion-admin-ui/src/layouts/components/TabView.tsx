import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTabStore, TabItem } from '@/store/tab';

const TabView = () => {
  const navigate = useNavigate();
  const { tabs, activeKey, removeTab, setActiveKey } = useTabStore();

  const onChange = (key: string) => {
    const tab = tabs.find(item => item.key === key);
    if (tab) {
      setActiveKey(key);
      navigate(tab.path);
    }
  };

  const onEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const tab = tabs.find(item => item.key === targetKey);
      if (tab) {
        removeTab(targetKey);
        // 获取新的活动标签
        const newActiveTab = tabs.find(item => item.key === activeKey);
        if (newActiveTab) {
          navigate(newActiveTab.path);
        }
      }
    }
  };

  return (
    <Tabs
      hideAdd
      type="editable-card"
      activeKey={activeKey}
      onChange={onChange}
      onEdit={onEdit}
      items={tabs.map((tab: TabItem) => ({
        key: tab.key,
        label: tab.label,
        closable: tab.closable,
      }))}
      style={{
        background: '#fff',
        padding: '6px 8px 0',
        marginBottom: 0,
      }}
    />
  );
};

export default TabView; 