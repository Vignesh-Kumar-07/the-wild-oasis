import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";
// function AddCabin() {
//   const [isShowModal, setIsShowModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsShowModal((is) => !is)}>Add new cabin</Button>
//       {isShowModal && (
//         <Modal onCloseModal={() => setIsShowModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsShowModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="cabin-table">
        <Button>show cabin table</Button>
        </Modal.Open>
        <Modal.Window name="cabin-table">
        <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

export default AddCabin;
