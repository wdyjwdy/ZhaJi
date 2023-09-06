import { Button, Form, Input } from 'antd'
import { AuthContext } from '../contexts'
import { useContext } from 'react'

const SignIn = () => {
  const auth = useContext(AuthContext)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    auth.signin(values)
  }

  return (
    <div>
      <h1>Sign In</h1>
      <Form form={form} name="login" onFinish={onFinish} style={{width: 400, margin: '0 auto'}}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Log in</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignIn
