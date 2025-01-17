import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={93}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 