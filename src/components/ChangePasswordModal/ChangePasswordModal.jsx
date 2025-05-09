// ChangePasswordModal.js

import React, { useState } from "react";
import Modal from '@mui/joy/Modal';
import { Button, FormControl, Input, Stack } from "@mui/joy";

const ChangePasswordModal = ({ open, onClose }) => {
    const [password, setPassword] = useState("");

    const handleChangePassword = () => {
        // Handle password change here
        console.log("Password changed:", password);
        onClose(); // Close the modal after changing the password
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div>
                <h2>Change Password</h2>
                <FormControl>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                </FormControl>
                <Stack spacing={2}>
                    <Button onClick={handleChangePassword}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Stack>
            </div>
        </Modal>
    );
};

export default ChangePasswordModal;
