import { useEffect, useState } from 'react';
import { Form, Transfer } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { RoleListItem } from '@/api/types';
import type { TransferItem } from 'antd/es/transfer';
import { SearchOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import styles from './AssignUsersForm.module.css';

interface AssignUsersFormProps {
  form: FormInstance;
  initialValues: RoleListItem;
  userList: TransferItem[];
  loading?: boolean;
}

const AssignUsersForm: React.FC<AssignUsersFormProps> = ({ 
  form, 
  initialValues,
  userList,
  loading
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  // 处理穿梭框值变化
  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
    form.setFieldValue('user_ids', newTargetKeys.map(Number));
  };

  // 初始化已选择的用户
  useEffect(() => {
    const selectedKeys = initialValues.user_ids?.map(String) || [];
    setTargetKeys(selectedKeys);
    form.setFieldValue('user_ids', initialValues.user_ids || []);
  }, [initialValues]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="user_ids"
        label="关联用户"
      >
        <Transfer
          className={styles.userTransfer}
          dataSource={userList}
          titles={['未选择', '已选择']}
          render={item => item.title as string}
          listStyle={{
            height: 380,
          }}
          loading={loading}
          showSearch
          searchPlaceholder="搜索用户"
          notFoundContent="暂无数据"
          selectionsIcon={false}
          targetKeys={targetKeys}
          onChange={handleChange}
          filterOption={(inputValue, item) =>
            (item.title as string).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
            (item.description as string).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
          oneWay={false}
          pagination={{
            pageSize: 10,
            simple: true,
            showSizeChanger: false,
            showLessItems: true
          }}
          showSelectAll={false}
          operations={[
            <RightOutlined key="right" />,
            <LeftOutlined key="left" />
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default AssignUsersForm; 