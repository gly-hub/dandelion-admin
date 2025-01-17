import { Button, Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Dandelion Admin</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Button type="primary" icon={<GithubOutlined />}>
            Click Me
          </Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Dandelion Admin ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
}

export default App;
