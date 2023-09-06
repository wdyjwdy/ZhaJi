import { Button, Form, Input, Space } from 'antd';
import { AuthContext } from '../contexts';
import { useContext } from 'react';

const SignUp = () => {
  const [form] = Form.useForm()
  const auth = useContext(AuthContext)

  const onFinish = (values: any) => {
    auth.signup(values)
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form form={form} name="login" onFinish={onFinish} labelCol={{span: 5}} style={{width: 500, margin: '0 auto'}}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Register</Button>
            <Button htmlType="submit" href='/'>Back</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
