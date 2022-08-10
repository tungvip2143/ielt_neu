import ModalCreate from "components/Modal/ModalCreate"

export interface Props {
    openModal: boolean;
    onCloseModal?: () => void;
    id: number | string;
  }

  
  const ModalDelete = (props: Props) => {
    const { openModal, onCloseModal = () => {}, id } = props;
    return (
      <div>
        <ModalCreate open = {openModal} onClose={onCloseModal} >
            sfsd
        </ModalCreate>
      </div>
    )
  }
  
  export default ModalDelete