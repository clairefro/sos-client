import { useState } from "react";
import Button from "../components/blocks/Button";
import Modal from "../components/blocks/Modal";
import AskQuestionButtonForm from "./AskQuestionButtonForm";

function AskQuestionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={toggleModal}>Ask Question</Button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <AskQuestionButtonForm closeModal={handleFormSubmit} />
        </Modal>
      )}
    </>
  );
}

export default AskQuestionButton;
