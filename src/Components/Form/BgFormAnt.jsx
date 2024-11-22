import React, { useState } from "react";
import {
  Space,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Spin,
  Alert,
} from "antd";
import App from "../.../../../App";
import { bgFormData } from "../../constants";

const BgFormAnt = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    // alert("want to submit form?")
    // make api call
    console.log(values);
    setIsLoading(true);

    setTimeout(() => {
      form.resetFields();
      console.log(values);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-center" from={form}>
        <Form
          onFinish={onFinish}
          className="my-4 rounded border p-4 drop-shadow-sm focus:drop-shadow-lg md:min-w-[900px]"
        >
          <h2 className="pageTitle">custom form</h2>
          <p className="text-red-500">
            এই ফর্মের কাজ চলমান। দয়াকরে উপরের গুগল ফর্ম পূরন করুন
          </p>
          <Form.Item label="Name" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="blood_group"
            required
            className=""
          >
            <Space>
              <Radio.Group className="flex flex-col gap-2">
                {bgFormData.map((item, index) => (
                  <Radio key={index} value={item.value}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Space>
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="blood_group"
            required
            className=""
          >
            <Select className="capitalize" placeholder="select Your group">
              {/* mapping data from index */}
              {bgFormData.map((item, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Phone Number" name="phone_number" min={1} max={11}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="SSC Batch" name="ssc_batch" required>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Permanent Address"
            name="parmanent_address"
            required
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Present address"
            name="present_address"
            placeholder="select"
            required
          >
            <Select className="capitalize" placeholder="select your location">
              <Select.Option value="rowmari">Rowmari</Select.Option>
              <Select.Option value="dhaka">Dhaka</Select.Option>
              <Select.Option value="gazipur">Gazipur</Select.Option>
              <Select.Option value="rangpur">Rangpur</Select.Option>
              <Select.Option value="rajshahi">Rajshahi</Select.Option>
              <Select.Option value="mymensingh">Mymensingh</Select.Option>
              <Select.Option value="sylhet">Sylhet</Select.Option>
              <Select.Option value="chottogram">Chottogram</Select.Option>
              <Select.Option value="barishal">Barishal</Select.Option>
              <Select.Option value="khulna">Khulna</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Checkbox
              className="text-green-700"
              name="agry"
              valuePropName="checked"
            >
              অন্যের জীবন বাঁচানোর প্রয়োজনে রক্ত দানে সচেষ্ট হব
            </Checkbox>
          </Form.Item>
          <Spin 
            spinning={isLoading}
            size="large"
            tip="Your data has been submited"
          >
            <Form.Item>
              <Space className="flex justify-between">
                <Button htmlType="reset" color="danger" variant="outlined">
                  {/* color="danger" variant="outlined" */}
                  Clear Form
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Spin>
        </Form>
      </div>{" "}
    </>
  );
};

export default BgFormAnt;
// export default () => <BgFormAnt />;
