import { firestore } from '../../firebase';

function DeleteWord({ id, setModalState }) {

  const handleDeleteRequest = (answer) => {
    if (id) {
      answer && firestore.collection('vocabulary').doc(id).delete()
    }
    setModalState(false);
  }


  return (
    <div className="pb-3">
      <h3 className="text-lg font-semibold tracking-wide pb-5 text-center">Are you sure you want to delete word?</h3>
      <div className="flex flex-row justify-around items-center max-w-sm mx-auto">
        <p className="px-8 py-2 bg-red-700 text-white font-semibold tracking-wide rounded-md cursor-pointer" onClick={() => handleDeleteRequest(false)}>No</p>
        <p className="px-8 py-2 bg-green-700 text-white font-semibold tracking-wide rounded-md cursor-pointer" onClick={() => handleDeleteRequest(true)}>Yes</p>
      </div>
    </div>
  )
}

export default DeleteWord
