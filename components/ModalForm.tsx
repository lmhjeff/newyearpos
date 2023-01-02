"use client";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const ModalForm = ({
  open,
  setOpen,
  loading,
  setLoading,
  handleSubmitPreOrder,
  handleCancel,
}: any) => {
  // const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);

  // const handleSubmitPreOrder = () => {
  //   console.log("cliecked");
  // };

  return (
    <div>
      <Modal
        open={open}
        title="Title"
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
          >
            Submit
          </Button>,
        ]}
      >
        <input id="name" placeholder="Name:" />
      </Modal>
    </div>
  );
};

export default ModalForm;
