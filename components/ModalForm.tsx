"use client";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const ModalForm = ({
  usernameRef,
  phoneNumberRef,
  emailRef,
  open,
  setOpen,
  loading,
  setLoading,
  error,
  handleSubmitPreOrder,
  handleCancel,
}: any) => {
  return (
    <div>
      <Modal
        open={open}
        title="客人資料"
        onOk={handleSubmitPreOrder}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="myForm"
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmitPreOrder}
            className="bg-blue-500"
          >
            Submit
          </Button>,
        ]}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-2 items-center">
            <label>姓名:</label>
            <input
              ref={usernameRef}
              id="username"
              placeholder="姓名"
              className="p-2 border"
            />
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <label>電話:</label>
            <input
              type="number"
              ref={phoneNumberRef}
              id="phoneNumber"
              placeholder="電話"
              className="p-2 border"
            />
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <label>電郵:</label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              placeholder="電郵"
              className="p-2 border"
            />
          </div>
        </div>
        {error ? <div className="text-red-500 my-2">所有資料須填寫</div> : null}
      </Modal>
    </div>
  );
};

export default ModalForm;
