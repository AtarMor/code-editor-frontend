import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

export function Modal({ userMsg, isModalOpen, setIsModalOpen }) {
    const modalRef = useRef(null)

    useEffect(() => {
        if (isModalOpen) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [])

    function onCloseModal() {
        modalRef.current.close()
        setIsModalOpen(false)
    }

    const smileIcon = userMsg.type === 'success' ? 'happy' : 'sad'

    return (
        <dialog className="modal flex column" ref={modalRef} onClose={onCloseModal}>
            <button className="close-btn fa-solid x" onClick={onCloseModal}></button>
            <p>{userMsg.txt}</p>
            <img className="smile-icon" src={`../assets/img/${smileIcon}.png`} alt={`${smileIcon}-icon`}></img>
            <Link to={'/'}>
                <button className="back-btn fa-solid house"></button>
            </Link>
        </dialog>
    )
}