import { AiOutlineCloseCircle } from 'react-icons/ai'
import Button from './Button';

export default function Modal(props){

    function handleCloseModal(e){
        if(e.target.id === 'modal-container')
            props.handleModal(false);
    }

    return(
        <div id='modal-container' className={"absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20 justify-center items-center " + (props.isOpen ? 'flex' : 'hidden')}
            onClick={handleCloseModal}>
            <div className='w-1/2 h-auto bg-white flex justify-center items-center rounded relative'>
                <Button icon={<AiOutlineCloseCircle size='24'/>} styles='absolute top-2 right-2' width='w-10' height='h-10' onClick={()=>handleCloseModal({target:{id:'modal-container'}})}/>
                <h1 className='text-lg'>{props.name}</h1>
                {props.children}
            </div>
        </div>
    );
}