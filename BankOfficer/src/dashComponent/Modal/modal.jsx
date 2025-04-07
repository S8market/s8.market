import React, {useState} from "react";
import "./modal.scss";

export default function Modal() {

const [modal, setModal] =  useState(false);

const toggleModal = () => {
    setModal(!modal)
}
    return (
        <>
        
        <button onClick={toggleModal} classname="btn-modal">
            Change Password
        </button>

        {modal &&(
            <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
                <h2>Change Password</h2>
                <form action="">
                    <label htmlFor="old-password">Old Password</label>
                    <input type="password" id="old-password" placeholder="Enter old password" required />

                    <label htmlFor="new-password">New Password</label>
                    <input type="password" id="new-password" placeholder="Enter new password" required />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" placeholder="Confirm new password" required />

                    <button type="submit">Change Password</button>
                </form>
                <button className="close-modal" onClick={toggleModal}>X</button>
            </div>
        </div>
        )}
        
        </>

    )
}