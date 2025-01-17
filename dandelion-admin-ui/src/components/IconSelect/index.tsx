import { Select } from 'antd';
import * as Icons from '@ant-design/icons';
import React from 'react';
import './index.css';

interface IconSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const IconSelect: React.FC<IconSelectProps> = ({ value, onChange }) => {
  // 获取所有图标
  const iconList = Object.keys(Icons).filter(key => key.endsWith('Outlined'));

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
  };

  return (
    <Select
      showSearch
      value={value}
      onChange={handleChange}
      placeholder="请选择图标"
      optionFilterProp="children"
      style={{ width: '100%' }}
    >
      {iconList.map(iconName => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.FC;
        return (
          <Select.Option key={iconName} value={iconName.replace('Outlined', '')}>
            <IconComponent /> {iconName.replace('Outlined', '')}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default IconSelect; 